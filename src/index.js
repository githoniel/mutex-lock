class PromiseLock {
    constructor() {
        this._lockId = 0
        this._lockCache = {}
        this._lockIdArray = []
    }

    /**
     * 申请锁，并且在当前锁全部执行完成的情况下，返回锁ID
     */
    async requestLock() {
        let lockResolve
        const lockPromise = new Promise((resolve) => {
            lockResolve = resolve
        })
        const id = this._getLockId(lockPromise)
    }

    /**
     * 释放指定ID的锁
     * @param {Number} id 锁ID
     */
    async realseLock(id) {

    }

    _waitForLock() {
        // 等待this._lockPromise 全部完成
    }

    /**
     * 获得一个可用的锁编号
     * @param {Promise} P 对应的Promise实例
     */
    _getLockId(P) {
        const currentID = this._lockId
        this._lockId += 1
        this._lockPromise[currentID] = P
        return currentID
    }

}

module.exports = PromiseLock