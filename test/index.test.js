import { deepEqual, ok } from 'assert'

import database from '../service/index.js'

const DEFAULT_ITEM_HERO = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
}

describe('File Handling Switch', function() {
    before(async () => {
        await database.post(DEFAULT_ITEM_HERO)
    })
    
    it('It should show the heroes, using files', async () => {
        const expected = DEFAULT_ITEM_HERO
        const data = await database.list(1)

        ok(data, expected)
    })

    it('You must register a hero, using files', async () => {
        const expected = DEFAULT_ITEM_HERO
        const result = await database.post(DEFAULT_ITEM_HERO)
        const [actual] = await database.list(DEFAULT_ITEM_HERO.id)

        deepEqual(actual, expected)
    })
})