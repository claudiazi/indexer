import { Store } from '@subsquid/typeorm-store'
import { DemocracyProposal, ReferendumOriginType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getProposedData } from './getters'
import { storage } from '../../../storage'
import { StorageNotExistsWarn } from '../../../common/errors'
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handleProposed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.Proposed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index } = getProposedData(ctx, item.event)

    const storageData = await storage.democracy.getProposals(ctx, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for democracy proposals at block ${header.height}`)
        return
    }

    const proposalData = storageData.find((prop) => prop.index === index)
    if (!proposalData) {
        ctx.log.warn(StorageNotExistsWarn(ReferendumOriginType.DemocracyProposal, index))
        return
    }
    const { hash, proposer } = proposalData

    const democracyProposalId = await getDemocracyProposalId(ctx.store)

    const democracyProposal = new DemocracyProposal({
        id: democracyProposalId,
        index,
        hash: toHex(hash),
        proposalHash: toHex(hash),
        proposer: ss58codec.encode(proposer),
        type: ReferendumOriginType.DemocracyProposal
    })

    await ctx.store.insert(democracyProposal)
}

async function getDemocracyProposalId(store: Store) {
    const count = await store.count(DemocracyProposal)

    return `${Buffer.from('democracyProposal').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}