import { Delegation } from "../../../model/generated/delegation.model";

export function TooManyOpenDelegations(block: number, wallet?: string) {
    return `Each wallet can only have one delegation at a time. 2 or more delegations are active for wallet ${wallet} at block ${block}`
}

export function NoDelegationFound(block: number, wallet?: string) {
    return `No active delegation found for wallet ${wallet} at block ${block}`
}