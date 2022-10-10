import {
    Referendum,
    SplitVoteBalance,
    StandardVoteBalance,
    Vote,
    VoteBalance,
    VoteDecision,
} from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getVoteData } from './getters'
import { MissingReferendumWarn } from '../../utils/errors'
import {BatchContext, SubstrateBlock} from '@subsquid/substrate-processor'
import {Store} from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handleVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.vote', { call: { args: true; origin: true; }}>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { index, vote } = getVoteData(ctx, item.call)

    const referendum = await ctx.store.get(Referendum, { where: { index } })
    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }

    let decision: VoteDecision
    switch (vote.type) {
        case 'Standard':
            decision = vote.value < 128 ? VoteDecision.no : VoteDecision.yes
            break
        case 'Split':
            decision = VoteDecision.abstain
            break
    }

    let lockPeriod: number | undefined
    let balance: VoteBalance | undefined
    if (vote.type === 'Split') {
        balance = new SplitVoteBalance({
            aye: vote.aye,
            nay: vote.nay,
        })
    } else if (vote.type === 'Standard') {
        balance = new StandardVoteBalance({
            value: vote.balance,
        })
        lockPeriod = vote.value < 128 ? vote.value : vote.value - 128
    }

    const count = await getVotesCount(ctx, referendum.id)

    await ctx.store.insert(
        new Vote({
            id: `${referendum.id}-${count.toString().padStart(8, '0')}`,
            referendumIndex: index,
            voter: item.call.origin ? getOriginAccountId(item.call.origin) : null,
            blockNumber: header.height,
            decision,
            lockPeriod,
            referendum,
            balance,
            timestamp: new Date(header.timestamp),
        })
    )
}

const proposalsVotes = new Map<string, number>()

async function getVotesCount(ctx: BatchContext<Store, unknown>, referendumId: string) {
    let count = proposalsVotes.get(referendumId)
    if (count == null) {
        count = await ctx.store.count(Vote, {
            where: {
                referendumId,
            },
        })
    }
    proposalsVotes.set(referendumId, count + 1)
    return count
}
