import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { encodeId } from '../../../common/tools'
import { CouncilMembersStorage } from '../../../types/storage'

export let currentCouncilMembers: string[]

export async function handleNewTerm(ctx: BatchContext<Store, unknown>,
    item: EventItem<'PhragmenElection.NewTerm', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    await setCouncilMembers(ctx, header)
}

export async function setCouncilMembers(ctx: BatchContext<Store, unknown>, header: SubstrateBlock): Promise<string[]> {
    currentCouncilMembers = new CouncilMembersStorage(ctx, header).isExists ? (await new CouncilMembersStorage(ctx, header).asV9111.get()).map(member => encodeId(member)) : []
    return currentCouncilMembers
}