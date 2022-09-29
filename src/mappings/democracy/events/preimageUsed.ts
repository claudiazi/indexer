import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { PreimageStatus } from '../../../model'
import { updatePreimage } from '../../utils/proposals'
import { getPreimageUsedData } from './getters'

export async function handlePreimageUsed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.PreimageUsed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { hash } = getPreimageUsedData(ctx, item.event)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Used, header)
}
