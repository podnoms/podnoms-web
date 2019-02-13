import { HumaniseTimePipe } from './humanise-time.pipe';

describe('HumaniseTimePipe', () => {
    it('create an instance', () => {
        const pipe = new HumaniseTimePipe();
        expect(pipe).toBeTruthy();
    });
});
