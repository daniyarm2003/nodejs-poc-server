import LocalFileManager from '@files/localFileManager'

describe('LocalFileManager tests', () => {
    test('lists files correctly', async () => {
        const fileManager = new LocalFileManager('.')
        const files = await fileManager.getFileList()

        console.log(JSON.stringify(files, null, 2))
    })
})