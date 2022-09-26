import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v1020 from './v1020'
import * as v9090 from './v9090'
import * as v9111 from './v9111'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
import * as v9170 from './v9170'
import * as v9190 from './v9190'

export class CouncilClosedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Council.Closed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get isV1050(): boolean {
    return this._chain.getEventHash('Council.Closed') === '7d509ca6ee36d401f2d5410aa32038550c256cc3ce4b34cdfe1f8adea0e1679c'
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get asV1050(): [Uint8Array, number, number] {
    assert(this.isV1050)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Council.Closed') === '084e73926c22836c888c17e49053d3b72e2feaa904b8f0175d21fb5b800542f9'
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get asV9130(): {proposalHash: Uint8Array, yes: number, no: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class CouncilProposedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Council.Proposed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get isV1020(): boolean {
    return this._chain.getEventHash('Council.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get asV1020(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Council.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV9130(): {account: Uint8Array, proposalIndex: number, proposalHash: Uint8Array, threshold: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyCancelledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Cancelled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Cancelled') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV1020(): number {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A referendum has been cancelled.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Cancelled') === '8a84371403a09e2f8fc2aac80f5a8a53229b346c4b3859069867b8e656b13450'
  }

  /**
   * A referendum has been cancelled.
   */
  get asV9130(): {refIndex: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyExecutedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Executed')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === 'f267e1fa04f32dd15473e3a6d2514ae684bd7ba5516d192ba70e4d49211868aa'
  }

  get asV1020(): [number, boolean] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   *  A proposal has been enacted. \[ref_index, result\]
   */
  get isV9090(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === '8d7c54bbac5b548a558504b413146fe5bff0b9275a2e7f4c831a148273ee173a'
  }

  /**
   *  A proposal has been enacted. \[ref_index, result\]
   */
  get asV9090(): [number, Result<null, v9090.DispatchError>] {
    assert(this.isV9090)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been enacted. \[ref_index, result\]
   */
  get isV9111(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === '4569400573983e7dffe031a303e5028518f139390f47223a097cb35de3005258'
  }

  /**
   * A proposal has been enacted. \[ref_index, result\]
   */
  get asV9111(): [number, Result<null, v9111.DispatchError>] {
    assert(this.isV9111)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been enacted.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === '1f0fb32f2f0aaba231b69023c5858e85b8bfd660b5ce8c47d1b99b39602e4963'
  }

  /**
   * A proposal has been enacted.
   */
  get asV9130(): {refIndex: number, result: Result<null, v9130.DispatchError>} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been enacted.
   */
  get isV9160(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === 'fe9cbb2e8fcebf406053419831a31120f211751f75230bfefe38454cc691c00a'
  }

  /**
   * A proposal has been enacted.
   */
  get asV9160(): {refIndex: number, result: Result<null, v9160.DispatchError>} {
    assert(this.isV9160)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been enacted.
   */
  get isV9170(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === '98c3caaef1b84143deea16c761096200c5e0e631c6a3776ed012edc9788cf6e2'
  }

  /**
   * A proposal has been enacted.
   */
  get asV9170(): {refIndex: number, result: Result<null, v9170.DispatchError>} {
    assert(this.isV9170)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been enacted.
   */
  get isV9190(): boolean {
    return this._chain.getEventHash('Democracy.Executed') === '2abe2e7ca2af8b119eb4f3a1f669843943049e3f4e2f613fc3b077115902ca2b'
  }

  /**
   * A proposal has been enacted.
   */
  get asV9190(): {refIndex: number, result: Result<null, v9190.DispatchError>} {
    assert(this.isV9190)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyNotPassedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.NotPassed')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.NotPassed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV1020(): number {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been rejected by referendum.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.NotPassed') === '8a84371403a09e2f8fc2aac80f5a8a53229b346c4b3859069867b8e656b13450'
  }

  /**
   * A proposal has been rejected by referendum.
   */
  get asV9130(): {refIndex: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPassedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Passed')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Passed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV1020(): number {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal has been approved by referendum.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Passed') === '8a84371403a09e2f8fc2aac80f5a8a53229b346c4b3859069867b8e656b13450'
  }

  /**
   * A proposal has been approved by referendum.
   */
  get asV9130(): {refIndex: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPreimageInvalidEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.PreimageInvalid')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal could not be executed because its preimage was invalid.
   */
  get isV1022(): boolean {
    return this._chain.getEventHash('Democracy.PreimageInvalid') === 'a86a85822cc09ae7b3b9587f12944d2954476832a499d679c195ffaa86c16212'
  }

  /**
   *  A proposal could not be executed because its preimage was invalid.
   */
  get asV1022(): [Uint8Array, number] {
    assert(this.isV1022)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal could not be executed because its preimage was invalid.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.PreimageInvalid') === 'd21a40db31aa35f736256c62aed3838360364afbf5d732372a68110d811862d6'
  }

  /**
   * A proposal could not be executed because its preimage was invalid.
   */
  get asV9130(): {proposalHash: Uint8Array, refIndex: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPreimageMissingEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.PreimageMissing')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal could not be executed because its preimage was missing.
   */
  get isV1022(): boolean {
    return this._chain.getEventHash('Democracy.PreimageMissing') === 'a86a85822cc09ae7b3b9587f12944d2954476832a499d679c195ffaa86c16212'
  }

  /**
   *  A proposal could not be executed because its preimage was missing.
   */
  get asV1022(): [Uint8Array, number] {
    assert(this.isV1022)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal could not be executed because its preimage was missing.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.PreimageMissing') === 'd21a40db31aa35f736256c62aed3838360364afbf5d732372a68110d811862d6'
  }

  /**
   * A proposal could not be executed because its preimage was missing.
   */
  get asV9130(): {proposalHash: Uint8Array, refIndex: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPreimageNotedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.PreimageNoted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal's preimage was noted, and the deposit taken.
   */
  get isV1022(): boolean {
    return this._chain.getEventHash('Democracy.PreimageNoted') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  A proposal's preimage was noted, and the deposit taken.
   */
  get asV1022(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1022)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal's preimage was noted, and the deposit taken.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.PreimageNoted') === 'd070eaca902e57d242e4f2fcf32e1044fe909d807ce0a0303e2bb45499fc9748'
  }

  /**
   * A proposal's preimage was noted, and the deposit taken.
   */
  get asV9130(): {proposalHash: Uint8Array, who: Uint8Array, deposit: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPreimageReapedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.PreimageReaped')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A registered preimage was removed and the deposit collected by the reaper (last item).
   */
  get isV1022(): boolean {
    return this._chain.getEventHash('Democracy.PreimageReaped') === 'b60e8c24758d2dae6f1d75c508a3141a304f756181262747ee8d704bd555ac86'
  }

  /**
   *  A registered preimage was removed and the deposit collected by the reaper (last item).
   */
  get asV1022(): [Uint8Array, Uint8Array, bigint, Uint8Array] {
    assert(this.isV1022)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A registered preimage was removed and the deposit collected by the reaper.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.PreimageReaped') === '3140454b0dfcc8f9c1ccda6a2fe7f5153f3d34c52e1e5bb1d954b96b8f5dd4a5'
  }

  /**
   * A registered preimage was removed and the deposit collected by the reaper.
   */
  get asV9130(): {proposalHash: Uint8Array, provider: Uint8Array, deposit: bigint, reaper: Uint8Array} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyPreimageUsedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.PreimageUsed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal preimage was removed and used (the deposit was returned).
   */
  get isV1022(): boolean {
    return this._chain.getEventHash('Democracy.PreimageUsed') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   *  A proposal preimage was removed and used (the deposit was returned).
   */
  get asV1022(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1022)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal preimage was removed and used (the deposit was returned).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.PreimageUsed') === '7b28a71d659ed286affdbc9e835b253b80485e4b3be08d04bfb153f8f8cc5241'
  }

  /**
   * A proposal preimage was removed and used (the deposit was returned).
   */
  get asV9130(): {proposalHash: Uint8Array, provider: Uint8Array, deposit: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyProposedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Proposed')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Proposed') === 'a0e51e81445baa317309351746e010ed2435e30ff7e53fbb2cf59283f3b9c536'
  }

  get asV1020(): [number, bigint] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A motion has been proposed by a public account.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Proposed') === '02ae149915d453560f4d12074a380744b3bbb2fe4c235e963f440e2d79243477'
  }

  /**
   * A motion has been proposed by a public account.
   */
  get asV9130(): {proposalIndex: number, deposit: bigint} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyStartedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Started')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Started') === '31dcae10175d30392db6fc8a872e963baae4bcf3ee28dfd38b1653a0751c031f'
  }

  get asV1020(): [number, v1020.VoteThreshold] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A referendum has begun.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Started') === '663653944bacc0e562b015a412877b12c32bc62814b673192c550438bf618ab4'
  }

  /**
   * A referendum has begun.
   */
  get asV9130(): {refIndex: number, threshold: v9130.VoteThreshold} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class DemocracyTabledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Democracy.Tabled')
    this._chain = ctx._chain
    this.event = event
  }

  get isV1020(): boolean {
    return this._chain.getEventHash('Democracy.Tabled') === '21f3d10122d183ae1df61d3456ae07c362a2e0cdffab1829f4febb4f7b53f6bd'
  }

  get asV1020(): [number, bigint, Uint8Array[]] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A public proposal has been tabled for referendum vote.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('Democracy.Tabled') === 'a13f0b4abdda616a48f0910930f31ca5c2a2a8068c5289a35d395475289bd1e0'
  }

