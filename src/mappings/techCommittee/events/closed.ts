import { toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { TechCommitteeMotion } from '../../../model'
import { getClosedData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { MissingTechCommitteeMotionWarn } from '../../utils/errors'

export async function handleClosed(ctx: EventHandlerContext<Store>) {
    const hash = getClosedData(ctx)

    const hexHash = toHex(hash)

    const relationId = await getRelationId(ctx.store)
    const techCommitteeMotion = await ctx.store.get(TechCommitteeMotion, {
        where: {
            hash: hexHash,
        }
    })

    if (!techCommitteeMotion) {
        ctx.log.warn(MissingTechCommitteeMotionWarn(hexHash))
        return
    }

    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlying: techCommitteeMotion.id,
        hash: techCommitteeMotion.hash
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}