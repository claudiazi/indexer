import assert from "assert"
import * as marshal from "./marshal"

export class StandardVoteBalance {
    public readonly isTypeOf = 'StandardVoteBalance'
    private _value!: bigint

    constructor(props?: Partial<Omit<StandardVoteBalance, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._value = marshal.bigint.fromJSON(json.value)
        }
    }

    get value(): bigint {
        assert(this._value != null, 'uninitialized access')
        return this._value
    }

    set value(value: bigint) {
        this._value = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            value: marshal.bigint.toJSON(this.value),
        }
    }
}
