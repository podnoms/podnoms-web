import { CamelCaseToSentencePipe } from './camel-case-to-sentence.pipe';

describe('CamelCaseToSentencePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToSentencePipe();
    expect(pipe).toBeTruthy();
  });
});
