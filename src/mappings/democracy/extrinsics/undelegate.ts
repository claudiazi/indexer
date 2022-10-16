import { getOriginAccountId } from '../../../common/tools'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Delegation } from '../../../model/generated/delegation.model'
import { NoDelegationFound, TooManyOpenDelegations, TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { removeDelegatedVotesOngoingReferenda, removeVote } from './helpers'
import { Referendum, VoteType } from '../../../model'

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
    delegation.timestampEnd = new Date(header.timestamp)
    await ctx.store.save(delegation)
    //remove currently delegated votes from ongoing referenda for this wallet
    const ongoingReferenda = await ctx.store.find(Referendum, { where: { endedAt: IsNull() } })
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const referendum = ongoingReferenda[i]
        await removeVote(ctx, wallet, referendum.index, header.height, header.timestamp, false, VoteType.Delegated, delegation.to)
    }
    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height, header.timestamp)
}
