import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getConfirmedData } from './getters'

export async function handleConfirmed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Confirmed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, ayes, nays, support } = getConfirmedData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Confirmed, header, ayes, nays, support)
}
