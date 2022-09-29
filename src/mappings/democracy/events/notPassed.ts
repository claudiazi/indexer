import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import {Store} from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../../model'
import { updateReferendum } from '../../utils/proposals'
import { getNotPassedData } from './getters'

export async function handleNotPassed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.NotPassed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const index = getNotPassedData(ctx, item.event)
    await updateReferendum(ctx, index, ReferendumStatus.NotPassed, header)
}