  /**
   * A public proposal has been tabled for referendum vote.
   */
  get asV9130(): {proposalIndex: number, deposit: bigint, depositors: Uint8Array[]} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class TechnicalCommitteeApprovedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TechnicalCommittee.Approved')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A motion was approved by the required threshold.
   */
  get isV1020(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Approved') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  A motion was approved by the required threshold.
   */
  get asV1020(): Uint8Array {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A motion was approved by the required threshold.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Approved') === 'b8668610145a6851ad2d5b7dd4bfc15e29402d9a8558401ab955896007f866a5'
  }

  /**
   * A motion was approved by the required threshold.
   */
  get asV9130(): {proposalHash: Uint8Array} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class TechnicalCommitteeClosedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TechnicalCommittee.Closed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get isV1050(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Closed') === '7d509ca6ee36d401f2d5410aa32038550c256cc3ce4b34cdfe1f8adea0e1679c'
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get asV1050(): [Uint8Array, number, number] {
    assert(this.isV1050)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Closed') === '084e73926c22836c888c17e49053d3b72e2feaa904b8f0175d21fb5b800542f9'
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get asV9130(): {proposalHash: Uint8Array, yes: number, no: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}

export class TechnicalCommitteeProposedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TechnicalCommittee.Proposed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get isV1020(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get asV1020(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV9130(): boolean {
    return this._chain.getEventHash('TechnicalCommittee.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV9130(): {account: Uint8Array, proposalIndex: number, proposalHash: Uint8Array, threshold: number} {
    assert(this.isV9130)
    return this._chain.decodeEvent(this.event)
  }
}
