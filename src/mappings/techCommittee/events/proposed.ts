/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { TechCommitteeMotion, ReferendumOriginType } from '../../../model'
import { parseProposalCall, ss58codec } from '../../../common/tools'
import { getProposedData } from './getters'
import { storage } from '../../../storage'
import { StorageNotExistsWarn } from '../../../common/errors'

export async function handleProposed(ctx: EventHandlerContext<Store>) {
    const { index, proposer, hash } = getProposedData(ctx)

    const storageData = await storage.techCommittee.getProposalOf(ctx, hash)
    if (!storageData) {
        ctx.log.warn(StorageNotExistsWarn(ReferendumOriginType.TechCommitteeMotion, index))
        return
    }

    const { section, method, args, description } = parseProposalCall(ctx._chain, storageData)

    let hexHash;
    if (args['proposalHash']) {
        hexHash = toHex(args['proposalHash'])
    }

    const techCommitteeMotionId = await getTechCommitteeMotionId(ctx.store)

    const techCommitteeMotion = new TechCommitteeMotion({
        id: techCommitteeMotionId,
        index,
        hash: toHex(hash),
        proposalHash: hexHash,
        proposer: ss58codec.encode(proposer),
        type: ReferendumOriginType.TechCommitteeMotion
    })

    await ctx.store.insert(techCommitteeMotion)
}

async function getTechCommitteeMotionId(store: Store) {
    const count = await store.count(TechCommitteeMotion)

    return `${Buffer.from('techCommitteeMotion').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}