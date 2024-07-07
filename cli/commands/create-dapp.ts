import { Command } from 'commander'
import inquirer from 'inquirer'
import { copyTemplate, createDirectory, updateFileContent } from '../utils'

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
      const templateDirectory = `./cli/templates/react-template`
      // create dapp directory
      createDirectory(projectDirectory, process.cwd())
      // copy existing project template
      copyTemplate(templateDirectory, projectDirectory, process.cwd())
      // Update package.json with project name
      const replacements = [
        { replacer: '__project_name__', value: answers.name }
      ]
      const packageJsonPath = `${projectDirectory}/package.json`
      updateFileContent(packageJsonPath, replacements, process.cwd())

      console.log(
        `Project ${answers.name} created successfully at ${projectDirectory}`
      )
    })
}
