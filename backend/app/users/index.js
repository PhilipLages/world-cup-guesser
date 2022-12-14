import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (ctx) => {
  const password = await bcrypt.hash(ctx.request.body.password, 10);

  const data = {
    name: ctx.request.body.name,
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    password,
  };

  try {
    const { password, ...user }= await prisma.user.create({ data });
    ctx.body = user;

    ctx.status = 201;
  }  catch(error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

export const login = async (ctx) => {
  const [type, token] = ctx.headers.authorization.split(" ");
  const [email, textPassword] = atob(token).split(":");

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if(!user) {
    ctx.status = 404;
    return;
  }

  const passwordMatch = await bcrypt.compare(textPassword, user.password);

  if(!passwordMatch) {
    ctx.status = 404;
    return;
  }

  const { password, ...result } = user;

  const accessToken = jwt.sign({
    sub: user.id,
    name: user.name,
    expiresIn: "7d",
  }, process.env.JWT_SECRET)

  ctx.body = {
    user: result,
    accessToken,
  };
}

export const listGuesses = async ctx => {
  const userName = ctx.request.params.userName;

  const user = await prisma.user.findUnique({
    where: { userName }
  });

  if (!user) {
    ctx.status = 404;
    return;
  }

  const guesses = await prisma.guess.findMany({
    where: {
      userId: user.id
    }
  });

  ctx.body = {
    name: user.name,
    guesses,
  };
}
