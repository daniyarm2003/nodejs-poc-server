export default class FileNotFoundError extends Error {
    public constructor(message: string) {
        super(message)
    }
}