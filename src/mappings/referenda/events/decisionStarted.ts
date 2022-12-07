import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import {
    OpenGovReferendumStatus,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getDecisionStartedData } from './getters'
import { getReferendumInfoOf } from '../../../storage/referenda'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { updateOpenGovReferendum } from '../../utils/proposals'

function decodeProposal(chain: Chain, data: Uint8Array) {
    // @ts-ignore
    return chain.scaleCodec.decodeBinary(chain.description.call, data)
}

export async function handleDecisionStarted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.DecisionStarted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    let { index, track, hash, ayes, nays, support } = getDecisionStartedData(ctx, item.event)
    // get referenda data
    const storageData = await getReferendumInfoOf(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for referendum at block ${header.height}`)
        return
    }
    if (storageData.status === 'Finished') {
        ctx.log.warn(`OpenGovReferendum with index ${index} has already finished at block ${header.height}`)
        return
    }

    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.DecisionStarted, header, storageData)
}