const PromiseLock = require('../src')

it('wrong lockId should throw error', async (done) => {
    const lock = new PromiseLock()
    const lockId = await lock.request()
    try {
        lock.release(lockId + 1)
    } catch (e) {
        expect(e.message).toEqual('promised-lock: lockId not matched')
        done()
    }
})

it('multi realese should throw', async (done) => {
    const lock = new PromiseLock()
    const lockId1 = await lock.request()
    await lock.release(lockId1)
    try {
        lock.release(lockId1)
    } catch (e) {
        expect(e.message).toEqual('promised-lock: lockId not matched')
        done()
    }
})