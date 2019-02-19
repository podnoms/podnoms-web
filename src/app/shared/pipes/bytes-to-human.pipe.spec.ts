import { BytesToHumanPipe } from './bytes-to-human.pipe';

describe('BytesToHumanPipe', () => {
    it('create an instance', () => {
        const pipe = new BytesToHumanPipe();
        expect(pipe).toBeTruthy();
    });
});
