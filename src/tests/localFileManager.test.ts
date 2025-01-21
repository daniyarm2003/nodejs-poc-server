import { readFileToBuffer } from '@files/fileManagerIOUtils'
import LocalFileManager from '@files/localFileManager'

describe('LocalFileManager tests', () => {
    test('lists files correctly', async () => {
        const fileManager = new LocalFileManager('test-files')
        const files = await fileManager.getFileList()
        
        const expectedFileNames = ['test1.txt', 'test2.txt']
        const actualFileNames = files.map(file => file.name)

        expect(actualFileNames).toEqual(expect.arrayContaining(expectedFileNames))
        expect(actualFileNames.length).toBe(expectedFileNames.length)
    })

    test('reads files correctly', async () => {
        const fileManager = new LocalFileManager('test-files')

        const data = await readFileToBuffer(fileManager, 'test1.txt')
        const dataStr = data.toString('utf-8')

        const expected = 'Hello World!'

        expect(dataStr).toBe(expected)
    })
})