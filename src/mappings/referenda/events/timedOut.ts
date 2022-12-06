import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import {Store} from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getTimedOutData } from './getters'

export async function handleTimedOut(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.TimedOut', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, ayes, nays, support } = getTimedOutData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.TimedOut, header, ayes, nays, support)
}