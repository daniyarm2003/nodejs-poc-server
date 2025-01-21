import FileManager from './fileManager'

export async function readFileToBuffer(fileManager: FileManager, path: string) {
    const readStream = await fileManager.getReadStream(path)
    const dataArr: any[] = []

    for await(const dataChunk of readStream) {
        dataArr.push(dataChunk)
    }

    return Buffer.concat(dataArr)
}