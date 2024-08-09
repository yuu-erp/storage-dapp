import { Command } from 'commander'
import inquirer from 'inquirer'
import ora from 'ora'
import { copyTemplate, createDirectory, updateFileContent } from '../utils'
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
        }
      ])

      if (answers.type === 'nextjs') {
        console.log('NextJS is not supported yet.')
        return
      }

      const projectDirectory = `./apps/${answers.name}/`
      const templateDirectory = `./cli/templates/__REACT_WEBPACK_TEMPLATE__`

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
        updateFileContent(packageJsonPath, replacements, process.cwd())

        spinner.succeed(
          `Project ${answers.name} created successfully at ${projectDirectory}`
        )
      } catch (error) {
        spinner.fail(`Failed to create project: ${error.message}`)
      }
    })
}
