import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../../model'
import { updateReferendum } from '../../utils/proposals'
import { getExecutedData } from './getters'

export async function handleExecuted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.Executed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getExecutedData(ctx, item.event)

    await updateReferendum(ctx, index, ReferendumStatus.Executed, header)
}
