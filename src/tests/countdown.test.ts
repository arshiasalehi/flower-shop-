import { describe, expect, it, vi } from 'vitest';
import { getCountdown } from '@/lib/countdown';

describe('countdown utility', () => {
  it('computes time until cutoff', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-10T10:00:00-05:00'));
    const countdown = getCountdown(14);
    expect(countdown.hours).toBeGreaterThan(3);
    expect(countdown.expired).toBe(false);
    vi.useRealTimers();
  });
});
