import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { DemocracyProposal, ReferendumOriginType } from '../../../model'
import { getTabledEventData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { NoRecordExistsWarn } from '../../../common/errors'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

export async function handleTabled(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.Tabled', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index } = getTabledEventData(ctx, item.event)

    const relationId = await getRelationId(ctx.store)
    //save a relation
    const democracyProposal = await ctx.store.get(DemocracyProposal, {
        where: {
            index,
        }
    })

    if (!democracyProposal) {
        ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.DemocracyProposal, index))
        return
    }
    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlyingId: democracyProposal.id,
        underlyingIndex: democracyProposal.index,
        proposer: democracyProposal.proposer,
        proposalHash: democracyProposal.proposalHash,
        underlyingType: ReferendumOriginType.DemocracyProposal
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}