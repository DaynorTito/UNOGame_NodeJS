import { createCardService,
    getCardsService,
    getCardByIdService,
    updateCardService,
    deleteCardService
} from "../cardService.js";
import Card from '../../models/card.js';


jest.mock("../../models/card.js");

afterEach(() => {
    jest.clearAllMocks();
});

test('should create a new card', async () => {
    const cardData = { name: 'Test Card', description: 'Test Description' };
    const mockCard = { id: 1, ...cardData };
    Card.create.mockResolvedValue(mockCard);

    const result = await createCardService(cardData);

    expect(Card.create).toHaveBeenCalledWith(cardData);
    expect(result).toEqual(mockCard);
});


test('should return all cards', async () => {
    const mockCards = [
      { id: 1, name: 'Card 1' },
      { id: 2, name: 'Card 2' }
    ];
    Card.findAll.mockResolvedValue(mockCards);

    const result = await getCardsService();

    expect(Card.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockCards);
});

test('should return a card by id', async () => {
    const mockCard = { id: 1, name: 'Test Card' };
    Card.findByPk.mockResolvedValue(mockCard);

    const result = await getCardByIdService(1);

    expect(Card.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCard);
});

test('should update a card', async () => {
    const mockCard = { 
      id: 1, 
      name: 'Old Name', 
      update: jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        return this;
      })
    };
    Card.findByPk.mockResolvedValue(mockCard);

    const updateData = { name: 'New Name' };
    const result = await updateCardService(1, updateData);
    expect(mockCard.update).toHaveBeenCalledWith(updateData);
    expect({id: result.id, name: result.name}).toEqual({ id: 1, name: 'New Name'});
});

test('should throw error if card not found', async () => {
    Card.findByPk.mockResolvedValue(null);
    await expect(updateCardService(999, { name: 'New Name' }))
      .rejects.toThrow('Card not found');
});

test('should delete a card', async () => {
    const mockCard = { 
      id: 1, 
      destroy: jest.fn().mockResolvedValue(true)
    };
    Card.findByPk.mockResolvedValue(mockCard);
    const result = await deleteCardService(1);
    expect(Card.findByPk).toHaveBeenCalledWith(1);
    expect(mockCard.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('should throw error if card not found', async () => {
    Card.findByPk.mockResolvedValue(null);
    await expect(deleteCardService(999))
      .rejects.toThrow('Card not found');
});