export class UnknownVersionError extends Error {
    constructor(name: string) {
        super(`There is no relevant version for ${name}`)
    }
}

export function StorageNotExistsWarn(type: string, hashOrIndex: string | number) {
    return `Storage doesn't exist for ${type} ${hashOrIndex}`
}

export function NoRecordExistsWarn(type: string, hashOrIndex: string | number) {
    return `Record doesn't exist for ${type} ${hashOrIndex}`
}

