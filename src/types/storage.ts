import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v1020 from './v1020'
import * as v1022 from './v1022'
import * as v1024 from './v1024'
import * as v1027 from './v1027'
import * as v1029 from './v1029'
import * as v1030 from './v1030'
import * as v1031 from './v1031'
import * as v1032 from './v1032'
import * as v1038 from './v1038'
import * as v1039 from './v1039'
import * as v1040 from './v1040'
import * as v1042 from './v1042'
import * as v1050 from './v1050'
import * as v1054 from './v1054'
import * as v1055 from './v1055'
import * as v1058 from './v1058'
import * as v1062 from './v1062'
import * as v2005 from './v2005'
import * as v2007 from './v2007'
import * as v2011 from './v2011'
import * as v2013 from './v2013'
import * as v2015 from './v2015'
import * as v2022 from './v2022'
import * as v2023 from './v2023'
import * as v2024 from './v2024'
import * as v2025 from './v2025'
import * as v2026 from './v2026'
import * as v2028 from './v2028'
import * as v2029 from './v2029'
import * as v2030 from './v2030'
import * as v9010 from './v9010'
import * as v9030 from './v9030'
import * as v9040 from './v9040'
import * as v9050 from './v9050'
import * as v9080 from './v9080'
import * as v9090 from './v9090'
import * as v9100 from './v9100'
import * as v9111 from './v9111'
import * as v9122 from './v9122'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
import * as v9170 from './v9170'
import * as v9180 from './v9180'
import * as v9190 from './v9190'
import * as v9220 from './v9220'
import * as v9230 from './v9230'
import * as v9250 from './v9250'
import * as v9271 from './v9271'
import * as v9291 from './v9291'
import * as v9300 from './v9300'
import * as v9320 from './v9320'

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

export class CouncilMembersStorage {
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
   *  The current members of the collective. This is stored sorted (just by value).
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  async getAsV9111(): Promise<Uint8Array[]> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Council', 'Members')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Council', 'Members') != null
  }
}

