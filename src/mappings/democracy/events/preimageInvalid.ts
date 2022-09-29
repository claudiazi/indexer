import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { PreimageStatus } from '../../../model'
import { updatePreimage } from '../../utils/proposals'
import { getPreimageInvalidData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handlePreimageInvalid(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.PreimageInvalid', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { hash } = getPreimageInvalidData(ctx, item.event)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Invalid, header)
}
