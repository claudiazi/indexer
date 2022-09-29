import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CouncilProposalOfStorage, Instance1CollectiveProposalOfStorage } from '../../types/storage'
import { Call } from '../../types/v9170'

type CouncilProposalStorageData = Call

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getInstanceStorageData(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<CouncilProposalStorageData | undefined> {
    const storage = new Instance1CollectiveProposalOfStorage(ctx, block)
    if (!storage.isExists) return undefined

    return ctx._chain.getStorage(block.hash, 'Instance1Collective', 'ProposalOf', hash)
}

async function getCoucilStorageData(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<CouncilProposalStorageData | undefined> {
    const storage = new CouncilProposalOfStorage(ctx, block)
    if (!storage.isExists) return undefined

    return ctx._chain.getStorage(block.hash, 'Council', 'ProposalOf', hash)
}

export async function getProposalOf(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<CouncilProposalStorageData | undefined> {
    return (await getCoucilStorageData(ctx, hash, block)) || (await getInstanceStorageData(ctx, hash, block))
}