import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../model'
import { updateReferendum } from '../utils/proposals'
import { getCancelledData } from './getters'

export async function handleCancelled(ctx: EventHandlerContext<Store>) {
    const index = getCancelledData(ctx)

    await updateReferendum(ctx, index, ReferendumStatus.Cancelled)
}
