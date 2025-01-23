import { FileInfo } from './fileInfo'
import FileManager from './fileManager'

import { createReadStream, createWriteStream } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import FileNotFoundError from './fileNotFoundError'

export default class LocalFileManager implements FileManager {
    private baseDirPath: string

    public constructor(baseDirPath: string) {
        this.baseDirPath = baseDirPath
    }
    
    public async getFileList() {
        const dir = await fs.opendir(this.baseDirPath)
        const files: FileInfo[] = []

        for await(const entry of dir) {
            if(!entry.isFile()) {
                continue
            }

            const fullPath = path.join(this.baseDirPath, entry.name)
            const fileStats = await fs.stat(fullPath)

            files.push({
                name: entry.name,
                size: fileStats.size,
                createdAt: fileStats.birthtime,
                updatedAt: fileStats.mtime
            })
        }

        return files
    }

    public async getReadStream(filePath: string) {
        const fullPath = path.join(this.baseDirPath, filePath)

        try {
            const fileStat = await fs.stat(fullPath)

            if(!fileStat.isFile()) {
                throw new FileNotFoundError(`${filePath} is not a file`)
            }
        }
        catch(err: unknown) {
            throw new FileNotFoundError(`File ${filePath} does not exist`)
        }

        return createReadStream(fullPath)
    }

    public async getWriteStream(filePath: string) {
        const fullPath = path.join(this.baseDirPath, filePath)
        return createWriteStream(fullPath)
    }
}