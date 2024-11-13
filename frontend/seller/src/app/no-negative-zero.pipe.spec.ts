import { NoNegativeZeroPipe } from './no-negative-zero.pipe';

describe('NoNegativeZeroPipe', () => {
  it('create an instance', () => {
    const pipe = new NoNegativeZeroPipe();
    expect(pipe).toBeTruthy();
  });
});
