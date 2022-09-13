import { toHex } from '@subsquid/substrate-processor'
import { PreimageStatus } from '../../model'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { updatePreimage } from '../utils/proposals'
import { getPreimageInvalidData } from './getters'
import { Store } from '@subsquid/typeorm-store'

export async function handlePreimageInvalid(ctx: EventHandlerContext<Store>) {
    const { hash } = getPreimageInvalidData(ctx)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Invalid)
}
