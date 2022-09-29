import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { ReferendumOriginType, TechCommitteeMotion } from '../../../model'
import { getApprovedData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { NoRecordExistsWarn } from '../../../common/errors'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handleApproved(ctx: BatchContext<Store, unknown>,
    item: EventItem<'TechnicalCommittee.Approved', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const hash = getApprovedData(ctx, item.event)

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