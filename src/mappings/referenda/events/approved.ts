import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getApprovedData } from './getters'

export async function handleApproved(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Approved', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getApprovedData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Approved, header)
}
