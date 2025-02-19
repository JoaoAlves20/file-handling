import { Command } from "commander"

import database from "../database/index.js"

const commander = new Command()

async function main() {
    commander
        .version('v1')
        .option('-n, --name [value]', 'Hero name')
        .option('-p, --power [value]', 'Hero power')
        .option('-i, --id [value]', 'Hero id')

        .option('-h, --posthero', 'Add a hero')
        .option('-l, --listheros', 'List all heroes or one hero')
        .option('-d, --deletehero', 'Delete hero')
        .option('-u, --updatehero [value]', 'Update hero')
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

        if (commander.getOptionValue('listheros')) {
            const result = await database.list()
            console.log(result)
            return
        }

        if (commander.getOptionValue('deletehero')) {
            if (!commander.getOptionValue('id')) {
                await database.deleteHero()
                console.log('deleted hero')
                return
            }

            await database.deleteHero(commander.getOptionValue('id'))
            console.log('deleted hero')
        }

        if (commander.getOptionValue('updatehero')) {
            const idHero = parseInt(commander.getOptionValue('updatehero'))
            const modifiedData = {
                name: commander.getOptionValue('name'),
                power: commander.getOptionValue('power')
            }

            const result = await database.update(idHero, modifiedData)

            if (!result) {
                console.error({ error: 'Hero not updated' })
            }
            
            const getHero = await database.list(idHero)
            console.log(getHero)
        }
    } catch (e) {
        console.error({ error: e })
    }
}

main()