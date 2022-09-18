import {EventHandlerContext} from '@subsquid/substrate-processor'
import {Store} from '@subsquid/typeorm-store'
import { ReferendumStatus } from '../../model'
import { BalancesTotalIssuanceStorage } from '../../types/storage'
import { updateReferendum } from '../utils/proposals'
import { getNotPassedData } from './getters'

export async function handleNotPassed(ctx: EventHandlerContext<Store>) {
    const index = getNotPassedData(ctx)
    const storageTotalIssuance = new BalancesTotalIssuanceStorage(ctx)
    const totalIssuance = (await storageTotalIssuance.getAsV1020()).toString()

    await updateReferendum(ctx, index, ReferendumStatus.NotPassed, totalIssuance)
}
