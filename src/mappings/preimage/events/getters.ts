import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import {
    PreimageNotedEvent,
} from '../../../types/events'
import { Event } from '../../../types/support'

interface PreimageNotedData {
    hash: Uint8Array
}

export function getPreimageNotedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): PreimageNotedData {
    const event = new PreimageNotedEvent(ctx, itemEvent)
    if (event.isV9160) {
        const {hash} = event.asV9160
        return {
            hash
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}