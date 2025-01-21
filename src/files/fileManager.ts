import { FileInfo } from './fileInfo'

import { Readable, Writable } from 'stream'

export default interface FileManager {
    getFileList: () => Promise<FileInfo[]>
    getReadStream: (path: string) => Promise<Readable>
    getWriteStream: (path: string) => Promise<Writable>
}