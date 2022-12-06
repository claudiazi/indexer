import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getConfirmAbortedData } from './getters'

export async function handleConfirmAborted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.ConfirmAborted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getConfirmAbortedData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.ConfirmAborted, header)
}
