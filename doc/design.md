# CallLock

Promise化 互斥锁通用类

## 流程

申请锁定 ---> 检查当前是否锁定 ---> 等待锁定释放 ---> 走无锁流程
                    |
                    |
                     ---> 锁定当前锁 ---> 完成任务 ---> 释放锁

## 属性

- _lockId = 1 // lock编号起始
- _currentLockId = null // 当前阻塞序列号
- _queueResolve = {} // 当前排队任务


## Code

request() --> LockPromise = new Promise --> Object.keys(_queueResolve).length > 1 ---> await LockPromise ---> return id
                LockResolve = resolve                       |
                _queueResolve[id] = lockInfo                |
                                                            --> return id

releaseLock(id) -->  _queueResolve[id].resolve() -->  _queueResolve[min(id)].resolve()
