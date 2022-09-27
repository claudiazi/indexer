import { toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { ReferendumOriginType, TechCommitteeMotion } from '../../../model'
import { getApprovedData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { NoRecordExistsWarn } from '../../../common/errors'

export async function handleApproved(ctx: EventHandlerContext<Store>) {
    const hash = getApprovedData(ctx)

    const hexHash = toHex(hash)

    const relationId = await getRelationId(ctx.store)
    const techCommitteeMotion = await ctx.store.get(TechCommitteeMotion, {
        where: {
            hash: hexHash,
        }
    })

    if (!techCommitteeMotion) {
        ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.TechCommitteeMotion, hexHash))
        return
    }

    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlyingId: techCommitteeMotion.id,
        underlyingIndex: techCommitteeMotion.index,
        proposer: techCommitteeMotion.proposer,
        proposalHash: techCommitteeMotion.proposalHash,
        underlyingType: ReferendumOriginType.TechCommitteeMotion
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}