import Router from  '@koa/router';

export const router = new Router();

const users = []

router.get('/', async ctx => {
  ctx.body = users;;
});

router.post('/users', async ctx => {
  const user = {
    userName: ctx.request.body.userName
  }

  users.push(user);

  ctx.body = user;
})