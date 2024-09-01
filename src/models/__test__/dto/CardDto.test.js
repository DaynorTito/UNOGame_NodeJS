import { CardDto } from '../../dto/CardDto.js';


describe('CardDto', () => {
    let dbUser;
  
    beforeEach(() => {
      dbUser = {
        color: 'red',
        value: 'A',
        point: 10,
      };
    });
  
    test('should create an instance with given dbUser', () => {
      const cardDto = new CardDto(dbUser);
      expect(cardDto.dbUser).toBe(dbUser);
    });
  
    test('should return the correct card object from getCard', () => {
      const cardDto = new CardDto(dbUser);
      const expectedCard = {
        color: 'red',
        value: 'A',
        point: 10,
      };
  
      expect(cardDto.getCard()).toEqual(expectedCard);
    });
  
    test('should return a card object with correct properties', () => {
      const cardDto = new CardDto({
        color: 'blue',
        value: 'K',
        point: 5,
      });
  
      const card = cardDto.getCard();
      expect(card.color).toBe('blue');
      expect(card.value).toBe('K');
      expect(card.point).toBe(5);
    });
  });