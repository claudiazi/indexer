import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import {Store} from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getRejectedData } from './getters'

export async function handleRejected(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Rejected', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, ayes, nays, support } = getRejectedData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Rejected, header, ayes, nays, support)
}
