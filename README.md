# mutex lock

Promise化互斥锁， 申请锁后，只有锁释放才能使得下次申请锁能够Resolve

Promise mutex lock, after `request`, other `request` will block until lock is released.

## Install

```
npm i mutex-lock --save
```

## API

- request：Promise

申请锁，在锁全部执行完成的情况下，返回锁id

request, if succeed, return lock id


- release：Promise(id?: Number)

释放指定id的锁

release lockid, let running `request` to resolve, id is optional

## Example

```js
const MutexLock = require('mutex-lock')

const lock = new MutexLock()

const id = await lock.request()
lock.release(id)

const id2 = await lock.request()
await lock.request() // should block until lock.release(id2)

await lock.request()
lock.release() // id is optional
```
