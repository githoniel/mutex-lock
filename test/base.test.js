const PromiseLock = require('../src')

it('single call should run well', async (done) => {
    const lock = new PromiseLock()
    const lockId = await lock.requestLock()
    await lock.realseLock(lockId)
    done()
})

it('call in seq should run well', async (done) => {
    const lock = new PromiseLock()
    for (let i = 0; i < 10; i++) {
        const lockId = await lock.requestLock()
        await lock.realseLock(lockId)
        const lockId2 = await lock.requestLock()
        await lock.realseLock(lockId2)
    }
    done()
})

it('conflict lock should block', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    await lock.requestLock()
    lock.requestLock().then(mockFn)
    setTimeout(() => {
        expect(mockFn.mock.calls.length).toBe(0)
        done()
    }, 1000)
})

it('multi conflict lock should block', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    await lock.requestLock()
    lock.requestLock().then(mockFn)
    lock.requestLock().then(mockFn)
    lock.requestLock().then(mockFn)
    setTimeout(() => {
        expect(mockFn.mock.calls.length).toBe(0)
        done()
    }, 500)
})