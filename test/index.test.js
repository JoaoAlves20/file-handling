import { deepEqual, ok } from 'assert'

import newDatabase from '../service/index.js'

const DEFAULT_ITEM_HERO = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
}

describe('File Handling Switch', function() {
    it('It should show the heroes, using files', async () => {
        const expected = DEFAULT_ITEM_HERO
        const data = await newDatabase.list(1)

        ok(data, expected)
    })
})