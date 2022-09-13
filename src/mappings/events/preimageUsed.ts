import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { PreimageStatus } from '../../model'
import { updatePreimage } from '../utils/proposals'
import { getPreimageUsedData } from './getters'

export async function handlePreimageUsed(ctx: EventHandlerContext<Store>) {
    const { hash } = getPreimageUsedData(ctx)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Used)
}
