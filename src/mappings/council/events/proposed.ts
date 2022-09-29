/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CouncilMotion, ReferendumOriginType } from '../../../model'
import { parseProposalCall, ss58codec } from '../../../common/tools'
import { getProposedData } from './getters'
import { storage } from '../../../storage'
import { StorageNotExistsWarn } from '../../../common/errors'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handleProposed(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Council.Proposed', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, proposer, hash } = getProposedData(ctx, item.event)

    const storageData = await storage.council.getProposalOf(ctx, hash, header)
    if (!storageData) {
        ctx.log.warn(StorageNotExistsWarn(ReferendumOriginType.CouncilMotion, index))
        return
    }

    const { section, method, args, description } = parseProposalCall(ctx._chain, storageData)

    let hexHash;
    if (args['proposalHash']) {
        hexHash = toHex(args['proposalHash'])
    }

    const councilMotionId = await getCouncilMotionId(ctx.store)

    const councilMotion = new CouncilMotion({
        id: councilMotionId,
        index,
        hash: toHex(hash),
        proposalHash: hexHash,
        proposer: ss58codec.encode(proposer),
        type: ReferendumOriginType.CouncilMotion
    })

    await ctx.store.insert(councilMotion)
}

async function getCouncilMotionId(store: Store) {
    const count = await store.count(CouncilMotion)

    return `${Buffer.from('councilMotion').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}