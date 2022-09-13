import { UnknownVersionError } from '../common/errors'
import { DemocracyPreimagesStorage } from '../types/storage'
import { BlockContext } from '../types/support'

interface PreimageStorageData {
    data: Uint8Array
    provider: Uint8Array
    deposit: bigint
    block: number
}

export async function getPreimageData(ctx: BlockContext, hash: Uint8Array): Promise<PreimageStorageData | undefined> {
    const storage = new DemocracyPreimagesStorage(ctx)
    if (storage.isV1022) {
        const storageData = await storage.getAsV1022(hash)
        if (!storageData) return undefined

        const [data, provider, deposit, block] = storageData

        return {
            data,
            provider,
            deposit,
            block,
        }
    } else if (storage.isV1058) {
        const storageData = await storage.getAsV1058(hash)
        if (!storageData || storageData.__kind === 'Missing') return undefined

        const { provider, deposit, since, data } = storageData.value

        return {
            data,
            provider,
            deposit,
            block: since,
        }
    } else if (storage.isV9111) {
        const storageData = await storage.getAsV9111(hash)
        if (!storageData || storageData.__kind === 'Missing') return undefined

        const { provider, deposit, since, data } = storageData

        return {
            data,
            provider,
            deposit,
            block: since,
        }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}
