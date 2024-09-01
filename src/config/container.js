import { createContainer, asClass, asValue } from 'awilix';

import {AttendeeRepository} from '../models/repositories/AttendeeRepository.js';
import {GameRepository} from '../models/repositories/GameRepository.js';
import {CardRepository} from '../models/repositories/CardRepository.js';
import {DiscardCardRepository} from '../models/repositories/DiscardCardRepository.js';
import {ScoreRepository} from '../models/repositories/ScoreRepository.js';
import {UserPlayerRepository} from '../models/repositories/UserPlayerRepository.js';
import { LoginHandler } from '../services/authentication/LoginHandler.js';
import {HistoryRepository} from '../models/repositories/HistoryRepository.js';

import Attendee from '../models/attendee.js';
import Game from '../models/game.js';
import Card from '../models/card.js';
import DiscardCard from '../models/discardCard.js';
import Score from '../models/score.js';
import UserPlayer from '../models/userPlayer.js';
import TurnHistory from '../models/turnHistory.js';

const container = createContainer();

container.register({
    attendeeModel: asValue(Attendee),
    gameModel: asValue(Game),
    cardModel: asValue(Card),
    discardModel: asValue(DiscardCard),
    scoreModel: asValue(Score),
    userPlayerModel: asValue(UserPlayer),
    historyModel: asValue(TurnHistory),
    attendeeRepository: asClass(AttendeeRepository).singleton(),
    gameRepository: asClass(GameRepository).singleton(),
    cardRepository: asClass(CardRepository).singleton(),
    discardCardRepository: asClass(DiscardCardRepository).singleton(),
    scoreRepository: asClass(ScoreRepository).singleton(),
    userPlayerRepository: asClass(UserPlayerRepository).singleton(),
    historyRepository: asClass(HistoryRepository).singleton(),
    loginHandler: asClass(LoginHandler).singleton()
});

export default container;
