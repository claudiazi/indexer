import { CommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import {
    Preimage,
    PreimageStatus,
    PreimageStatusHistory,
    Referendum,
    ReferendumStatus,
    ReferendumStatusHistory,
} from '../../model'
import { MissingPreimageWarn, MissingReferendumWarn } from './errors'

export async function updateReferendum(ctx: CommonHandlerContext<Store>, index: number, status: ReferendumStatus, totalIssuance?: string) {
    const referendum = await ctx.store.get(Referendum, {
        where: {
            index,
        },
        order: {
            id: 'DESC',
        },
    })

    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }

    referendum.updatedAt = new Date(ctx.block.timestamp)
    referendum.updatedAtBlock = ctx.block.height
    referendum.status = status
    if (totalIssuance) {
        referendum.totalIssuance = totalIssuance
    }

    switch (status) {
        case ReferendumStatus.Executed:
        case ReferendumStatus.NotPassed:
        case ReferendumStatus.Cancelled:
            referendum.endedAt = referendum.updatedAt
            referendum.endedAtBlock = referendum.updatedAtBlock
            if (totalIssuance) {
                referendum.totalIssuance = totalIssuance
            }
            ctx.log.info(`Referendum ${index} ended at ${referendum.endedAtBlock} (${referendum.endedAt})`)
    }

    referendum.statusHistory.push(
        new ReferendumStatusHistory({
            block: referendum.updatedAtBlock,
            timestamp: referendum.updatedAt,
            status: referendum.status,
        })
    )

    await ctx.store.save(referendum)
}

export async function updatePreimage(ctx: CommonHandlerContext<Store>, hash: string, status: PreimageStatus) {
    const preimage = await ctx.store.get(Preimage, {
        where: {
            hash,
        },
        order: {
            id: 'DESC',
        },
    })

    if (!preimage) {
        ctx.log.warn(MissingPreimageWarn(hash))
        return
    }

    preimage.updatedAt = new Date(ctx.block.timestamp)
    preimage.updatedAtBlock = ctx.block.height
    preimage.status = status

    preimage.statusHistory.push(
        new PreimageStatusHistory({
            block: preimage.updatedAtBlock,
            timestamp: preimage.updatedAt,
            status: preimage.status,
        })
    )

    await ctx.store.save(preimage)
}
