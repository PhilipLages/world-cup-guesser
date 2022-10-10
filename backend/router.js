import Router from  '@koa/router';
import { createUser, listGuesses, login } from './app/users/index.js';
import { createGuess } from './app/guesses/index.js';
import { listGames } from './app/games/index.js';

export const router = new Router();

router.get('/login', login)
router.post('/users', createUser)

router.post('/guesses', createGuess)

router.get('/games', listGames);

router.get('/:userName', listGuesses)