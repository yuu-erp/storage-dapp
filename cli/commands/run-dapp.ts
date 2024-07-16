import { Command } from 'commander'
import child_process from 'child_process'
import path from 'path'

export default (program: Command) => {
  return program
    .command('run-dapp <project-name>')
    .description('Run a Metanode project.')
    .action(async (projectName: string) => {
      console.log('Running - projectName: ', projectName)
      const projectDirectory = path.resolve(
        process.cwd(),
        `./apps/${projectName}/`
      )
      console.log(`Running project ${projectName}...`)
      try {
        process.chdir(projectDirectory)
        const isYarnInstalled =
          child_process.spawnSync('yarn', ['--version']).status === 0
        if (isYarnInstalled) {
          child_process.execSync('yarn dev', { stdio: 'inherit' })
        } else {
          child_process.execSync('npm dev', { stdio: 'inherit' })
        }
      } catch (error) {
        console.error(`Error running project ${projectName}:`, error)
      }
    })
}
