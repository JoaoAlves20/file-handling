import { Command } from "commander"

import database from "../database/index.js"

const commander = new Command()

async function main() {
    commander
        .version('v1')
        .option('-n, --name [value]', 'Hero name')
        .option('-p, --power [value]', 'Hero power')

        .option('-h, --posthero', 'Add a hero')
        .option('-l, --list', 'List all heroes or one hero')
        .option('-d, --deletehero [value]', 'Delete hero')
        .parse(process.argv)
    
    try {
        if (commander.getOptionValue('posthero')) {
            const result = await database.post({
                id: Math.floor(Math.random() * 100),
                name: commander.getOptionValue('name'),
                power: commander.getOptionValue('power')
            })

            if (!result) {
                console.error('unregistered hero')
                return
            }

            console.log('hero successfully registered')
            return
        }

        if (commander.getOptionValue('list')) {
            const result = await database.list()
            console.log(result)
            return
        }

        if (commander.getOptionValue('deletehero')) {
            await database.deleteHero(commander.getOptionValue('deletehero'))
            console.log('deleted hero')
        }
    } catch (e) {
        console.error({ error: e })
    }
}

main()