import { Referendum, Vote } from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { IsNull } from 'typeorm'
import { NoOpenVoteFound, TooManyOpenVotes } from './errors'
import { MissingReferendumWarn } from '../../utils/errors'
import { removeDelegatedVotesOngoingReferenda, removeVote } from './helpers'

export async function handleRemoveVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.remove_vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { index } = getRemoveVoteData(ctx, item.call)
    const referendum = await ctx.store.get(Referendum, { where: { index } })
    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }
    if (referendum.endsAt < header.height) {
        //ref already ended probably removing vote for democracy_unlock
        return
    }
    const wallet = getOriginAccountId(item.call.origin)
    await removeVote(ctx, wallet, index, header.height)
    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height)
}
