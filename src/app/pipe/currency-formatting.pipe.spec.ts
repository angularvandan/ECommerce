import { CurrencyFormattingPipe } from './currency-formatting.pipe';

describe('CurrencyFormattingPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFormattingPipe();
    expect(pipe).toBeTruthy();
  });
});
