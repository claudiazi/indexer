import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { PreimageStatus } from '../../../model'
import { updatePreimage } from '../../utils/proposals'
import { getPreimageReapedData } from './getters'

export async function handlePreimageReaped(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Democracy.PreimageReaped', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { hash } = getPreimageReapedData(ctx, item.event)

    const hexHash = toHex(hash)

    await updatePreimage(ctx, toHex(hash), PreimageStatus.Reaped, header)
}
