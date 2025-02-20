import { deepEqual, ok } from 'assert'

import database from '../database/index.js'

const DEFAULT_ITEM_HERO = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
}

const DEFAULT_ITEM_UPDATE = {
    id: 2,
    name: 'Lanterna Verde',
    power: 'Energia do Anel'
}

describe('File Handling Switch', function() {
    before(async () => {
        await database.post(DEFAULT_ITEM_HERO)
        await database.post(DEFAULT_ITEM_UPDATE)
    })
    
    it('It should show the heroes, using files', async () => {
        const expected = DEFAULT_ITEM_HERO
        const data = await database.list(1)

        ok(data, expected)
    })

    it('You must register a hero, using files', async () => {
        const expected = DEFAULT_ITEM_HERO
        await database.post(DEFAULT_ITEM_HERO)
        const [actual] = await database.list(DEFAULT_ITEM_HERO.id)

        deepEqual(actual, expected)
    })

    it('Must remove a hero by id', async () => {
        const expected = true
        const result = await database.deleteHero(DEFAULT_ITEM_HERO.id)

        deepEqual(result, expected)
    })

    it('Must update the hero by ID', async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            power: 'Money'
        }

        const newData = {
            name: 'Batman',
            power: 'Money'
        }

        await database.update(DEFAULT_ITEM_UPDATE.id, newData)
        
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)

        deepEqual(result, expected)
    })
})