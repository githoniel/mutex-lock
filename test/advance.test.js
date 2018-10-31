const PromiseLock = require('../src')

function sleep(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

it('lock-lock-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.requestLock()
    lock.requestLock().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.realseLock(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    done()
})

it('lock-lock-lock-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.requestLock()
    lock.requestLock().then(mockFn)
    lock.requestLock().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.realseLock(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    done()
})

it('lock-lock-lock-realse-realse should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.requestLock()
    let lockId2
    lock.requestLock().then((id2) => {
        lockId2 = id2
        mockFn()
    })
    lock.requestLock().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.realseLock(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    lock.realseLock(lockId2)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(2))
    done()
}, 2147483647)

it('lock-lock-lock-realse-realse-realse-lock should work', async (done) => {
    const lock = new PromiseLock()
    const mockFn = jest.fn(() => {})
    const lockId1 = await lock.requestLock()
    let lockId2
    lock.requestLock().then((id2) => {
        lockId2 = id2
        mockFn()
    })
    let lockId3
    lock.requestLock().then((id3) => {
        lockId3 = id3
        mockFn()
    })
    lock.requestLock().then(mockFn)
    // start match
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(0))
    lock.realseLock(lockId1)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(1))
    lock.realseLock(lockId2)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(2))
    lock.realseLock(lockId3)
    await sleep()
    expect(expect(mockFn.mock.calls.length).toBe(3))
    await sleep()
    done()
})
