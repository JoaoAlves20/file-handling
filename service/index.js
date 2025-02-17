import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.FILE_NAME = 'mocks/heros.json'
    }

    async getDataFile() {
        const file = await readFileAsync(this.FILE_NAME, 'utf-8') 
        return JSON.parse(file.toString())
    }

    async list(idHero) {
        const data = await this.getDataFile()
        const filterData = data.filter(item => (
            idHero ? item.id === idHero : true
        ))

        return filterData
    }

    async writeDataFile(data) {
        await writeFileAsync(this.FILE_NAME, JSON.stringify(data))
        return true
    }

    async post(hero) {
        const data = await this.getDataFile()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroWithId = { id, ...hero }
        const finalData = [...data, heroWithId]

        const result = await this.writeDataFile(finalData)
        return result
    }

    async deleteHero(idHero) {
        if (!idHero) {
            return await this.post([])
        }

        const data = await this.getDataFile()
        const indice = data.findIndex(item => item.id === parseInt(idHero))

        if (indice === -1) {
            throw new Error('Hero not found')
        }

        data.splice(indice, 1)
        return await this.post(data)
    }
}

const database = new Database()

export default database