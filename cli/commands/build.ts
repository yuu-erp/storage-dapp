import { Command } from 'commander';
import child_process from 'child_process';
import path from 'path';
import fs from 'fs';

export default (program: Command) => {
  return program
    .command('build <project-name>')
    .description('Run a Metanode project.')
    .action(async (projectName: string) => {
      console.log('Running - projectName: ', projectName);
      const projectDirectory = path.resolve(
        process.cwd(),
        `./apps/${projectName}/`
      );
      console.log(`Running project ${projectName}...`);
      try {
        process.chdir(projectDirectory);
        const isYarnInstalled =
          child_process.spawnSync('yarn', ['--version']).status === 0;
        if (isYarnInstalled) {
          child_process.execSync('yarn build', { stdio: 'inherit' });
        } else {
          child_process.execSync('npm build', { stdio: 'inherit' });
        }

        // Get the current date and time in the desired format
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedTime = now.toTimeString().slice(0, 5).replace(/:/g, '');
        const newBuildDirName = `${projectName}-${formattedDate}-${formattedTime}`;

        // Path to the build directory
        const buildDir = path.resolve(projectDirectory, './dist');

        // Path to the buildDapp directory
        const buildDappDir = path.resolve(projectDirectory, '../../_buildDapp');

        // Check if the buildDapp directory exists, if not, create it
        if (!fs.existsSync(buildDappDir)) {
          fs.mkdirSync(buildDappDir, { recursive: true });
          console.log(`Created directory: ${buildDappDir}`);
        }

        // Check if the build directory exists
        if (fs.existsSync(buildDir)) {
          const newBuildDir = path.resolve(buildDappDir, newBuildDirName);
          fs.renameSync(buildDir, newBuildDir);
          console.log(`Build directory renamed to ${newBuildDirName}`);
        } else {
          console.error(`Build directory not found: ${buildDir}`);
        }
      } catch (error) {
        console.error(`Error running project ${projectName}:`, error);
      }
    });
};
