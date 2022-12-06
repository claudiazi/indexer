import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import {Store} from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getKilledData } from './getters'

export async function handleKilled(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Killed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, ayes, nays, support } = getKilledData(ctx, item.event)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Killed, header, ayes, nays, support)
}
