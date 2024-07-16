import { Command } from 'commander'
import fs from 'fs'
import { handlePath } from './utils'

const program = new Command()

program
  .name('MetaNode')
  .description('CLI for dapp repository utility')
  .version('1.0.0')

const commandFiles = fs
  .readdirSync(handlePath('./commands', __dirname))
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const { default: command } = require(
    handlePath(`./commands/${file}`, __dirname)
  )

  command(program)
}

program.parse()
