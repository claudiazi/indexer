/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { TechCommitteeMotion, ReferendumOriginType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getProposedData } from './getters'

export async function handleProposed(ctx: EventHandlerContext<Store>) {
    const { index, proposer, hash } = getProposedData(ctx)

    const techCommitteeMotionId = await getTechCommitteeMotionId(ctx.store)

    const techCommitteeMotion = new TechCommitteeMotion({
        id: techCommitteeMotionId,
        index,
        hash: toHex(hash),
        proposer: ss58codec.encode(proposer),
        type: ReferendumOriginType.TechCommetteeMotion
    })

    await ctx.store.insert(techCommitteeMotion)
}

async function getTechCommitteeMotionId(store: Store) {
    const count = await store.count(TechCommitteeMotion)

    return `${Buffer.from('techCommitteeMotion').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}