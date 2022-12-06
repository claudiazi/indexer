import { Store } from '@subsquid/typeorm-store'
import { ReferendumSubmission, ReferendumOriginType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getSubmittedData } from './getters'
import { storage } from '../../../storage'
import { StorageNotExistsWarn } from '../../../common/errors'
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { getReferendumInfoOf } from '../../../storage/referenda'

export async function handleSubmitted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Submitted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, track, hash, len } = getSubmittedData(ctx, item.event)
    // get referenda data
    const storageData = await getReferendumInfoOf(ctx, index, header)
    // const storageData = await storage.democracy.getProposals(ctx, header)
    // if (!storageData) {
    //     ctx.log.warn(`Storage doesn't exist for democracy proposals at block ${header.height}`)
    //     return
    // }

    // const proposalData = storageData.find((prop) => prop.index === index)
    // if (!proposalData) {
    //     ctx.log.warn(StorageNotExistsWarn(ReferendumOriginType.DemocracyProposal, index))
    //     return
    // }
    // const { hash, proposer } = proposalData

    const referendumSubmissionId = await ctx.store.count(ReferendumSubmission)

    const democracyProposal = new ReferendumSubmission({
        id: referendumSubmissionId.toString().padStart(8, '0'),
        index,
        hash: toHex(hash),
        track: track, //maybe put track name?
        // proposer: ss58codec.encode(proposer)
    })

    await ctx.store.insert(democracyProposal)
}