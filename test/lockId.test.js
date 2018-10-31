const PromiseLock = require('../src')

it('wrong lockId should throw error', async () => {
    const lock = new PromiseLock()
    const lockId = await lock.requestLock()
    return lock.realseLock(lockId + 1).catch((e) => {
        expect(e.message).toEqual('promised-lock: lockId not matched')
    })
})

it('multi realese should throw', async (done) => {
    const lock = new PromiseLock()
    const lockId1 = await lock.requestLock()
    await lock.realseLock(lockId1)
    await lock.realseLock(lockId1).catch((e) => {
        expect(e.message).toEqual('promised-lock: lockId not matched')
        done()
    })
})