// Web framework: Koa.js
import Koa from 'koa';
import Router from  '@koa/router';

const app = new Koa();
const router = new Router();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
