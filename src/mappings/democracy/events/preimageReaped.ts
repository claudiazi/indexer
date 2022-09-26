import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { PreimageStatus } from '../../../model'
import { updatePreimage } from '../../utils/proposals'
import { getPreimageReapedData } from './getters'

export async function handlePreimageReaped(ctx: EventHandlerContext<Store>) {
    const { hash } = getPreimageReapedData(ctx)

    const hexHash = toHex(hash)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Reaped)
}
