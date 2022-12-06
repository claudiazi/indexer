import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getConfirmStartedData } from './getters'

export async function handleConfirmStarted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.ConfirmStarted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getConfirmStartedData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.ConfirmStarted, header)
}
