import { HistoryDto } from "../../dto/HistoryDto.js"

describe('HistoryDto', () => {
  let dbUser;

  beforeEach(() => {
    // Set up a default dbUser object before each test
    dbUser = {
      player: 'John Doe',
      action: 'Scored'
    };
  });

  test('should create an instance with given dbUser', () => {
    const historyDto = new HistoryDto(dbUser);
    expect(historyDto.dbUser).toBe(dbUser);
  });

  test('should return the correct history object from getHistory', () => {
    const historyDto = new HistoryDto(dbUser);
    const expectedHistory = {
      player: 'John Doe',
      action: 'Scored'
    };

    expect(historyDto.getHistory()).toEqual(expectedHistory);
  });

  test('should return a history object with correct properties', () => {
    const historyDto = new HistoryDto({
      player: 'Jane Smith',
      action: 'Assisted'
    });

    const history = historyDto.getHistory();
    expect(history.player).toBe('Jane Smith');
    expect(history.action).toBe('Assisted');
  });
});