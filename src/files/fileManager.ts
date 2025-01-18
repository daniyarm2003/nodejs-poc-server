import { FileInfo } from './fileInfo'

export default interface FileManager {
    getFileList: () => Promise<FileInfo[]>
    getReadStream: (path: string) => Promise<NodeJS.ReadableStream>
    getWriteStream: (path: string) => Promise<NodeJS.WritableStream>
}