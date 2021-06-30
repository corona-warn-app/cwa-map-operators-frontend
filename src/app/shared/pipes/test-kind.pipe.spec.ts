import { TestKindPipe } from './test-kind.pipe';

describe('TestKindPipe', () => {
  it('create an instance', () => {
    const pipe = new TestKindPipe();
    expect(pipe).toBeTruthy();
  });
});
