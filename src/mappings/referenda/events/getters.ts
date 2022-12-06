import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import {
    ReferendaCancelledEvent,
    DemocracyExecutedEvent,
    ReferendaRejectedEvent,
    ReferendaApprovedEvent,
    DemocracyPreimageInvalidEvent,
    DemocracyPreimageMissingEvent,
    DemocracyPreimageNotedEvent,
    DemocracyPreimageReapedEvent,
    DemocracyPreimageUsedEvent,
    ReferendaSubmittedEvent,
    ReferendaDecisionStartedEvent,
    DemocracyTabledEvent,
    ReferendaConfirmedEvent,
    ReferendaTimedOutEvent,
    ReferendaKilledEvent,
    ReferendaConfirmStartedEvent,
    ReferendaConfirmAbortedEvent,
} from '../../../types/events'
import { Event } from '../../../types/support'

export interface CancelledData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getCancelledData(ctx: BatchContext<Store, unknown>, itemEvent: Event): CancelledData {
    const event = new ReferendaCancelledEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConfirmedData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getConfirmedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): ConfirmedData {
    const event = new ReferendaConfirmedEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getExecutedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): number {
    const event = new DemocracyExecutedEvent(ctx, itemEvent)
    if (event.isV1020) {
        return event.asV1020[0]
    } else if (event.isV9090) {
        return event.asV9090[0]
    } else if (event.isV9111) {
        return event.asV9111[0]
    } else {
        const data = ctx._chain.decodeEvent(itemEvent)
        return data.refIndex
    }
}

export interface RejectedData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getRejectedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): RejectedData {
    const event = new ReferendaRejectedEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface TimedOutData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getTimedOutData(ctx: BatchContext<Store, unknown>, itemEvent: Event): TimedOutData {
    const event = new ReferendaTimedOutEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface KilledData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getKilledData(ctx: BatchContext<Store, unknown>, itemEvent: Event): KilledData {
    const event = new ReferendaKilledEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, tally } = event.asV9320
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getApprovedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): number {
    const event = new ReferendaApprovedEvent(ctx, itemEvent)
    if (event.isV9320) {
        return event.asV9320.index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmStartedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): number {
    const event = new ReferendaConfirmStartedEvent(ctx, itemEvent)
    if (event.isV9320) {
        return event.asV9320.index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmAbortedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): number {
    const event = new ReferendaConfirmAbortedEvent(ctx, itemEvent)
    if (event.isV9320) {
        return event.asV9320.index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageInvalidData {
    hash: Uint8Array
    index: number
}

export function getPreimageInvalidData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageInvalidData {
    const event = new DemocracyPreimageInvalidEvent(ctx, itemEvent)
    if (event.isV1022) {
        const [hash, index] = event.asV1022
        return {
            hash,
            index,
        }
    } else if (event.isV9130) {
        const { proposalHash: hash, refIndex: index } = event.asV9130
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageMissingData {
    hash: Uint8Array
    index: number
}

export function getPreimageMissingData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageMissingData {
    const event = new DemocracyPreimageMissingEvent(ctx, itemEvent)
    if (event.isV1022) {
        const [hash, index] = event.asV1022
        return {
            hash,
            index,
        }
    } else if (event.isV9130) {
        const { proposalHash: hash, refIndex: index } = event.asV9130
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

interface PreimageNotedData {
    hash: Uint8Array
    provider: Uint8Array
    deposit: bigint
}

export function getPreimageNotedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageNotedData {
    const event = new DemocracyPreimageNotedEvent(ctx, itemEvent)
    if (event.isV1022) {
        const [hash, provider, deposit] = event.asV1022
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.isV9130) {
        const { proposalHash: hash, who: provider, deposit } = event.asV9130
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageReapedData {
    hash: Uint8Array
    provider: Uint8Array
    deposit: bigint
}

export function getPreimageReapedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageReapedData {
    const event = new DemocracyPreimageReapedEvent(ctx, itemEvent)
    if (event.isV1022) {
        const [hash, provider, deposit] = event.asV1022
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.isV9130) {
        const { proposalHash: hash, provider, deposit } = event.asV9130
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageUsedData {
    hash: Uint8Array
    provider: Uint8Array
    deposit: bigint
}

export function getPreimageUsedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageUsedData {
    const event = new DemocracyPreimageUsedEvent(ctx, itemEvent)
    if (event.isV1022) {
        const [hash, provider, deposit] = event.asV1022
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.isV9130) {
        const { proposalHash: hash, provider, deposit } = event.asV9130
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendumOpenGovEventData {
    index: number
    track: number
    hash: Uint8Array
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getDecisionStartedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): ReferendumOpenGovEventData {
    const event = new ReferendaDecisionStartedEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, track, proposal, tally } = event.asV9320
        let hash
        switch (proposal.__kind) {
            case "Legacy":
                hash = proposal.hash
                break;
            case "Inline":
                hash = proposal.value
                break;
            case "Lookup":
                hash = proposal.hash
                break;
        }
        return {
            index,
            track,
            hash,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface SubmittedData {
    index: number
    track: number
    hash: Uint8Array
    len: number | undefined
}

export function getSubmittedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): SubmittedData {
    const event = new ReferendaSubmittedEvent(ctx, itemEvent)
    if (event.isV9320) {
        const { index, track, proposal } = event.asV9320
        let hash
        let len
        switch (proposal.__kind) {
            case "Legacy":
                hash = proposal.hash
                break;
            case "Inline":
                hash = proposal.value
                break;
            case "Lookup":
                hash = proposal.hash
                len = proposal.len
                break;
        }
        return {
            index,
            track,
            hash,
            len
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

interface TabledEventData {
    index: number
    deposit: bigint
    depositors?: Uint8Array[]
}

export function getTabledEventData(ctx: BatchContext<Store, unknown>, itemEvent: Event): TabledEventData {
    const event = new DemocracyTabledEvent(ctx, itemEvent)
    if (event.isV1020) {
        const [index, deposit, depositors] = event.asV1020
        return {
            index,
            deposit,
            depositors,
        }
    } else if (event.isV9130) {
        const { proposalIndex: index, deposit, depositors } = event.asV9130
        return {
            index,
            deposit,
            depositors,
        }
    } else if (event.isV9320) {
        const { proposalIndex: index, deposit } = event.asV9320
        return {
            index,
            deposit
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}
