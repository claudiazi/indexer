import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Instance2CollectiveProposalOfStorage, TechnicalCommitteeProposalOfStorage } from '../../types/storage'
import { Call } from '../../types/v9170'

type TechnicalCommitteeProposalStorageData = Call

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getInstanceStorageData(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<TechnicalCommitteeProposalStorageData | undefined> {
    const storage = new Instance2CollectiveProposalOfStorage(ctx, block)
    if (!storage.isExists) return undefined

    return ctx._chain.getStorage(block.hash, 'Instance2Collective', 'ProposalOf', hash)
}

async function getCoucilStorageData(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<TechnicalCommitteeProposalStorageData | undefined> {
    const storage = new TechnicalCommitteeProposalOfStorage(ctx, block)
    if (!storage.isExists) return undefined

    return ctx._chain.getStorage(block.hash, 'TechnicalCommittee', 'ProposalOf', hash)
}

export async function getProposalOf(
    ctx: BatchContext<Store, unknown>,
    hash: Uint8Array,
    block: SubstrateBlock
): Promise<TechnicalCommitteeProposalStorageData | undefined> {
    return (await getCoucilStorageData(ctx, hash, block)) || (await getInstanceStorageData(ctx, hash, block))
}