export default class PromiseLock {
  request(): Promise<number>;
  release(id: string): void
}
