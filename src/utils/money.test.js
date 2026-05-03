import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
  it('formats 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99');
  });

  it('displays 2 decimals', () => {
    expect(formatMoney(1920)).toBe('$19.20');
    expect(formatMoney(1230)).toBe('$12.30');
  });
});

