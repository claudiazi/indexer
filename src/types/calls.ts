import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v1020 from './v1020'
import * as v1055 from './v1055'
import * as v9111 from './v9111'
import * as v9291 from './v9291'

export class DemocracyDelegateCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Democracy.delegate')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Delegate vote.
   * 
   *  # <weight>
   *  - One extra DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Democracy.delegate') === 'd9417a632105aca765ccf10b89de97fe97492311af7c953010fed5edc4ea50ec'
  }

  /**
   *  Delegate vote.
   * 
   *  # <weight>
   *  - One extra DB entry.
   *  # </weight>
   */
  get asV1020(): {to: Uint8Array, conviction: v1020.Conviction} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Delegate the voting power (with some given conviction) of the sending account.
   * 
   *  The balance delegated is locked for as long as it's delegated, and thereafter for the
   *  time appropriate for the conviction's lock period.
   * 
   *  The dispatch origin of this call must be _Signed_, and the signing account must either:
   *    - be delegating already; or
   *    - have no voting activity (if there is, then it will need to be removed/consolidated
   *      through `reap_vote` or `unvote`).
   * 
   *  - `to`: The account whose voting the `target` account's voting power will follow.
   *  - `conviction`: The conviction that will be attached to the delegated votes. When the
   *    account is undelegated, the funds will be locked for the corresponding period.
   *  - `balance`: The amount of the account's balance to be used in delegating. This must
   *    not be more than the account's current balance.
   * 
   *  Emits `Delegated`.
   * 
   *  # <weight>
   *  # </weight>
   */
  get isV1055(): boolean {
    return this._chain.getCallHash('Democracy.delegate') === '719d303e364256b757876a8d1b18c8d62a96223d68ffc6f6c1bf18240e8d9793'
  }

  /**
   *  Delegate the voting power (with some given conviction) of the sending account.
   * 
   *  The balance delegated is locked for as long as it's delegated, and thereafter for the
   *  time appropriate for the conviction's lock period.
   * 
   *  The dispatch origin of this call must be _Signed_, and the signing account must either:
   *    - be delegating already; or
   *    - have no voting activity (if there is, then it will need to be removed/consolidated
   *      through `reap_vote` or `unvote`).
   * 
   *  - `to`: The account whose voting the `target` account's voting power will follow.
   *  - `conviction`: The conviction that will be attached to the delegated votes. When the
   *    account is undelegated, the funds will be locked for the corresponding period.
   *  - `balance`: The amount of the account's balance to be used in delegating. This must
   *    not be more than the account's current balance.
   * 
   *  Emits `Delegated`.
   * 
   *  # <weight>
   *  # </weight>
   */
  get asV1055(): {to: Uint8Array, conviction: v1055.Conviction, balance: bigint} {
    assert(this.isV1055)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Delegate the voting power (with some given conviction) of the sending account.
   * 
   * The balance delegated is locked for as long as it's delegated, and thereafter for the
   * time appropriate for the conviction's lock period.
   * 
   * The dispatch origin of this call must be _Signed_, and the signing account must either:
   *   - be delegating already; or
   *   - have no voting activity (if there is, then it will need to be removed/consolidated
   *     through `reap_vote` or `unvote`).
   * 
   * - `to`: The account whose voting the `target` account's voting power will follow.
   * - `conviction`: The conviction that will be attached to the delegated votes. When the
   *   account is undelegated, the funds will be locked for the corresponding period.
   * - `balance`: The amount of the account's balance to be used in delegating. This must not
   *   be more than the account's current balance.
   * 
   * Emits `Delegated`.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter delegating to has
   *   voted on. Weight is charged as if maximum votes.
   */
  get isV9291(): boolean {
    return this._chain.getCallHash('Democracy.delegate') === '789db36a1c43e1ffdad52288f8573a492f529890632f51821e7bd1d74ba6cffc'
  }

  /**
   * Delegate the voting power (with some given conviction) of the sending account.
   * 
   * The balance delegated is locked for as long as it's delegated, and thereafter for the
   * time appropriate for the conviction's lock period.
   * 
   * The dispatch origin of this call must be _Signed_, and the signing account must either:
   *   - be delegating already; or
   *   - have no voting activity (if there is, then it will need to be removed/consolidated
   *     through `reap_vote` or `unvote`).
   * 
   * - `to`: The account whose voting the `target` account's voting power will follow.
   * - `conviction`: The conviction that will be attached to the delegated votes. When the
   *   account is undelegated, the funds will be locked for the corresponding period.
   * - `balance`: The amount of the account's balance to be used in delegating. This must not
   *   be more than the account's current balance.
   * 
   * Emits `Delegated`.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter delegating to has
   *   voted on. Weight is charged as if maximum votes.
   */
  get asV9291(): {to: v9291.MultiAddress, conviction: v9291.Conviction, balance: bigint} {
    assert(this.isV9291)
    return this._chain.decodeCall(this.call)
  }
}

export class DemocracyRemoveOtherVoteCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Democracy.remove_other_vote')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Remove a vote for a referendum.
   * 
   *  If the `target` is equal to the signer, then this function is exactly equivalent to
   *  `remove_vote`. If not equal to the signer, then the vote must have expired,
   *  either because the referendum was cancelled, because the voter lost the referendum or
   *  because the conviction period is over.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `target`: The account of the vote to be removed; this account must have voted for
   *    referendum `index`.
   *  - `index`: The index of referendum of the vote to be removed.
   * 
   *  # <weight>
   *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *  # </weight>
   */
  get isV1055(): boolean {
    return this._chain.getCallHash('Democracy.remove_other_vote') === '57db819150acc73e380a9908a05d4f777cd3af825527d7ad88560426e1d0f652'
  }

  /**
   *  Remove a vote for a referendum.
   * 
   *  If the `target` is equal to the signer, then this function is exactly equivalent to
   *  `remove_vote`. If not equal to the signer, then the vote must have expired,
   *  either because the referendum was cancelled, because the voter lost the referendum or
   *  because the conviction period is over.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `target`: The account of the vote to be removed; this account must have voted for
   *    referendum `index`.
   *  - `index`: The index of referendum of the vote to be removed.
   * 
   *  # <weight>
   *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *  # </weight>
   */
  get asV1055(): {target: Uint8Array, index: number} {
    assert(this.isV1055)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Remove a vote for a referendum.
   * 
   * If the `target` is equal to the signer, then this function is exactly equivalent to
   * `remove_vote`. If not equal to the signer, then the vote must have expired,
   * either because the referendum was cancelled, because the voter lost the referendum or
   * because the conviction period is over.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `target`: The account of the vote to be removed; this account must have voted for
   *   referendum `index`.
   * - `index`: The index of referendum of the vote to be removed.
   * 
   * Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *   Weight is calculated for the maximum number of vote.
   */
  get isV9291(): boolean {
    return this._chain.getCallHash('Democracy.remove_other_vote') === '43d317508cc3ba04dcadb411eb6499f25532d64ab5a169b27410116c72f40a26'
  }

  /**
   * Remove a vote for a referendum.
   * 
   * If the `target` is equal to the signer, then this function is exactly equivalent to
   * `remove_vote`. If not equal to the signer, then the vote must have expired,
   * either because the referendum was cancelled, because the voter lost the referendum or
   * because the conviction period is over.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `target`: The account of the vote to be removed; this account must have voted for
   *   referendum `index`.
   * - `index`: The index of referendum of the vote to be removed.
   * 
   * Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *   Weight is calculated for the maximum number of vote.
   */
  get asV9291(): {target: v9291.MultiAddress, index: number} {
    assert(this.isV9291)
    return this._chain.decodeCall(this.call)
  }
}

export class DemocracyRemoveVoteCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Democracy.remove_vote')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Remove a vote for a referendum.
   * 
   *  If:
   *  - the referendum was cancelled, or
   *  - the referendum is ongoing, or
   *  - the referendum has ended such that
   *    - the vote of the account was in opposition to the result; or
   *    - there was no conviction to the account's vote; or
   *    - the account made a split vote
   *  ...then the vote is removed cleanly and a following call to `unlock` may result in more
   *  funds being available.
   * 
   *  If, however, the referendum has ended and:
   *  - it finished corresponding to the vote of the account, and
   *  - the account made a standard vote with conviction, and
   *  - the lock period of the conviction is not over
   *  ...then the lock will be aggregated into the overall account's lock, which may involve
   *  *overlocking* (where the two locks are combined into a single lock that is the maximum
   *  of both the amount locked and the time is it locked for).
   * 
   *  The dispatch origin of this call must be _Signed_, and the signer must have a vote
   *  registered for referendum `index`.
   * 
   *  - `index`: The index of referendum of the vote to be removed.
   * 
   *  # <weight>
   *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *  # </weight>
   */
  get isV1055(): boolean {
    return this._chain.getCallHash('Democracy.remove_vote') === '25a99cc820e15400356f62165725d9d84847d859e62ca1e5fd6eb340dc5c217e'
  }

  /**
   *  Remove a vote for a referendum.
   * 
   *  If:
   *  - the referendum was cancelled, or
   *  - the referendum is ongoing, or
   *  - the referendum has ended such that
   *    - the vote of the account was in opposition to the result; or
   *    - there was no conviction to the account's vote; or
   *    - the account made a split vote
   *  ...then the vote is removed cleanly and a following call to `unlock` may result in more
   *  funds being available.
   * 
   *  If, however, the referendum has ended and:
   *  - it finished corresponding to the vote of the account, and
   *  - the account made a standard vote with conviction, and
   *  - the lock period of the conviction is not over
   *  ...then the lock will be aggregated into the overall account's lock, which may involve
   *  *overlocking* (where the two locks are combined into a single lock that is the maximum
   *  of both the amount locked and the time is it locked for).
   * 
   *  The dispatch origin of this call must be _Signed_, and the signer must have a vote
   *  registered for referendum `index`.
   * 
   *  - `index`: The index of referendum of the vote to be removed.
   * 
   *  # <weight>
   *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
   *  # </weight>
   */
  get asV1055(): {index: number} {
    assert(this.isV1055)
    return this._chain.decodeCall(this.call)
  }
}

export class DemocracyUndelegateCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Democracy.undelegate')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Undelegate vote.
   * 
   *  # <weight>
   *  - O(1).
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Democracy.undelegate') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Undelegate vote.
   * 
   *  # <weight>
   *  - O(1).
   *  # </weight>
   */
  get asV1020(): null {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}

export class DemocracyVoteCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Democracy.vote')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('Democracy.vote') === '3a01fd8d5e95145a311b99cf21decce5be8578650f311f3a6091395407f5efe9'
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get asV1020(): {refIndex: number, vote: number} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  # <weight>
   *  - `O(1)`.
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get isV1055(): boolean {
    return this._chain.getCallHash('Democracy.vote') === '6cdb35b5ffcb74405cdf222b0cc0bf7ad7025d59f676bea6712d77bcc9aff1db'
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  # <weight>
   *  - `O(1)`.
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get asV1055(): {refIndex: number, vote: v1055.AccountVote} {
    assert(this.isV1055)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get isV9111(): boolean {
    return this._chain.getCallHash('Democracy.vote') === '3936a4cb49f77280bd94142d4ec458afcf5cb8a5e5b0d602b1b1530928021e28'
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get asV9111(): {refIndex: number, vote: v9111.AccountVote} {
    assert(this.isV9111)
    return this._chain.decodeCall(this.call)
  }
}

export class SystemRemarkCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'System.remark')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Make some on-chain remark.
   */
  get isV1020(): boolean {
    return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
  }

  /**
   *  Make some on-chain remark.
   */
  get asV1020(): {remark: Uint8Array} {
    assert(this.isV1020)
    return this._chain.decodeCall(this.call)
  }
}
