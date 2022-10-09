// Web framework: Koa.js
import Koa from 'koa';
import { router } from './router.js';

export const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
