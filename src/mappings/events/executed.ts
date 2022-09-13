import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../model'
import { updateReferendum } from '../utils/proposals'
import { getExecutedData } from './getters'

export async function handleExecuted(ctx: EventHandlerContext<Store>) {
    const index = getExecutedData(ctx)

    await updateReferendum(ctx, index, ReferendumStatus.Executed)
}
