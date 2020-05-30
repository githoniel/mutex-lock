const PromiseLock = require('../src')

function sleep(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

it('lock-lock-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.request()
    lock.request().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.release(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    done()
})

it('lock-lock-lock-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.request()
    lock.request().then(mockFn)
    lock.request().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.release(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    done()
})

it('lock-lock-lock-realse-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.request()
    let lockId2
    lock.request().then((id2) => {
        lockId2 = id2
        mockFn()
    })
    lock.request().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.release(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    lock.release(lockId2)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(2))
    done()
}, 2147483647)

it('lock-lock-lock-realse-realse-realse-lock should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.request()
    let lockId2
    lock.request().then((id2) => {
        lockId2 = id2
        mockFn()
    })
    let lockId3
    lock.request().then((id3) => {
        lockId3 = id3
        mockFn()
    })
    lock.request().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.release(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    lock.release(lockId2)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(2))
    lock.release(lockId3)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(3))
    await sleep()
    done()
})
