import { getOriginAccountId } from '../../../common/tools'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Delegation } from '../../../model/generated/delegation.model'
import { NoDelegationFound, TooManyOpenDelegations, TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { removeDelegatedVotesOngoingReferenda } from './helpers'

export async function handleUndelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.undelegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const wallet = getOriginAccountId(item.call.origin)
    const delegations = await ctx.store.find(Delegation, { where: { wallet, blockNumberEnd: IsNull() } })
    if (delegations.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenDelegations(header.height, wallet))
    }
    else if (delegations.length === 0) {
        //should never be the case
        ctx.log.warn(NoDelegationFound(header.height, wallet))
        return
    }
    const delegation = delegations[0]
    delegation.blockNumberEnd = header.height
    await ctx.store.save(delegation)
    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height)
}
