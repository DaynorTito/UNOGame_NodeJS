import { ActionValues } from "../actionValues";


describe('ActionValues', () => {
    test('should contains correct actions', () => {
        expect(ActionValues.SAY_UNO).toBe('say uno');
        expect(ActionValues.PLAY_CARD).toBe('played card ');
        expect(ActionValues.DREW_CARD).toBe('drew a card');
    });
});
