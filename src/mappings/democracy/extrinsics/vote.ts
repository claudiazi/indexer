import {
    Referendum,
    SplitVoteBalance,
    StandardVoteBalance,
    Vote,
    VoteBalance,
    VoteDecision,
    VoteType,
} from '../../../model'
import { decodeId, encodeId, getOriginAccountId } from '../../../common/tools'
import { getVoteData } from './getters'
import { MissingReferendumWarn } from '../../utils/errors'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { addDelegatedVotesReferendum, getAllNestedDelegations, removeDelegatedVotesReferendum, } from './helpers'
import { CouncilMembersStorage, SessionValidatorsStorage } from '../../../types/storage'

export async function handleVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return

    const { index, vote } = getVoteData(ctx, item.call)

    const wallet = getOriginAccountId(item.call.origin)
    const votes = await ctx.store.find(Vote, { where: { voter: wallet, referendumIndex: index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenVotes(header.height, index, wallet))
    }
    if (votes.length > 0) {
        const vote = votes[0]
        vote.blockNumberRemoved = header.height
        vote.timestampRemoved = new Date(header.timestamp)
        await ctx.store.save(vote)
    }
    const nestedDelegations = await getAllNestedDelegations(ctx, wallet)
    await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, index, nestedDelegations)

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
    const councilMembers = new CouncilMembersStorage(ctx, header).isExists ? (await new CouncilMembersStorage(ctx, header).getAsV9111()).map(member => encodeId(member)) : null
    const validators = new SessionValidatorsStorage(ctx, header).isExists ? (await new SessionValidatorsStorage(ctx, header).getAsV1020()).map(validator => encodeId(validator)) : null
    const voter = item.call.origin ? getOriginAccountId(item.call.origin) : null

    await ctx.store.insert(
        new Vote({
            id: `${referendum.id}-${count.toString().padStart(8, '0')}`,
            referendumIndex: index,
            voter,
            blockNumberVoted: header.height,
            decision,
            lockPeriod,
            referendum,
            balance,
            timestamp: new Date(header.timestamp),
            type: VoteType.Direct,
            isCouncillor: voter && councilMembers ? councilMembers.includes(voter) : null,
            isValidator: voter && validators ? validators.includes(voter) : null
        })
    )
    await addDelegatedVotesReferendum(ctx, wallet, header.height, header.timestamp, referendum, nestedDelegations, councilMembers, validators)
}

const proposalsVotes = new Map<string, number>()

export async function getVotesCount(ctx: BatchContext<Store, unknown>, referendumId: string) {
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