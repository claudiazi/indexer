import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { PreimageStatus } from '../../../model'
import { updatePreimage } from '../../utils/proposals'
import { getPreimageMissingData } from './getters'

export async function handlePreimageMissing(ctx: EventHandlerContext<Store>) {
    const { hash } = getPreimageMissingData(ctx)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Missing)
}
