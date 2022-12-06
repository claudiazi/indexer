import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getCancelledData } from './getters'

export async function handleCancelled(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Cancelled', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, ayes, nays, support } = getCancelledData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Cancelled, header, ayes, nays, support)
}
