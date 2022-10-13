import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { DemocracyDelegateCall, DemocracyRemoveVoteCall } from '../../../types/calls'
import { DemocracyVoteCall } from '../../../types/calls'

type DemocracyVote =
    | {
        type: 'Standard'
        balance?: bigint
        value: number
    }
    | {
        type: 'Split'
        aye: bigint
        nay: bigint
    }

interface DemocracyVoteCallData {
    index: number
    vote: DemocracyVote
}

export function getVoteData(ctx: BatchContext<Store, unknown>, itemCall: any): DemocracyVoteCallData {
    const event = new DemocracyVoteCall(ctx, itemCall)
    if (event.isV1020) {
        const { refIndex, vote } = event.asV1020
        return {
            index: refIndex,
            vote: {
                type: 'Standard',
                value: vote,
            },
        }
    } else if (event.isV1055) {
        const { refIndex, vote } = event.asV1055
        if (vote.__kind === 'Standard') {
            return {
                index: refIndex,
                vote: {
                    type: 'Standard',
                    value: vote.value.vote,
                    balance: vote.value.balance,
                },
            }
        } else {
            return {
                index: refIndex,
                vote: {
                    type: 'Split',
                    aye: vote.value.aye,
                    nay: vote.value.nay,
                },
            }
        }
    } else if (event.isV9111) {
        const { refIndex, vote } = event.asV9111
        if (vote.__kind === 'Standard') {
            return {
                index: refIndex,
                vote: {
                    type: 'Standard',
                    value: vote.vote,
                    balance: vote.balance,
                },
            }
        } else {
            return {
                index: refIndex,
                vote: {
                    type: 'Split',
                    aye: vote.aye,
                    nay: vote.nay,
                },
            }
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface DemocracyDelegateCallData {
    to: any
    conviction: string,
    balance?: bigint
}

export function getDelegateData(ctx: BatchContext<Store, unknown>, itemCall: any): DemocracyDelegateCallData {
    const event = new DemocracyDelegateCall(ctx, itemCall)
    if (event.isV1020) {
        const { to, conviction } = event.asV1020
        return {
            to,
            conviction: conviction.__kind
        }
    } else if (event.isV1055) {
        const { to, conviction, balance } = event.asV1055
        return {
            to: to,
            conviction: conviction.__kind,
            balance
        }
    } else if (event.isV9291) {
        const { to, conviction, balance } = event.asV9291
        return {
            to: to.value,
            conviction: conviction.__kind,
            balance
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface DemocracyRemoveVoteCallData {
    index: number
}

export function getRemoveVoteData(ctx: BatchContext<Store, unknown>, itemCall: any): DemocracyRemoveVoteCallData {
    const event = new DemocracyRemoveVoteCall(ctx, itemCall)
    if (event.isV1055) {
        const { index } = event.asV1055
        return {
            index
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}