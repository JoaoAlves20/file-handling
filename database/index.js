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

    async findById(idHero) {
        const data = await this.getDataFile()
        const findId = data.find(item => item.id === idHero)

        return findId
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
        if (!hero) {
            const result = await this.writeDataFile([])
            return result
        }
        
        const data = await this.getDataFile()
        const id = hero.id ? hero.id : Math.floor(Math.random() * 100)
        const heroWithId = { ...hero, id }
        const finalData = [...data, heroWithId]

        const result = await this.writeDataFile(finalData)
        return result
    }

    async deleteHero(idHero) {
        if (!idHero) {
            return await this.post()
        }

        const data = await this.getDataFile()
        const findId = await this.findById(idHero)

        if (!findId) {
            throw new Error('Hero not found')
        }

        const newData = data.filter(item => item.id !== idHero)
        return await this.writeDataFile(newData)
    }

    async update(idHero, modifiedData) {
        const data = await this.getDataFile()
        const findId = await this.findById(idHero)

        if (!findId) {
            throw new Error({ error: 'Hero not found' })
        }

        const newData = data.map(item => (
            item.id === idHero ? { ...item, ...modifiedData } : item
        ))
        
        return await this.writeDataFile(newData)
    }
}

const database = new Database()

database.update(78, { name: 'Superman', power: 'Power' })

export default database