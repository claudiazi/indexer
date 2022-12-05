import assert from "assert"
import * as marshal from "./marshal"
import {OpenGovReferendumStatus} from "./_openGovReferendumStatus"

export class OpenGovReferendumStatusHistory {
    private _status!: OpenGovReferendumStatus
    private _block!: number
    private _timestamp!: Date

    constructor(props?: Partial<Omit<OpenGovReferendumStatusHistory, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._status = marshal.enumFromJson(json.status, OpenGovReferendumStatus)
            this._block = marshal.int.fromJSON(json.block)
            this._timestamp = marshal.datetime.fromJSON(json.timestamp)
        }
    }

    get status(): OpenGovReferendumStatus {
        assert(this._status != null, 'uninitialized access')
        return this._status
    }

    set status(value: OpenGovReferendumStatus) {
        this._status = value
    }

    get block(): number {
        assert(this._block != null, 'uninitialized access')
        return this._block
    }

    set block(value: number) {
        this._block = value
    }

    get timestamp(): Date {
        assert(this._timestamp != null, 'uninitialized access')
        return this._timestamp
    }

    set timestamp(value: Date) {
        this._timestamp = value
    }

    toJSON(): object {
        return {
            status: this.status,
            block: this.block,
            timestamp: marshal.datetime.toJSON(this.timestamp),
        }
    }
}
