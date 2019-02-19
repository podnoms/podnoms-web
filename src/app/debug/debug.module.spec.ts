import { DebugModule } from './debug.module';

describe('DebugModule', () => {
  let debugModule: DebugModule;

  beforeEach(() => {
    debugModule = new DebugModule();
  });

  it('should create an instance', () => {
    expect(debugModule).toBeTruthy();
  });
});
