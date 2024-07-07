import { Command } from 'commander'
import inquirer from 'inquirer'
import { copyTemplate, createDirectory, updatePackageJson } from '../utils'

export default (program: Command) => {
  return program
    .command('create-dapp')
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
            }
          ]
        },
        {
          type: 'input',
          message: 'What is the name of the project?',
          name: 'name'
        }
      ])
      const scraperDirectory = `./apps/${answers.name}/` // Create a directory named after the scraper name
      createDirectory(scraperDirectory, process.cwd()) // Ensure the directory is created
      const templateDirectory = `./cli/templates/react-template` // Path to your react template folder
      copyTemplate(templateDirectory, scraperDirectory, process.cwd()) // Copy the template to the new project directory
      updatePackageJson(answers.name, scraperDirectory, process.cwd())
    })
}