export class CouncilProposalOfStorage {
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
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '54e55db1bed5771689c23398470e3d79c164300b3002e905baf8a07324946142'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9111(key: Uint8Array): Promise<v9111.Call | undefined> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9111(keys: Uint8Array[]): Promise<(v9111.Call | undefined)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9111(): Promise<(v9111.Call)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9122() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '35e9c06eaf393488c6b16cf365c09693bf1c81cc6d198b6016c29648cb8b11db'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9122(key: Uint8Array): Promise<v9122.Call | undefined> {
    assert(this.isV9122)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9122(keys: Uint8Array[]): Promise<(v9122.Call | undefined)[]> {
    assert(this.isV9122)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9122(): Promise<(v9122.Call)[]> {
    assert(this.isV9122)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9130() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '000fa9eac9f34fd52e1de16af6c8184e689b16aff5b69e5b770310c6592b9a23'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9130(key: Uint8Array): Promise<v9130.Call | undefined> {
    assert(this.isV9130)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9130(keys: Uint8Array[]): Promise<(v9130.Call | undefined)[]> {
    assert(this.isV9130)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9130(): Promise<(v9130.Call)[]> {
    assert(this.isV9130)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9160() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'ae191f57edfafa0ed77684f6c6956e661698f7626fcceabc35fc02aa204fc327'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9160(key: Uint8Array): Promise<v9160.Call | undefined> {
    assert(this.isV9160)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9160(keys: Uint8Array[]): Promise<(v9160.Call | undefined)[]> {
    assert(this.isV9160)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9160(): Promise<(v9160.Call)[]> {
    assert(this.isV9160)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9170() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '92131b74d89cee349edae227d67d4039f396e38796421ef6ccad698229d1be87'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9170(key: Uint8Array): Promise<v9170.Call | undefined> {
    assert(this.isV9170)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9170(keys: Uint8Array[]): Promise<(v9170.Call | undefined)[]> {
    assert(this.isV9170)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9170(): Promise<(v9170.Call)[]> {
    assert(this.isV9170)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9180() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '75d269266869aab19a7c849bd16e82439d759218a7ceb76d9d44ca8913eac77b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9180(key: Uint8Array): Promise<v9180.Call | undefined> {
    assert(this.isV9180)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9180(keys: Uint8Array[]): Promise<(v9180.Call | undefined)[]> {
    assert(this.isV9180)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9180(): Promise<(v9180.Call)[]> {
    assert(this.isV9180)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9190() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'ad90492cf87d0e7973eb29afcc4224fdcd5cea7edbc9f874a78e09ffb7af764a'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9190(key: Uint8Array): Promise<v9190.Call | undefined> {
    assert(this.isV9190)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9190(keys: Uint8Array[]): Promise<(v9190.Call | undefined)[]> {
    assert(this.isV9190)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9190(): Promise<(v9190.Call)[]> {
    assert(this.isV9190)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9220() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '4364e985a64c3f6addf377d90f061349553d92fcbc29839df8b7cde1ec346b0c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9220(key: Uint8Array): Promise<v9220.Call | undefined> {
    assert(this.isV9220)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9220(keys: Uint8Array[]): Promise<(v9220.Call | undefined)[]> {
    assert(this.isV9220)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9220(): Promise<(v9220.Call)[]> {
    assert(this.isV9220)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9230() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '60a712e8f852a3af336091a63ce735a781e9f17a09e4fb3ea560e93a76c19d2e'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9230(key: Uint8Array): Promise<v9230.Call | undefined> {
    assert(this.isV9230)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9230(keys: Uint8Array[]): Promise<(v9230.Call | undefined)[]> {
    assert(this.isV9230)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9230(): Promise<(v9230.Call)[]> {
    assert(this.isV9230)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9250() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'c62c655cbb15038afffc766086c6f698f366a8695bacaa50b3b5b2d97d4b89f5'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9250(key: Uint8Array): Promise<v9250.Call | undefined> {
    assert(this.isV9250)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9250(keys: Uint8Array[]): Promise<(v9250.Call | undefined)[]> {
    assert(this.isV9250)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9250(): Promise<(v9250.Call)[]> {
    assert(this.isV9250)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9271() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'b6f7b824ac82eac6e00f10809e508dfaacd22dda3aeafc8c9374020bd69d27ad'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9271(key: Uint8Array): Promise<v9271.Call | undefined> {
    assert(this.isV9271)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9271(keys: Uint8Array[]): Promise<(v9271.Call | undefined)[]> {
    assert(this.isV9271)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9271(): Promise<(v9271.Call)[]> {
    assert(this.isV9271)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9291() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '15ce1541499aecffbe2bf8eeafc64023633a5d282a468972bd6c44aa77b52ce3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9291(key: Uint8Array): Promise<v9291.Call | undefined> {
    assert(this.isV9291)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9291(keys: Uint8Array[]): Promise<(v9291.Call | undefined)[]> {
    assert(this.isV9291)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9291(): Promise<(v9291.Call)[]> {
    assert(this.isV9291)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9300() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '4489558a261f014c524a3fa533244e852a4234f4db9aba95f960d069aa1a2db7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9300(key: Uint8Array): Promise<v9300.Call | undefined> {
    assert(this.isV9300)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9300(keys: Uint8Array[]): Promise<(v9300.Call | undefined)[]> {
    assert(this.isV9300)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9300(): Promise<(v9300.Call)[]> {
    assert(this.isV9300)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9320() {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'e264f3acf17bae2089248c1b5be4b79c3766ff552e8565a925e0bceaa16c973b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9320(key: Uint8Array): Promise<v9320.Call | undefined> {
    assert(this.isV9320)
    return this._chain.getStorage(this.blockHash, 'Council', 'ProposalOf', key)
  }

  async getManyAsV9320(keys: Uint8Array[]): Promise<(v9320.Call | undefined)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9320(): Promise<(v9320.Call)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'Council', 'ProposalOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Council', 'ProposalOf') != null
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
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicProps') === '0da61e381ba5d7090741171fee74491d6e5f0d3b420709a45911270de6f4da0a'
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
   *  The public proposals. Unsorted. The second item is the proposal.
   */
  get isV9320() {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicProps') === '3472d1c9441381a2b9709395dfc47ee60b049d41fbd71ce557eb1a61ef656bec'
  }

  /**
   *  The public proposals. Unsorted. The second item is the proposal.
   */
  async getAsV9320(): Promise<[number, v9320.Bounded, Uint8Array][]> {
    assert(this.isV9320)
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
   *  Information concerning any given referendum.
   * 
   *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
   */
  get isV9320() {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') === 'ba926738202889ee118b1f40d70a1edbd71f0893c703c708a73330af6ca468e1'
  }

  /**
   *  Information concerning any given referendum.
   * 
   *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
   */
  async getAsV9320(key: number): Promise<v9320.ReferendumInfo | undefined> {
    assert(this.isV9320)
    return this._chain.getStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', key)
  }

  async getManyAsV9320(keys: number[]): Promise<(v9320.ReferendumInfo | undefined)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf', keys.map(k => [k]))
  }

  async getAllAsV9320(): Promise<(v9320.ReferendumInfo)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'Democracy', 'ReferendumInfoOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Democracy', 'ReferendumInfoOf') != null
  }
}

export class ElectionProviderMultiPhaseCurrentPhaseStorage {
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
   *  Current phase.
   */
  get isV2029() {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'CurrentPhase') === 'd43c46e1fdaabf223f7ddc55f3636b227c163ebca9bccdb6f6aca606816cba64'
  }

  /**
   *  Current phase.
   */
  async getAsV2029(): Promise<v2029.ElectionPhase> {
    assert(this.isV2029)
    return this._chain.getStorage(this.blockHash, 'ElectionProviderMultiPhase', 'CurrentPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('ElectionProviderMultiPhase', 'CurrentPhase') != null
  }
}

export class Instance1CollectiveProposalOfStorage {
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
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'ff658fad55af8e9e38fe1bed80067dc6842aefcacc9835f3404ef79a9bfa9a7f'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1020(key: Uint8Array): Promise<v1020.Proposal | undefined> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1020(keys: Uint8Array[]): Promise<(v1020.Proposal | undefined)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1020(): Promise<(v1020.Proposal)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1022() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'cf2bde75ee5bf4aedef305aabd50a859b561d2ea72a3ad32f0253c133c791f40'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1022(key: Uint8Array): Promise<v1022.Proposal | undefined> {
    assert(this.isV1022)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1022(keys: Uint8Array[]): Promise<(v1022.Proposal | undefined)[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1022(): Promise<(v1022.Proposal)[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1024() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'af9a5b7fd3313a46c1c6b41b8b6812f69ff0f2b1edd8d66693a82c0ca49db343'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1024(key: Uint8Array): Promise<v1024.Proposal | undefined> {
    assert(this.isV1024)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1024(keys: Uint8Array[]): Promise<(v1024.Proposal | undefined)[]> {
    assert(this.isV1024)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1024(): Promise<(v1024.Proposal)[]> {
    assert(this.isV1024)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1027() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'fcb038bcf495bae551346ead7a5d7cb7edff11f26babbbe2fcc9d0fbbfb0ee86'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1027(key: Uint8Array): Promise<v1027.Proposal | undefined> {
    assert(this.isV1027)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1027(keys: Uint8Array[]): Promise<(v1027.Proposal | undefined)[]> {
    assert(this.isV1027)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1027(): Promise<(v1027.Proposal)[]> {
    assert(this.isV1027)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1029() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '1fa524953ff02a11fb7b9dc520b34c836bf4a94b731f96f02d8442061891be9a'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1029(key: Uint8Array): Promise<v1029.Proposal | undefined> {
    assert(this.isV1029)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1029(keys: Uint8Array[]): Promise<(v1029.Proposal | undefined)[]> {
    assert(this.isV1029)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1029(): Promise<(v1029.Proposal)[]> {
    assert(this.isV1029)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1030() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '722c944e5d464430da96eb7afb30cb22dcf97958e77a989b11b76e0a08bc91ae'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1030(key: Uint8Array): Promise<v1030.Proposal | undefined> {
    assert(this.isV1030)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1030(keys: Uint8Array[]): Promise<(v1030.Proposal | undefined)[]> {
    assert(this.isV1030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1030(): Promise<(v1030.Proposal)[]> {
    assert(this.isV1030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1031() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '04587b1736af13aca0b303f067e8d8ca82708a7c35f7e540deb889b26b16e850'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1031(key: Uint8Array): Promise<v1031.Proposal | undefined> {
    assert(this.isV1031)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1031(keys: Uint8Array[]): Promise<(v1031.Proposal | undefined)[]> {
    assert(this.isV1031)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1031(): Promise<(v1031.Proposal)[]> {
    assert(this.isV1031)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1032() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '687ab865a15f03a5c5501e45563136c8c7e04087d3f2d252349b1e3afc2bb95b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1032(key: Uint8Array): Promise<v1032.Proposal | undefined> {
    assert(this.isV1032)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1032(keys: Uint8Array[]): Promise<(v1032.Proposal | undefined)[]> {
    assert(this.isV1032)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1032(): Promise<(v1032.Proposal)[]> {
    assert(this.isV1032)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1038() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '4b12bc407721d3d627ff8c350094c66df705befac88991c10ee1900190e41fcd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1038(key: Uint8Array): Promise<v1038.Proposal | undefined> {
    assert(this.isV1038)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1038(keys: Uint8Array[]): Promise<(v1038.Proposal | undefined)[]> {
    assert(this.isV1038)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1038(): Promise<(v1038.Proposal)[]> {
    assert(this.isV1038)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1039() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '280c2b5e09651099a2df56d3a3b1021971981e68df34b2cc71f846a279441cf7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1039(key: Uint8Array): Promise<v1039.Proposal | undefined> {
    assert(this.isV1039)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1039(keys: Uint8Array[]): Promise<(v1039.Proposal | undefined)[]> {
    assert(this.isV1039)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1039(): Promise<(v1039.Proposal)[]> {
    assert(this.isV1039)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1040() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '7b716afbe6383efdfa96087dbe25666ef1749a83171459d7a417e308370bf5ce'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1040(key: Uint8Array): Promise<v1040.Proposal | undefined> {
    assert(this.isV1040)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1040(keys: Uint8Array[]): Promise<(v1040.Proposal | undefined)[]> {
    assert(this.isV1040)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1040(): Promise<(v1040.Proposal)[]> {
    assert(this.isV1040)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1042() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'ba9ae3f886667e78e6929d4b9f36feb891aad7e94d36a75d3c2835143d849183'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1042(key: Uint8Array): Promise<v1042.Proposal | undefined> {
    assert(this.isV1042)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1042(keys: Uint8Array[]): Promise<(v1042.Proposal | undefined)[]> {
    assert(this.isV1042)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1042(): Promise<(v1042.Proposal)[]> {
    assert(this.isV1042)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'd780ab190a15dcdf4e9424c86844bcd43951578af085195d51e82860b74ea017'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1050(key: Uint8Array): Promise<v1050.Proposal | undefined> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1050(keys: Uint8Array[]): Promise<(v1050.Proposal | undefined)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1050(): Promise<(v1050.Proposal)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1054() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '4ee1bcb3e88f1695c390a015a7bb5456bbed70aea3e714981690f4d1e6647d20'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1054(key: Uint8Array): Promise<v1054.Proposal | undefined> {
    assert(this.isV1054)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1054(keys: Uint8Array[]): Promise<(v1054.Proposal | undefined)[]> {
    assert(this.isV1054)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1054(): Promise<(v1054.Proposal)[]> {
    assert(this.isV1054)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1055() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '9b1888d08bbc63ca77fc479899195e8abbc91196043f964ed6ae05f7a6b92ac2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1055(key: Uint8Array): Promise<v1055.Proposal | undefined> {
    assert(this.isV1055)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1055(keys: Uint8Array[]): Promise<(v1055.Proposal | undefined)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1055(): Promise<(v1055.Proposal)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1058() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '51d22c65a4493fbee384e3c6b5480902226dcb7f07fdae2e09b1ed994581b8a2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1058(key: Uint8Array): Promise<v1058.Proposal | undefined> {
    assert(this.isV1058)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1058(keys: Uint8Array[]): Promise<(v1058.Proposal | undefined)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1058(): Promise<(v1058.Proposal)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1062() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '2bebfde2c19829d495b45d6c78ef1337d124232bf319c06661a736c67899c40b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1062(key: Uint8Array): Promise<v1062.Proposal | undefined> {
    assert(this.isV1062)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV1062(keys: Uint8Array[]): Promise<(v1062.Proposal | undefined)[]> {
    assert(this.isV1062)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1062(): Promise<(v1062.Proposal)[]> {
    assert(this.isV1062)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2005() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'b1d8bd7af8a0bdba85190975d77d06e416603175b1c190c6efc22966d2222b42'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2005(key: Uint8Array): Promise<v2005.Proposal | undefined> {
    assert(this.isV2005)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2005(keys: Uint8Array[]): Promise<(v2005.Proposal | undefined)[]> {
    assert(this.isV2005)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2005(): Promise<(v2005.Proposal)[]> {
    assert(this.isV2005)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2007() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '961aa31652f228fead4d9c95205bb44df6d3431225fc46ab1b2bb180613401d3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2007(key: Uint8Array): Promise<v2007.Proposal | undefined> {
    assert(this.isV2007)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2007(keys: Uint8Array[]): Promise<(v2007.Proposal | undefined)[]> {
    assert(this.isV2007)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2007(): Promise<(v2007.Proposal)[]> {
    assert(this.isV2007)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2011() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '611412d18d1c6341ce497288da6f8d52d113a683fd777fa5d7a6c0ac089326a1'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2011(key: Uint8Array): Promise<v2011.Proposal | undefined> {
    assert(this.isV2011)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2011(keys: Uint8Array[]): Promise<(v2011.Proposal | undefined)[]> {
    assert(this.isV2011)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2011(): Promise<(v2011.Proposal)[]> {
    assert(this.isV2011)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2013() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '1095e28f34062b5a0a31d9abd5578a7aa39d989d65d6cd2c6987346f2cacface'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2013(key: Uint8Array): Promise<v2013.Proposal | undefined> {
    assert(this.isV2013)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2013(keys: Uint8Array[]): Promise<(v2013.Proposal | undefined)[]> {
    assert(this.isV2013)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2013(): Promise<(v2013.Proposal)[]> {
    assert(this.isV2013)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2015() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '633a2c0a40bf70aa7d1a84d140419484144593cd4c1fbd16efca4f71428abd5c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2015(key: Uint8Array): Promise<v2015.Proposal | undefined> {
    assert(this.isV2015)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2015(keys: Uint8Array[]): Promise<(v2015.Proposal | undefined)[]> {
    assert(this.isV2015)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2015(): Promise<(v2015.Proposal)[]> {
    assert(this.isV2015)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2022() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'ba39e6f89dc7984a5de5986ba21ea9c7874a17928d35ee22e9f19a6a32b06ed7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2022(key: Uint8Array): Promise<v2022.Proposal | undefined> {
    assert(this.isV2022)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2022(keys: Uint8Array[]): Promise<(v2022.Proposal | undefined)[]> {
    assert(this.isV2022)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2022(): Promise<(v2022.Proposal)[]> {
    assert(this.isV2022)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2023() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '0eff9f067f650895cebad9eb8f6d2e0b87378eb99f6cfcc9188519b6809e81c7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2023(key: Uint8Array): Promise<v2023.Proposal | undefined> {
    assert(this.isV2023)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2023(keys: Uint8Array[]): Promise<(v2023.Proposal | undefined)[]> {
    assert(this.isV2023)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2023(): Promise<(v2023.Proposal)[]> {
    assert(this.isV2023)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2024() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'f47e7718dc7af5fdbceb48ad3c23c248921145bbaaefecdaf3c6e766071a0379'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2024(key: Uint8Array): Promise<v2024.Proposal | undefined> {
    assert(this.isV2024)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2024(keys: Uint8Array[]): Promise<(v2024.Proposal | undefined)[]> {
    assert(this.isV2024)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2024(): Promise<(v2024.Proposal)[]> {
    assert(this.isV2024)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2025() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '20b9a67d80ebdfbcdbeab6296df5fb3c08e4edd42eb821b0d267a4e6a5639fe3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2025(key: Uint8Array): Promise<v2025.Proposal | undefined> {
    assert(this.isV2025)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2025(keys: Uint8Array[]): Promise<(v2025.Proposal | undefined)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2025(): Promise<(v2025.Proposal)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2026() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'b96abbff6a00bf4f4edb47eab52154f403f584ec4ab38b7e4be1af0d215bc2e2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2026(key: Uint8Array): Promise<v2026.Proposal | undefined> {
    assert(this.isV2026)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2026(keys: Uint8Array[]): Promise<(v2026.Proposal | undefined)[]> {
    assert(this.isV2026)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2026(): Promise<(v2026.Proposal)[]> {
    assert(this.isV2026)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2028() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '399c92d404fea7dc92e323f9384520a1dcaf371691e5db7723306cc5b1246d94'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2028(key: Uint8Array): Promise<v2028.Proposal | undefined> {
    assert(this.isV2028)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2028(keys: Uint8Array[]): Promise<(v2028.Proposal | undefined)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2028(): Promise<(v2028.Proposal)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2029() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '468d59d5b40e80c13c2d81c4774d12f145dcf6ba2363aef718241ac2abc28d12'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2029(key: Uint8Array): Promise<v2029.Proposal | undefined> {
    assert(this.isV2029)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2029(keys: Uint8Array[]): Promise<(v2029.Proposal | undefined)[]> {
    assert(this.isV2029)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2029(): Promise<(v2029.Proposal)[]> {
    assert(this.isV2029)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2030() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === 'd82835c91c052dffa0a14eb20b7a8a134d538d2d60742b962f3fa7823c1657fa'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2030(key: Uint8Array): Promise<v2030.Proposal | undefined> {
    assert(this.isV2030)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV2030(keys: Uint8Array[]): Promise<(v2030.Proposal | undefined)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2030(): Promise<(v2030.Proposal)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9010() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '198809793338f28c0a822990194fdeaf2dec25e8848048ce7bb835b676396a37'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9010(key: Uint8Array): Promise<v9010.Proposal | undefined> {
    assert(this.isV9010)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9010(keys: Uint8Array[]): Promise<(v9010.Proposal | undefined)[]> {
    assert(this.isV9010)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9010(): Promise<(v9010.Proposal)[]> {
    assert(this.isV9010)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9030() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '133daac7167756eaebbdcb23c93e2211158671e84e107af848071d3534ed99bd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9030(key: Uint8Array): Promise<v9030.Proposal | undefined> {
    assert(this.isV9030)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9030(keys: Uint8Array[]): Promise<(v9030.Proposal | undefined)[]> {
    assert(this.isV9030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9030(): Promise<(v9030.Proposal)[]> {
    assert(this.isV9030)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9040() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '45640f8fa172b75c33ced53cedf23106c06b9a91427a71e706d9d136aed8d3a6'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9040(key: Uint8Array): Promise<v9040.Proposal | undefined> {
    assert(this.isV9040)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9040(keys: Uint8Array[]): Promise<(v9040.Proposal | undefined)[]> {
    assert(this.isV9040)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9040(): Promise<(v9040.Proposal)[]> {
    assert(this.isV9040)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9050() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '6ffbddf00697f7a651ddd2bd8789384e7dca3980a60aa5a2499d016d43b1ac56'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9050(key: Uint8Array): Promise<v9050.Proposal | undefined> {
    assert(this.isV9050)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9050(keys: Uint8Array[]): Promise<(v9050.Proposal | undefined)[]> {
    assert(this.isV9050)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9050(): Promise<(v9050.Proposal)[]> {
    assert(this.isV9050)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9080() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '5c95cef639e096f92226c0b752c338b2195817a6e7f6d387b5199e8de3e02bab'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9080(key: Uint8Array): Promise<v9080.Proposal | undefined> {
    assert(this.isV9080)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9080(keys: Uint8Array[]): Promise<(v9080.Proposal | undefined)[]> {
    assert(this.isV9080)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9080(): Promise<(v9080.Proposal)[]> {
    assert(this.isV9080)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9090() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '3060f9c0543c77d2a8f13dd41a665b6e953b60cd682f2cd0a4b9e47ca76c255d'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9090(key: Uint8Array): Promise<v9090.Proposal | undefined> {
    assert(this.isV9090)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9090(keys: Uint8Array[]): Promise<(v9090.Proposal | undefined)[]> {
    assert(this.isV9090)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9090(): Promise<(v9090.Proposal)[]> {
    assert(this.isV9090)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9100() {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') === '4da47ef769f8cd0065a1642d93ed9e4664c7b938642677491109a7b2d9dffc5c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9100(key: Uint8Array): Promise<v9100.Proposal | undefined> {
    assert(this.isV9100)
    return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', key)
  }

  async getManyAsV9100(keys: Uint8Array[]): Promise<(v9100.Proposal | undefined)[]> {
    assert(this.isV9100)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9100(): Promise<(v9100.Proposal)[]> {
    assert(this.isV9100)
    return this._chain.queryStorage(this.blockHash, 'Instance1Collective', 'ProposalOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalOf') != null
  }
}

export class Instance2CollectiveProposalOfStorage {
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
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'ff658fad55af8e9e38fe1bed80067dc6842aefcacc9835f3404ef79a9bfa9a7f'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1020(key: Uint8Array): Promise<v1020.Proposal | undefined> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1020(keys: Uint8Array[]): Promise<(v1020.Proposal | undefined)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1020(): Promise<(v1020.Proposal)[]> {
    assert(this.isV1020)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1022() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'cf2bde75ee5bf4aedef305aabd50a859b561d2ea72a3ad32f0253c133c791f40'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1022(key: Uint8Array): Promise<v1022.Proposal | undefined> {
    assert(this.isV1022)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1022(keys: Uint8Array[]): Promise<(v1022.Proposal | undefined)[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1022(): Promise<(v1022.Proposal)[]> {
    assert(this.isV1022)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1024() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'af9a5b7fd3313a46c1c6b41b8b6812f69ff0f2b1edd8d66693a82c0ca49db343'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1024(key: Uint8Array): Promise<v1024.Proposal | undefined> {
    assert(this.isV1024)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1024(keys: Uint8Array[]): Promise<(v1024.Proposal | undefined)[]> {
    assert(this.isV1024)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1024(): Promise<(v1024.Proposal)[]> {
    assert(this.isV1024)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1027() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'fcb038bcf495bae551346ead7a5d7cb7edff11f26babbbe2fcc9d0fbbfb0ee86'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1027(key: Uint8Array): Promise<v1027.Proposal | undefined> {
    assert(this.isV1027)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1027(keys: Uint8Array[]): Promise<(v1027.Proposal | undefined)[]> {
    assert(this.isV1027)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1027(): Promise<(v1027.Proposal)[]> {
    assert(this.isV1027)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1029() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '1fa524953ff02a11fb7b9dc520b34c836bf4a94b731f96f02d8442061891be9a'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1029(key: Uint8Array): Promise<v1029.Proposal | undefined> {
    assert(this.isV1029)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1029(keys: Uint8Array[]): Promise<(v1029.Proposal | undefined)[]> {
    assert(this.isV1029)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1029(): Promise<(v1029.Proposal)[]> {
    assert(this.isV1029)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1030() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '722c944e5d464430da96eb7afb30cb22dcf97958e77a989b11b76e0a08bc91ae'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1030(key: Uint8Array): Promise<v1030.Proposal | undefined> {
    assert(this.isV1030)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1030(keys: Uint8Array[]): Promise<(v1030.Proposal | undefined)[]> {
    assert(this.isV1030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1030(): Promise<(v1030.Proposal)[]> {
    assert(this.isV1030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1031() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '04587b1736af13aca0b303f067e8d8ca82708a7c35f7e540deb889b26b16e850'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1031(key: Uint8Array): Promise<v1031.Proposal | undefined> {
    assert(this.isV1031)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1031(keys: Uint8Array[]): Promise<(v1031.Proposal | undefined)[]> {
    assert(this.isV1031)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1031(): Promise<(v1031.Proposal)[]> {
    assert(this.isV1031)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1032() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '687ab865a15f03a5c5501e45563136c8c7e04087d3f2d252349b1e3afc2bb95b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1032(key: Uint8Array): Promise<v1032.Proposal | undefined> {
    assert(this.isV1032)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1032(keys: Uint8Array[]): Promise<(v1032.Proposal | undefined)[]> {
    assert(this.isV1032)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1032(): Promise<(v1032.Proposal)[]> {
    assert(this.isV1032)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1038() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '4b12bc407721d3d627ff8c350094c66df705befac88991c10ee1900190e41fcd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1038(key: Uint8Array): Promise<v1038.Proposal | undefined> {
    assert(this.isV1038)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1038(keys: Uint8Array[]): Promise<(v1038.Proposal | undefined)[]> {
    assert(this.isV1038)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1038(): Promise<(v1038.Proposal)[]> {
    assert(this.isV1038)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1039() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '280c2b5e09651099a2df56d3a3b1021971981e68df34b2cc71f846a279441cf7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1039(key: Uint8Array): Promise<v1039.Proposal | undefined> {
    assert(this.isV1039)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1039(keys: Uint8Array[]): Promise<(v1039.Proposal | undefined)[]> {
    assert(this.isV1039)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1039(): Promise<(v1039.Proposal)[]> {
    assert(this.isV1039)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1040() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '7b716afbe6383efdfa96087dbe25666ef1749a83171459d7a417e308370bf5ce'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1040(key: Uint8Array): Promise<v1040.Proposal | undefined> {
    assert(this.isV1040)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1040(keys: Uint8Array[]): Promise<(v1040.Proposal | undefined)[]> {
    assert(this.isV1040)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1040(): Promise<(v1040.Proposal)[]> {
    assert(this.isV1040)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1042() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'ba9ae3f886667e78e6929d4b9f36feb891aad7e94d36a75d3c2835143d849183'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1042(key: Uint8Array): Promise<v1042.Proposal | undefined> {
    assert(this.isV1042)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1042(keys: Uint8Array[]): Promise<(v1042.Proposal | undefined)[]> {
    assert(this.isV1042)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1042(): Promise<(v1042.Proposal)[]> {
    assert(this.isV1042)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1050() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'd780ab190a15dcdf4e9424c86844bcd43951578af085195d51e82860b74ea017'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1050(key: Uint8Array): Promise<v1050.Proposal | undefined> {
    assert(this.isV1050)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1050(keys: Uint8Array[]): Promise<(v1050.Proposal | undefined)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1050(): Promise<(v1050.Proposal)[]> {
    assert(this.isV1050)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1054() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '4ee1bcb3e88f1695c390a015a7bb5456bbed70aea3e714981690f4d1e6647d20'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1054(key: Uint8Array): Promise<v1054.Proposal | undefined> {
    assert(this.isV1054)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1054(keys: Uint8Array[]): Promise<(v1054.Proposal | undefined)[]> {
    assert(this.isV1054)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1054(): Promise<(v1054.Proposal)[]> {
    assert(this.isV1054)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1055() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '9b1888d08bbc63ca77fc479899195e8abbc91196043f964ed6ae05f7a6b92ac2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1055(key: Uint8Array): Promise<v1055.Proposal | undefined> {
    assert(this.isV1055)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1055(keys: Uint8Array[]): Promise<(v1055.Proposal | undefined)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1055(): Promise<(v1055.Proposal)[]> {
    assert(this.isV1055)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1058() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '51d22c65a4493fbee384e3c6b5480902226dcb7f07fdae2e09b1ed994581b8a2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1058(key: Uint8Array): Promise<v1058.Proposal | undefined> {
    assert(this.isV1058)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1058(keys: Uint8Array[]): Promise<(v1058.Proposal | undefined)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1058(): Promise<(v1058.Proposal)[]> {
    assert(this.isV1058)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1062() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '2bebfde2c19829d495b45d6c78ef1337d124232bf319c06661a736c67899c40b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1062(key: Uint8Array): Promise<v1062.Proposal | undefined> {
    assert(this.isV1062)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV1062(keys: Uint8Array[]): Promise<(v1062.Proposal | undefined)[]> {
    assert(this.isV1062)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV1062(): Promise<(v1062.Proposal)[]> {
    assert(this.isV1062)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2005() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'b1d8bd7af8a0bdba85190975d77d06e416603175b1c190c6efc22966d2222b42'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2005(key: Uint8Array): Promise<v2005.Proposal | undefined> {
    assert(this.isV2005)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2005(keys: Uint8Array[]): Promise<(v2005.Proposal | undefined)[]> {
    assert(this.isV2005)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2005(): Promise<(v2005.Proposal)[]> {
    assert(this.isV2005)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2007() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '961aa31652f228fead4d9c95205bb44df6d3431225fc46ab1b2bb180613401d3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2007(key: Uint8Array): Promise<v2007.Proposal | undefined> {
    assert(this.isV2007)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2007(keys: Uint8Array[]): Promise<(v2007.Proposal | undefined)[]> {
    assert(this.isV2007)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2007(): Promise<(v2007.Proposal)[]> {
    assert(this.isV2007)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2011() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '611412d18d1c6341ce497288da6f8d52d113a683fd777fa5d7a6c0ac089326a1'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2011(key: Uint8Array): Promise<v2011.Proposal | undefined> {
    assert(this.isV2011)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2011(keys: Uint8Array[]): Promise<(v2011.Proposal | undefined)[]> {
    assert(this.isV2011)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2011(): Promise<(v2011.Proposal)[]> {
    assert(this.isV2011)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2013() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '1095e28f34062b5a0a31d9abd5578a7aa39d989d65d6cd2c6987346f2cacface'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2013(key: Uint8Array): Promise<v2013.Proposal | undefined> {
    assert(this.isV2013)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2013(keys: Uint8Array[]): Promise<(v2013.Proposal | undefined)[]> {
    assert(this.isV2013)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2013(): Promise<(v2013.Proposal)[]> {
    assert(this.isV2013)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2015() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '633a2c0a40bf70aa7d1a84d140419484144593cd4c1fbd16efca4f71428abd5c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2015(key: Uint8Array): Promise<v2015.Proposal | undefined> {
    assert(this.isV2015)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2015(keys: Uint8Array[]): Promise<(v2015.Proposal | undefined)[]> {
    assert(this.isV2015)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2015(): Promise<(v2015.Proposal)[]> {
    assert(this.isV2015)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2022() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'ba39e6f89dc7984a5de5986ba21ea9c7874a17928d35ee22e9f19a6a32b06ed7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2022(key: Uint8Array): Promise<v2022.Proposal | undefined> {
    assert(this.isV2022)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2022(keys: Uint8Array[]): Promise<(v2022.Proposal | undefined)[]> {
    assert(this.isV2022)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2022(): Promise<(v2022.Proposal)[]> {
    assert(this.isV2022)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2023() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '0eff9f067f650895cebad9eb8f6d2e0b87378eb99f6cfcc9188519b6809e81c7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2023(key: Uint8Array): Promise<v2023.Proposal | undefined> {
    assert(this.isV2023)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2023(keys: Uint8Array[]): Promise<(v2023.Proposal | undefined)[]> {
    assert(this.isV2023)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2023(): Promise<(v2023.Proposal)[]> {
    assert(this.isV2023)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2024() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'f47e7718dc7af5fdbceb48ad3c23c248921145bbaaefecdaf3c6e766071a0379'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2024(key: Uint8Array): Promise<v2024.Proposal | undefined> {
    assert(this.isV2024)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2024(keys: Uint8Array[]): Promise<(v2024.Proposal | undefined)[]> {
    assert(this.isV2024)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2024(): Promise<(v2024.Proposal)[]> {
    assert(this.isV2024)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2025() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '20b9a67d80ebdfbcdbeab6296df5fb3c08e4edd42eb821b0d267a4e6a5639fe3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2025(key: Uint8Array): Promise<v2025.Proposal | undefined> {
    assert(this.isV2025)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2025(keys: Uint8Array[]): Promise<(v2025.Proposal | undefined)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2025(): Promise<(v2025.Proposal)[]> {
    assert(this.isV2025)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2026() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'b96abbff6a00bf4f4edb47eab52154f403f584ec4ab38b7e4be1af0d215bc2e2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2026(key: Uint8Array): Promise<v2026.Proposal | undefined> {
    assert(this.isV2026)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2026(keys: Uint8Array[]): Promise<(v2026.Proposal | undefined)[]> {
    assert(this.isV2026)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2026(): Promise<(v2026.Proposal)[]> {
    assert(this.isV2026)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2028() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '399c92d404fea7dc92e323f9384520a1dcaf371691e5db7723306cc5b1246d94'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2028(key: Uint8Array): Promise<v2028.Proposal | undefined> {
    assert(this.isV2028)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2028(keys: Uint8Array[]): Promise<(v2028.Proposal | undefined)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2028(): Promise<(v2028.Proposal)[]> {
    assert(this.isV2028)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2029() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '468d59d5b40e80c13c2d81c4774d12f145dcf6ba2363aef718241ac2abc28d12'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2029(key: Uint8Array): Promise<v2029.Proposal | undefined> {
    assert(this.isV2029)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2029(keys: Uint8Array[]): Promise<(v2029.Proposal | undefined)[]> {
    assert(this.isV2029)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2029(): Promise<(v2029.Proposal)[]> {
    assert(this.isV2029)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV2030() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === 'd82835c91c052dffa0a14eb20b7a8a134d538d2d60742b962f3fa7823c1657fa'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV2030(key: Uint8Array): Promise<v2030.Proposal | undefined> {
    assert(this.isV2030)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV2030(keys: Uint8Array[]): Promise<(v2030.Proposal | undefined)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV2030(): Promise<(v2030.Proposal)[]> {
    assert(this.isV2030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9010() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '198809793338f28c0a822990194fdeaf2dec25e8848048ce7bb835b676396a37'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9010(key: Uint8Array): Promise<v9010.Proposal | undefined> {
    assert(this.isV9010)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9010(keys: Uint8Array[]): Promise<(v9010.Proposal | undefined)[]> {
    assert(this.isV9010)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9010(): Promise<(v9010.Proposal)[]> {
    assert(this.isV9010)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9030() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '133daac7167756eaebbdcb23c93e2211158671e84e107af848071d3534ed99bd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9030(key: Uint8Array): Promise<v9030.Proposal | undefined> {
    assert(this.isV9030)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9030(keys: Uint8Array[]): Promise<(v9030.Proposal | undefined)[]> {
    assert(this.isV9030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9030(): Promise<(v9030.Proposal)[]> {
    assert(this.isV9030)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9040() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '45640f8fa172b75c33ced53cedf23106c06b9a91427a71e706d9d136aed8d3a6'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9040(key: Uint8Array): Promise<v9040.Proposal | undefined> {
    assert(this.isV9040)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9040(keys: Uint8Array[]): Promise<(v9040.Proposal | undefined)[]> {
    assert(this.isV9040)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9040(): Promise<(v9040.Proposal)[]> {
    assert(this.isV9040)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9050() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '6ffbddf00697f7a651ddd2bd8789384e7dca3980a60aa5a2499d016d43b1ac56'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9050(key: Uint8Array): Promise<v9050.Proposal | undefined> {
    assert(this.isV9050)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9050(keys: Uint8Array[]): Promise<(v9050.Proposal | undefined)[]> {
    assert(this.isV9050)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9050(): Promise<(v9050.Proposal)[]> {
    assert(this.isV9050)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9080() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '5c95cef639e096f92226c0b752c338b2195817a6e7f6d387b5199e8de3e02bab'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9080(key: Uint8Array): Promise<v9080.Proposal | undefined> {
    assert(this.isV9080)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9080(keys: Uint8Array[]): Promise<(v9080.Proposal | undefined)[]> {
    assert(this.isV9080)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9080(): Promise<(v9080.Proposal)[]> {
    assert(this.isV9080)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9090() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '3060f9c0543c77d2a8f13dd41a665b6e953b60cd682f2cd0a4b9e47ca76c255d'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9090(key: Uint8Array): Promise<v9090.Proposal | undefined> {
    assert(this.isV9090)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9090(keys: Uint8Array[]): Promise<(v9090.Proposal | undefined)[]> {
    assert(this.isV9090)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9090(): Promise<(v9090.Proposal)[]> {
    assert(this.isV9090)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9100() {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') === '4da47ef769f8cd0065a1642d93ed9e4664c7b938642677491109a7b2d9dffc5c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9100(key: Uint8Array): Promise<v9100.Proposal | undefined> {
    assert(this.isV9100)
    return this._chain.getStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', key)
  }

  async getManyAsV9100(keys: Uint8Array[]): Promise<(v9100.Proposal | undefined)[]> {
    assert(this.isV9100)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9100(): Promise<(v9100.Proposal)[]> {
    assert(this.isV9100)
    return this._chain.queryStorage(this.blockHash, 'Instance2Collective', 'ProposalOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Instance2Collective', 'ProposalOf') != null
  }
}

export class SessionCurrentIndexStorage {
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
   *  Current index of the session.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Current index of the session.
   */
  async getAsV1020(): Promise<number> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Session', 'CurrentIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'CurrentIndex') != null
  }
}

export class SessionValidatorsStorage {
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
   *  The current set of validators.
   */
  get isV1020() {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current set of validators.
   */
  async getAsV1020(): Promise<Uint8Array[]> {
    assert(this.isV1020)
    return this._chain.getStorage(this.blockHash, 'Session', 'Validators')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Session', 'Validators') != null
  }
}

export class TechnicalCommitteeProposalOfStorage {
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
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9111() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '54e55db1bed5771689c23398470e3d79c164300b3002e905baf8a07324946142'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9111(key: Uint8Array): Promise<v9111.Call | undefined> {
    assert(this.isV9111)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9111(keys: Uint8Array[]): Promise<(v9111.Call | undefined)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9111(): Promise<(v9111.Call)[]> {
    assert(this.isV9111)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9122() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '35e9c06eaf393488c6b16cf365c09693bf1c81cc6d198b6016c29648cb8b11db'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9122(key: Uint8Array): Promise<v9122.Call | undefined> {
    assert(this.isV9122)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9122(keys: Uint8Array[]): Promise<(v9122.Call | undefined)[]> {
    assert(this.isV9122)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9122(): Promise<(v9122.Call)[]> {
    assert(this.isV9122)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9130() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '000fa9eac9f34fd52e1de16af6c8184e689b16aff5b69e5b770310c6592b9a23'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9130(key: Uint8Array): Promise<v9130.Call | undefined> {
    assert(this.isV9130)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9130(keys: Uint8Array[]): Promise<(v9130.Call | undefined)[]> {
    assert(this.isV9130)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9130(): Promise<(v9130.Call)[]> {
    assert(this.isV9130)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9160() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === 'ae191f57edfafa0ed77684f6c6956e661698f7626fcceabc35fc02aa204fc327'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9160(key: Uint8Array): Promise<v9160.Call | undefined> {
    assert(this.isV9160)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9160(keys: Uint8Array[]): Promise<(v9160.Call | undefined)[]> {
    assert(this.isV9160)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9160(): Promise<(v9160.Call)[]> {
    assert(this.isV9160)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9170() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '92131b74d89cee349edae227d67d4039f396e38796421ef6ccad698229d1be87'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9170(key: Uint8Array): Promise<v9170.Call | undefined> {
    assert(this.isV9170)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9170(keys: Uint8Array[]): Promise<(v9170.Call | undefined)[]> {
    assert(this.isV9170)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9170(): Promise<(v9170.Call)[]> {
    assert(this.isV9170)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9180() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '75d269266869aab19a7c849bd16e82439d759218a7ceb76d9d44ca8913eac77b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9180(key: Uint8Array): Promise<v9180.Call | undefined> {
    assert(this.isV9180)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9180(keys: Uint8Array[]): Promise<(v9180.Call | undefined)[]> {
    assert(this.isV9180)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9180(): Promise<(v9180.Call)[]> {
    assert(this.isV9180)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9190() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === 'ad90492cf87d0e7973eb29afcc4224fdcd5cea7edbc9f874a78e09ffb7af764a'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9190(key: Uint8Array): Promise<v9190.Call | undefined> {
    assert(this.isV9190)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9190(keys: Uint8Array[]): Promise<(v9190.Call | undefined)[]> {
    assert(this.isV9190)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9190(): Promise<(v9190.Call)[]> {
    assert(this.isV9190)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9220() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '4364e985a64c3f6addf377d90f061349553d92fcbc29839df8b7cde1ec346b0c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9220(key: Uint8Array): Promise<v9220.Call | undefined> {
    assert(this.isV9220)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9220(keys: Uint8Array[]): Promise<(v9220.Call | undefined)[]> {
    assert(this.isV9220)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9220(): Promise<(v9220.Call)[]> {
    assert(this.isV9220)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9230() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '60a712e8f852a3af336091a63ce735a781e9f17a09e4fb3ea560e93a76c19d2e'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9230(key: Uint8Array): Promise<v9230.Call | undefined> {
    assert(this.isV9230)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9230(keys: Uint8Array[]): Promise<(v9230.Call | undefined)[]> {
    assert(this.isV9230)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9230(): Promise<(v9230.Call)[]> {
    assert(this.isV9230)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9250() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === 'c62c655cbb15038afffc766086c6f698f366a8695bacaa50b3b5b2d97d4b89f5'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9250(key: Uint8Array): Promise<v9250.Call | undefined> {
    assert(this.isV9250)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9250(keys: Uint8Array[]): Promise<(v9250.Call | undefined)[]> {
    assert(this.isV9250)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9250(): Promise<(v9250.Call)[]> {
    assert(this.isV9250)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9271() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === 'b6f7b824ac82eac6e00f10809e508dfaacd22dda3aeafc8c9374020bd69d27ad'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9271(key: Uint8Array): Promise<v9271.Call | undefined> {
    assert(this.isV9271)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9271(keys: Uint8Array[]): Promise<(v9271.Call | undefined)[]> {
    assert(this.isV9271)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9271(): Promise<(v9271.Call)[]> {
    assert(this.isV9271)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9291() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '15ce1541499aecffbe2bf8eeafc64023633a5d282a468972bd6c44aa77b52ce3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9291(key: Uint8Array): Promise<v9291.Call | undefined> {
    assert(this.isV9291)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9291(keys: Uint8Array[]): Promise<(v9291.Call | undefined)[]> {
    assert(this.isV9291)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9291(): Promise<(v9291.Call)[]> {
    assert(this.isV9291)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9300() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === '4489558a261f014c524a3fa533244e852a4234f4db9aba95f960d069aa1a2db7'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9300(key: Uint8Array): Promise<v9300.Call | undefined> {
    assert(this.isV9300)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9300(keys: Uint8Array[]): Promise<(v9300.Call | undefined)[]> {
    assert(this.isV9300)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9300(): Promise<(v9300.Call)[]> {
    assert(this.isV9300)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9320() {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') === 'e264f3acf17bae2089248c1b5be4b79c3766ff552e8565a925e0bceaa16c973b'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9320(key: Uint8Array): Promise<v9320.Call | undefined> {
    assert(this.isV9320)
    return this._chain.getStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', key)
  }

  async getManyAsV9320(keys: Uint8Array[]): Promise<(v9320.Call | undefined)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf', keys.map(k => [k]))
  }

  async getAllAsV9320(): Promise<(v9320.Call)[]> {
    assert(this.isV9320)
    return this._chain.queryStorage(this.blockHash, 'TechnicalCommittee', 'ProposalOf')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TechnicalCommittee', 'ProposalOf') != null
  }
}
