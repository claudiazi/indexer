import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v1020 from './v1020'
import * as v1055 from './v1055'
import * as v1058 from './v1058'
import * as v9111 from './v9111'

export class BalancesTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The total units issued in the system.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV1020(): Promise<bigint> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class DemocracyPreimagesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  get isV1022() {
    return this._chain.getStorageItemTypeHash('Democracy', 'Preimages') === '8d49bec84532cce5991ad4c420ddf4ab792644a27de5f8450488e36a6c1c40ef'
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  async getAsV1022(key: Uint8Array): Promise<[Uint8Array, Uint8Array, bigint, number] | undefined> {
    assert(this.isV1022)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'Preimages', key)
  }

  async getManyAsV1022(keys: Uint8Array[]): Promise<([Uint8Array, Uint8Array, bigint, number] | undefined)[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages', keys.map(k => [k]))
  }

  async getAllAsV1022(): Promise<([Uint8Array, Uint8Array, bigint, number])[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages')
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  get isV1058() {
    return this._chain.getStorageItemTypeHash('Democracy', 'Preimages') === '0e0e3c0f32264d14a97bb80cf16ecda808e2404f87100dc025cf84cfcc821fef'
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  async getAsV1058(key: Uint8Array): Promise<v1058.PreimageStatus | undefined> {
    assert(this.isV1058)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'Preimages', key)
  }

  async getManyAsV1058(keys: Uint8Array[]): Promise<(v1058.PreimageStatus | undefined)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages', keys.map(k => [k]))
  }

  async getAllAsV1058(): Promise<(v1058.PreimageStatus)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages')
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Democracy', 'Preimages') === '2762abd948712e87f9324ca0c5ad1523f92ac946c587c97414ce71252440341f'
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  async getAsV9111(key: Uint8Array): Promise<v9111.PreimageStatus | undefined> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'Preimages', key)
  }

  async getManyAsV9111(keys: Uint8Array[]): Promise<(v9111.PreimageStatus | undefined)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages', keys.map(k => [k]))
  }

  async getAllAsV9111(): Promise<(v9111.PreimageStatus)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'Preimages')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Democracy', 'Preimages') != null
  }
}

export class DemocracyPublicPropCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The number of (public) proposals that have been made so far.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of (public) proposals that have been made so far.
   */
  async getAsV1020(): Promise<number> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicPropCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') != null
  }
}

export class DemocracyPublicPropsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The public proposals. Unsorted.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicProps') === '73cb1a7c4424f713001c8416e3f33d8a4cff058377ae880f2cae103ae0ffec18'
  }

  /**
   *  The public proposals. Unsorted.
   */
  async getAsV1020(): Promise<[number, v1020.Proposal, Uint8Array][]> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicProps')
  }

  /**
   *  The public proposals. Unsorted. The second item is the proposal's hash.
   */
  get isV1022() {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicProps') === '54835df1906ed20adb15939607ddf49a9a1447f02d476ca5b7b39c1f35e1a40f'
  }

  /**
   *  The public proposals. Unsorted. The second item is the proposal's hash.
   */
  async getAsV1022(): Promise<[number, Uint8Array, Uint8Array][]> {
    assert(this.isV1022)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicProps')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicProps') != null
  }
}

export class DemocracyReferendumInfoOfStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Information concerning any given referendum.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') === 'b841a2a79796892945d8a9256375f0a9e422926b95cb3e85c8edae023ec07300'
  }

  /**
   *  Information concerning any given referendum.
   */
  async getAsV1020(key: number): Promise<v1020.Type_283 | undefined> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', key)
  }

  async getManyAsV1020(keys: number[]): Promise<(v1020.Type_283 | undefined)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', keys.map(k => [k]))
  }

  async getAllAsV1020(): Promise<(v1020.Type_283)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf')
  }

  /**
   *  Information concerning any given referendum.
   */
  get isV1055() {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') === '657d9c0cc58504c79c02d5040424e2dce3c3e5fe2b52b13a7a024ff5b06c7a99'
  }

  /**
   *  Information concerning any given referendum.
   */
  async getAsV1055(key: number): Promise<v1055.ReferendumInfo | undefined> {
    assert(this.isV1055)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', key)
  }

  async getManyAsV1055(keys: number[]): Promise<(v1055.ReferendumInfo | undefined)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', keys.map(k => [k]))
  }

  async getAllAsV1055(): Promise<(v1055.ReferendumInfo)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf')
  }

  /**
   *  Information concerning any given referendum.
   * 
   *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') === '2e86290b25fe028668a12b0e97306da926c3578533bd5de6396ccfc917cb15e5'
  }

  /**
   *  Information concerning any given referendum.
   * 
   *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
   */
  async getAsV9111(key: number): Promise<v9111.ReferendumInfo | undefined> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', key)
  }

  async getManyAsV9111(keys: number[]): Promise<(v9111.ReferendumInfo | undefined)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', keys.map(k => [k]))
  }

  async getAllAsV9111(): Promise<(v9111.ReferendumInfo)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') != null
  }
}
