import assert from "assert"
import * as marshal from "./marshal"

export class SplitVoteBalance {
    public readonly isTypeOf = 'SplitVoteBalance'
    private _aye!: bigint
    private _nay!: bigint

    constructor(props?: Partial<Omit<SplitVoteBalance, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._aye = marshal.bigint.fromJSON(json.aye)
            this._nay = marshal.bigint.fromJSON(json.nay)
        }
    }

    get aye(): bigint {
        assert(this._aye != null, 'uninitialized access')
        return this._aye
    }

    set aye(value: bigint) {
        this._aye = value
    }

    get nay(): bigint {
        assert(this._nay != null, 'uninitialized access')
        return this._nay
    }

    set nay(value: bigint) {
        this._nay = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            aye: marshal.bigint.toJSON(this.aye),
            nay: marshal.bigint.toJSON(this.nay),
        }
    }
}
