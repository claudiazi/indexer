import {StandardVoteBalance} from "./_standardVoteBalance"
import {SplitVoteBalance} from "./_splitVoteBalance"
import {SplitAbstainVoteBalance} from "./_splitAbstainVoteBalance"

export type VoteBalanceOpenGov = StandardVoteBalance | SplitVoteBalance | SplitAbstainVoteBalance

export function fromJsonVoteBalanceOpenGov(json: any): VoteBalanceOpenGov {
    switch(json?.isTypeOf) {
        case 'StandardVoteBalance': return new StandardVoteBalance(undefined, json)
        case 'SplitVoteBalance': return new SplitVoteBalance(undefined, json)
        case 'SplitAbstainVoteBalance': return new SplitAbstainVoteBalance(undefined, json)
        default: throw new TypeError('Unknown json object passed as VoteBalanceOpenGov')
    }
}
