class PromiseLock {
    constructor() {
        this._lockId = 1
        this._currentLockId = null
        this._queueResolve = {} // 当前排队任务
    }

    /**
     * 申请锁，并且在当前锁全部执行完成的情况下，返回锁ID
     */
    async request() {
        let lockResolve
        const lockPromise = new Promise((resolve) => {
            lockResolve = resolve
        })
        const lockId = this._getLockId()
        if (this._currentLockId) {
            this._queueResolve[lockId] = lockResolve
            await lockPromise
        } else {
            this._currentLockId = lockId
        }
        return lockId
    }

    /**
     * 释放指定ID的锁
     * @param {Number} id 锁ID
     */
    release(id) {
        if (id !== undefined && id !== this._currentLockId) {
            throw new Error('promised-lock: lockId not matched')
        }
        const lockArray = Object.keys(this._queueResolve)
        if (lockArray.length > 0) {
            const lockId = lockArray[0]
            this._currentLockId = Number(lockId)
            this._queueResolve[lockId]()
            delete this._queueResolve[lockId]
        } else {
            this._currentLockId = null
        }
    }
    /**
     * 获取新的lockId
     */
    _getLockId() {
        const lockId = this._lockId
        this._lockId += 1
        return lockId
    }
}

module.exports = PromiseLock