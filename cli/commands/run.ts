import { Command } from 'commander'
import child_process from 'child_process'
import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'

export default (program: Command) => {
  return program
    .command('run <project-name>')
    .description('Run a Metanode project.')
    .action(async (projectName: string) => {
      console.log('Running - projectName:', projectName)
      const projectDirectory = path.resolve(process.cwd(), `./apps/${projectName}/`)
      
      try {
        process.chdir(projectDirectory)
        
        // Check if node_modules directory exists
        if (!fs.existsSync('node_modules')) {
          console.log('node_modules not found, running install...')
          const isYarnInstalled = child_process.spawnSync('yarn', ['--version']).status === 0
          if (isYarnInstalled) {
            child_process.execSync('yarn install', { stdio: 'inherit' })
          } else {
            child_process.execSync('npm install', { stdio: 'inherit' })
          }
        }
        
        // Ask for environment if not provided
        const { env } = await inquirer.prompt([
          {
            type: 'list',
            message: 'Choose the environment to run:',
            name: 'env',
            choices: [
              { name: 'Production', value: '' },
              { name: 'Test', value: 'testnet' },
              { name: 'Development', value: 'devnet' }
            ]
          }
        ])

        // Determine the script to run
        const startScript = env === 'testnet'
          ? 'start:testnet'
          : env === 'devnet'
          ? 'start:devnet'
          : 'dev'
        // Run the project
        console.log(`Starting project ${projectName} with environment ${env}...`)
        const isYarnInstalled = child_process.spawnSync('yarn', ['--version']).status === 0
        if (isYarnInstalled) {
          child_process.execSync(`yarn ${startScript}`, { stdio: 'inherit' })
        } else {
          child_process.execSync(`npm run ${startScript}`, { stdio: 'inherit' })
        }
      } catch (error) {
        console.error(`Error running project ${projectName}:`, error)
      }
    })
}
