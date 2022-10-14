import { Referendum, Vote } from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { IsNull } from 'typeorm'
import { NoOpenVoteFound, TooManyOpenVotes } from './errors'
import { MissingReferendumWarn } from '../../utils/errors'

export async function handleRemoveVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.remove_vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { index } = getRemoveVoteData(ctx, item.call)
    const voter = getOriginAccountId(item.call.origin)
    const votes = await ctx.store.find(Vote, { where: { voter, referendumIndex: index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(header.height, index, voter))
    }
    else if (votes.length === 0) {
        const referendum = await ctx.store.get(Referendum, { where: { index } })
        if (!referendum) {
            ctx.log.warn(MissingReferendumWarn(index))
            return
        }
        if (referendum.endsAt > header.height) {
            ctx.log.warn(NoOpenVoteFound(header.height, index, voter))
            return
        }
    }
    const vote = votes[0]
    vote.blockNumberRemoved = header.height
    await ctx.store.save(vote)
}
