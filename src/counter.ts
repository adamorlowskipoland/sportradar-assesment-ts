export class Counter {
  private count: number = 0;

  constructor(initialCount: number = 0) {
    this.count = initialCount;
  }

  increment(): void {
    this.count += 1;
  }

  getCount(): number {
    return this.count;
  }
}

// export function setupCounter(element: HTMLButtonElement) {
//   let counter = new Counter(0);
//   element.addEventListener('click', () => counter.increment());
//   element.innerHTML = `count is ${counter.getCount()}`;
// }
