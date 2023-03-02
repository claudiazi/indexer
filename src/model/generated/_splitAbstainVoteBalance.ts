import assert from "assert"
import * as marshal from "./marshal"

export class SplitAbstainVoteBalance {
    public readonly isTypeOf = 'SplitAbstainVoteBalance'
    private _aye!: bigint
    private _nay!: bigint
    private _abstain!: bigint

    constructor(props?: Partial<Omit<SplitAbstainVoteBalance, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._aye = marshal.bigint.fromJSON(json.aye)
            this._nay = marshal.bigint.fromJSON(json.nay)
            this._abstain = marshal.bigint.fromJSON(json.abstain)
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

    get abstain(): bigint {
        assert(this._abstain != null, 'uninitialized access')
        return this._abstain
    }

    set abstain(value: bigint) {
        this._abstain = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            aye: marshal.bigint.toJSON(this.aye),
            nay: marshal.bigint.toJSON(this.nay),
            abstain: marshal.bigint.toJSON(this.abstain),
        }
    }
}
