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

    async list(id) {
        const data = await this.getDataFile()
        const filterData = data.filter(item => (
            id ? item.id === id : true
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
}

const database = new Database()

export default database