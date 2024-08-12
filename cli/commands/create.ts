import { Command } from 'commander'
import inquirer from 'inquirer'
import ora from 'ora'
import path from 'path'
import { copyTemplate, createDirectory, updateFileContent, writeFileENV } from '../utils'
import fs from 'fs'

export default (program: Command) => {
  return program
    .command('create')
    .description('Create Metanode project.')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          message: 'Choosing dapp technology',
          name: 'type',
          choices: [
            {
              name: 'ReactJs',
              value: 'reactjs'
            },
            {
              name: 'NextJS',
              value: 'nextjs'
            }
          ]
        },
        {
          type: 'input',
          message: 'What is the name of the project?',
          name: 'name'
        },
        {
          type: 'list',
          message: 'Choose an additional environment file to include:',
          name: 'env',
          choices: [
            { name: 'None (Only .env)', value: '' },
            { name: 'Test (.env.test)', value: 'test' },
            { name: 'Development (.env.dev)', value: 'dev' },
            { name: 'Add all (.env, .env.test, .env.dev)', value: 'all' }
          ]
        },
        {
          type: 'input',
          message: 'Choose a port number for development server (default is 3000):',
          name: 'port',
          default: '3000',
          validate: (input) => {
            const port = parseInt(input, 10)
            if (isNaN(port) || port < 1 || port > 65535) {
              return 'Please enter a valid port number (1-65535).'
            }
            return true
          }
        }
      ])
      console.log("Choose the additional environment file to include:", answers.env)
      if (answers.type === 'nextjs') {
        console.log('NextJS is not supported yet.')
        return
      }

      const projectDirectory = `./apps/${answers.name}/`
      const templateDirectory = `./cli/templates/REACT_VITE_TEMPLATE`

      const spinner = ora('Setting up your project...').start()

      try {
        // Create dapp directory
        spinner.text = 'Creating project directory...'
        createDirectory(projectDirectory, process.cwd())

        // Copy existing project template
        spinner.text = 'Copying project template...'
        copyTemplate(templateDirectory, projectDirectory, process.cwd())

        // Update package.json with project name
        spinner.text = 'Updating package.json...'
        const replacements = [
          { replacer: '__project_name__', value: answers.name }
        ]
        const packageJsonPath = `${projectDirectory}/package.json`
        updateFileContent(packageJsonPath, replacements, process.cwd());

        // Create default .env file
        spinner.text = 'Creating default .env file...'
        const defaultEnvContent = '# Vite requires that environment variables exposed to your client-side code be prefixed with VITE_ by default for security reasons \nVITE_REACT_APP_ENV=production'
        writeFileENV(path.join(projectDirectory, '.env'), defaultEnvContent, process.cwd())
        // Create the selected additional environment file, if any
        if (answers.env === 'test' || answers.env === 'all') {
          spinner.text = 'Creating .env.test file...'
          const testEnvContent = '# Vite requires that environment variables exposed to your client-side code be prefixed with VITE_ by default for security reasons \nVITE_REACT_APP_ENV=testnet'
          writeFileENV(path.join(projectDirectory, '.env.test'), testEnvContent)
        }
        
        if (answers.env === 'dev' || answers.env === 'all') {
          spinner.text = 'Creating .env.dev file...'
          const devEnvContent = '# Vite requires that environment variables exposed to your client-side code be prefixed with VITE_ by default for security reasons \nVITE_REACT_APP_ENV=devnet'
          writeFileENV(path.join(projectDirectory, '.env.dev'), devEnvContent)
        }

        // Update package.json scripts to include environment-specific build commands
        spinner.text = 'Updating package.json with environment build scripts...'
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

        packageJson.scripts = {
          ...packageJson.scripts,
          "dev": `vite --port ${answers.port}`,
          "build:testnet": "vite build --mode test",
          "build:devnet": "vite build --mode dev",
          "start:testnet": `vite --mode test --port ${answers.port}`,
          "start:devnet": `vite --mode dev --port ${answers.port}`
        }

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8')

        spinner.succeed(
          `Project ${answers.name} created successfully at ${projectDirectory}`
        )
      } catch (error) {
        spinner.fail(`Failed to create project: ${error.message}`)
      }
    })
}
