import Router from  '@koa/router';
import { createUser } from './app/users/index.js';
import { createGuess } from './app/guesses/index.js';
import { listGames } from './app/games/index.js';

export const router = new Router();

router.post('/users', createUser)

// router.get('/guesses', lis)
router.post('/guesses', createGuess)

router.get('/games', listGames);
 