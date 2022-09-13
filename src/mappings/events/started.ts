import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import {
    Preimage,
    Referendum,
    ReferendumStatus,
    ReferendumStatusHistory,
    ReferendumThreshold,
    ReferendumThresholdType,
} from '../../model'
import { Store } from '@subsquid/typeorm-store'
import { getStartedData } from './getters'
import { getReferendumInfoOf } from '../../storage'

export async function handleStarted(ctx: EventHandlerContext<Store>) {
    const { index, threshold } = getStartedData(ctx)

    const storageData = await getReferendumInfoOf(ctx, index)
    if (!storageData) return

    if (storageData.status === 'Finished') {
        ctx.log.warn(`Referendum with index ${index} has already finished at block ${ctx.block.height}`)
        return
    }

    const { hash } = storageData
    const id = await getReferendumId(ctx.store)

    const preimage = await ctx.store.get(Preimage, { where: { hash: toHex(hash) } })

    const referendum = new Referendum({
        id,
        index,
        hash: toHex(hash),
        threshold: new ReferendumThreshold({
            type: threshold as ReferendumThresholdType,
        }),
        status: ReferendumStatus.Started,
        statusHistory: [],
        createdAtBlock: ctx.block.height,
        createdAt: new Date(ctx.block.timestamp),
        preimage,
    })

    referendum.statusHistory.push(
        new ReferendumStatusHistory({
            block: referendum.createdAtBlock,
            timestamp: referendum.createdAt,
            status: referendum.status,
        })
    )

    await ctx.store.insert(referendum)
}

async function getReferendumId(store: Store) {
    const count = await store.count(Referendum)

    return `${Buffer.from('referendum').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}
