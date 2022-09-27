import { toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { CouncilMotion, ReferendumOriginType } from '../../../model'
import { getApprovedData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { NoRecordExistsWarn } from '../../../common/errors'

export async function handleApproved(ctx: EventHandlerContext<Store>) {
    const hash = getApprovedData(ctx)

    const hexHash = toHex(hash)

    const relationId = await getRelationId(ctx.store)
    const councilMotion = await ctx.store.get(CouncilMotion, {
        where: {
            hash: hexHash,
        }
    })

    if (!councilMotion) {
        ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.CouncilMotion, hexHash))
        return
    }

    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlyingId: councilMotion.id,
        underlyingIndex: councilMotion.index,
        proposer: councilMotion.proposer,
        proposalHash: councilMotion.proposalHash,
        underlyingType: ReferendumOriginType.CouncilMotion
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}