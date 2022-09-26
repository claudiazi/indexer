import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { DemocracyProposal, ReferendumOriginType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getProposedData } from './getters'
import { getProposals } from '../../../storage'
import { StorageNotExistsWarn } from '../../../common/errors'

export async function handleProposed(ctx: EventHandlerContext<Store>) {
    const { index } = getProposedData(ctx)

    const storageData = await getProposals(ctx)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for democracy proposals at block ${ctx.block.height}`)
        return
    }

    const proposalData = storageData.find((prop) => prop.index === index)
    if (!proposalData) {
        ctx.log.warn(StorageNotExistsWarn("DemocracyProposal", index))
        return
    }
    const { hash, proposer } = proposalData
    const hexHash = toHex(hash)

    const democracyProposalId = await getDemocracyProposalId(ctx.store)

    const democracyProposal = new DemocracyProposal({
        id: democracyProposalId,
        index,
        hash: toHex(hash),
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