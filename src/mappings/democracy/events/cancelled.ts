import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../../model'
import { updateReferendum } from '../../utils/proposals'
import { getCancelledData } from './getters'

export async function handleCancelled(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.Cancelled', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getCancelledData(ctx, item.event)
    await updateReferendum(ctx, index, ReferendumStatus.Cancelled, header)
}
