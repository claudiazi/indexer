import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../common/errors'
import { PreimagePreimageForStorage } from '../../types/storage'

interface PreimageStorageData {
    data: Uint8Array
}

export async function getPreimageData(ctx: BatchContext<Store, unknown>, hash: Uint8Array, len: number, block: SubstrateBlock): Promise<PreimageStorageData | undefined> {
    const storage = new PreimagePreimageForStorage(ctx, block)
    if (storage.isV9160) {
        const storageData = await storage.asV9160.get(hash)
        if (!storageData) return undefined

        return {
            data: storageData
        }
    } else if (storage.isV9320) {
        const storageData = await storage.asV9320.get([hash, len])
        if (!storageData) return undefined

        return {
            data: storageData
        }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}
