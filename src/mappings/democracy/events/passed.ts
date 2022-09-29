import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../../model'
import { updateReferendum } from '../../utils/proposals'
import { getPassedData } from './getters'

export async function handlePassed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.Passed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getPassedData(ctx, item.event)
    await updateReferendum(ctx, index, ReferendumStatus.Passed, header)
}
