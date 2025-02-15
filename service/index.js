import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

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
}

const newDatabase = new Database()

export default newDatabase