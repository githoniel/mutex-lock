const PromiseLock = require('../src')

it('single call should run well', async (done) => {
    const lock = new PromiseLock()
    const lockId = await lock.request()
    await lock.release(lockId)
    done()
})

it('call in seq should run well', async (done) => {
    const lock = new PromiseLock()
    for (let i = 0; i < 10; i++) {
        const lockId = await lock.request()
        await lock.release(lockId)
        await lock.request()
        await lock.release()
    }
    done()
})

it('conflict lock should block', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    await lock.request()
    lock.request().then(mockFn)
    setTimeout(() => {
        expect(mockFn.mock.calls.length).toBe(0)
        done()
    }, 1000)
})

it('multi conflict lock should block', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    await lock.request()
    lock.request().then(mockFn)
    lock.request().then(mockFn)
    lock.request().then(mockFn)
    setTimeout(() => {
        expect(mockFn.mock.calls.length).toBe(0)
        done()
    }, 500)
})