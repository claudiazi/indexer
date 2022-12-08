import { getOriginAccountId } from '../../../common/tools'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { NoDelegationFound, TooManyOpenDelegations, TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { removeDelegatedVotesOngoingReferenda, removeVote } from './helpers'
import { OpenGovReferendum, VoteType } from '../../../model'
import { getUndelegateData } from './getters'
import {
    ConvictionVotingDelegation
} from '../../../model'

export async function handleUndelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'ConvictionVoting.undelegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const wallet = getOriginAccountId(item.call.origin)
    const { track } = getUndelegateData(ctx, item.call)
    const delegations = await ctx.store.find(ConvictionVotingDelegation, { where: { wallet, blockNumberEnd: IsNull(), track } })
    if (delegations.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenDelegations(header.height, track, wallet))
    }
    else if (delegations.length === 0) {
        //should never be the case
        ctx.log.warn(NoDelegationFound(header.height, track, wallet))
        return
    }
    const delegation = delegations[0]
    delegation.blockNumberEnd = header.height
    delegation.timestampEnd = new Date(header.timestamp)
    await ctx.store.save(delegation)
    //remove currently delegated votes from ongoing referenda for this wallet
    const ongoingReferenda = await ctx.store.find(OpenGovReferendum, { where: { endedAt: IsNull(), track } })
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const referendum = ongoingReferenda[i]
        await removeVote(ctx, wallet, referendum.index, header.height, header.timestamp, false, VoteType.Delegated, delegation.to)
    }
    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height, header.timestamp, track)
}
