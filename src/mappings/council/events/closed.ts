import { toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { CouncilMotion } from '../../../model'
import { getClosedData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { MissingCouncilMotionWarn, MissingTechCommitteeMotionWarn } from '../../utils/errors'

export async function handleClosed(ctx: EventHandlerContext<Store>) {
    const hash = getClosedData(ctx)

    const hexHash = toHex(hash)

    const relationId = await getRelationId(ctx.store)
    const councilMotion = await ctx.store.get(CouncilMotion, {
        where: {
            hash: hexHash,
        }
    })

    if (!councilMotion) {
        ctx.log.warn(MissingCouncilMotionWarn(hexHash))
        return
    }

    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlying: councilMotion.id,
        hash: councilMotion.hash
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}