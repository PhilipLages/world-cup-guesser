import Router from  '@koa/router';

export const router = new Router();

router.get('/', async ctx => {
  ctx.body = { test: "Home" };
});

router.get('/users', async ctx => {
  ctx.body = { test: "Users" };
});