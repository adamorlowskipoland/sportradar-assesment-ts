import { describe, it, expect } from 'vitest'
import { Counter } from '../counter'

describe('counter', () => {
  describe('increment function', () => {
    it('should increment after clicking the button', () => {
      const counter = new Counter(0)
      counter.increment()
      expect(counter.getCount()).toBe(1)
    })
  })
})
