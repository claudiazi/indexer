import { BatchContext } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { IsNull } from "typeorm"
import { Delegation, Referendum, StandardVoteBalance, Vote, VoteType } from "../../../model"
import { NoOpenVoteFound, TooManyOpenVotes } from "./errors"
import { getVotesCount } from "./vote"

export function convictionToLockPeriod(convictionKind: string): number {
    return convictionKind === 'None' ? 0 : Number(convictionKind[convictionKind.search(/\d/)])
}

export async function removeDelegatedVotesOngoingReferenda(ctx: BatchContext<Store, unknown>, wallet: string | undefined, block: number): Promise<void> {
    //get any ongoing referenda
    const ongoingReferenda = await ctx.store.find(Referendum, { where: { endedAt: IsNull() } })
    let nestedDelegations = await getAllNestedDelegations(ctx, wallet)
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const ongoingReferendum = ongoingReferenda[i]
        await removeDelegatedVotesReferendum(ctx, block, ongoingReferendum.index, nestedDelegations)
    }

}

export async function removeDelegatedVotesReferendum(ctx: BatchContext<Store, unknown>, block: number, index: number, nestedDelegations: Delegation[]): Promise<void> {
    for (let i = 0; i < nestedDelegations.length; i++) {
        //remove active votes
        const delegation = nestedDelegations[i]
        const votes = await ctx.store.find(Vote, { where: { voter: delegation.wallet, referendumIndex: index, blockNumberRemoved: IsNull(), type: VoteType.Delegated } })
        if (votes.length > 1) {
            //should never happen
            ctx.log.warn(TooManyOpenVotes(block, index, delegation.wallet))
            return
        }
        else if (votes.length === 0) {
            // no votes for ongoing referenda
            // ctx.log.warn(NoOpenVoteFound(header.height, ongoingReferendum.index, to))
            return
        }
        const vote = votes[0]
        vote.blockNumberRemoved = block
        await ctx.store.save(vote)
    }
}

export async function removeVote(ctx: BatchContext<Store, unknown>, wallet: string | undefined, referendumIndex: number, block: number): Promise<void> {
    const votes = await ctx.store.find(Vote, { where: { voter: wallet, referendumIndex, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(block, referendumIndex, wallet))
        return
    }
    else if (votes.length === 0) {
        ctx.log.warn(NoOpenVoteFound(block, referendumIndex, wallet))
        return
    }
    const vote = votes[0]
    vote.blockNumberRemoved = block
    await ctx.store.save(vote)
}

export async function addOngoingReferendaDelegatedVotes(ctx: BatchContext<Store, unknown>, toWallet: string | undefined, block: number, blockTime: number): Promise<void> {
    const ongoingReferenda = await ctx.store.find(Referendum, { where: { endedAt: IsNull() } })
    const nestedDelegations = await getAllNestedDelegations(ctx, toWallet)
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const ongoingReferendum = ongoingReferenda[i]
        await addDelegatedVotesReferendum(ctx, toWallet, block, blockTime, ongoingReferendum, nestedDelegations)
    }
}

export async function addDelegatedVotesReferendum(ctx: BatchContext<Store, unknown>, toWallet: string | undefined, block: number, blockTime: number, referendum: Referendum, nestedDelegations: Delegation[]): Promise<void> {
    //get top toWallet vote
    const votes = await ctx.store.find(Vote, { where: { voter: toWallet, referendumIndex: referendum.index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(block, referendum.index, toWallet))
        return
    }
    else if (votes.length === 0) {
        //to wallet didn't vote yet
        // ctx.log.warn(NoOpenVoteFound(header.height, ongoingReferendum.index, toAddress))
        return
    }
    const vote = votes[0]
    for (let i = 0; i < nestedDelegations.length; i++) {
        //add votes
        const delegation = nestedDelegations[i]
        const count = await getVotesCount(ctx, referendum.id)
        const voteBalance = new StandardVoteBalance({
            value: delegation.balance,
        })
        await ctx.store.insert(
            new Vote({
                id: `${referendum.id}-${count.toString().padStart(8, '0')}`,
                referendumIndex: referendum.index,
                voter: delegation.wallet,
                blockNumberVoted: block,
                decision: vote.decision,
                lockPeriod: delegation.lockPeriod,
                referendum: referendum,
                balance: voteBalance,
                timestamp: new Date(blockTime),
                delegatedTo: delegation.to,
                type: VoteType.Delegated
            })
        )
    }
}


export async function getAllNestedDelegations(ctx: BatchContext<Store, unknown>, voter: string | undefined): Promise<any> {
    let delegations = await ctx.store.find(Delegation, { where: { to: voter, blockNumberEnd: IsNull() } })
    if (delegations && delegations.length > 0) {
        for (let i = 0; i < delegations.length; i++) {
            const delegation = delegations[i]
            if (delegation.to){
                return [...delegations, ...await getAllNestedDelegations(ctx, delegation.wallet)]
            }
            else {
                return []
            }
        }
    }
    else {
        return []
    }
}