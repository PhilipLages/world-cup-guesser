import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createGuess = async ctx => {
  
  if(!ctx.request.body.homeTeamScore && !ctx.request.body.awayTeamScore) {
    ctx.status = 400;
    return;
  }

  const { gameId } = ctx.request.body;
  const homeTeamScore = parseInt(ctx.request.body.homeTeamScore);
  const awayTeamScore = parseInt(ctx.request.body.awayTeamScore);
  
  try {
    const [ guess ]= await prisma.guess.findMany({
      where: { userId, gameId },
    });

    ctx.body = guess
    ? await  prisma.guess.update({
      where: {
        id: guess.id
      },
      data: {
        homeTeamScore,
        awayTeamScore,
      }
    })
    : await  prisma.guess.create({
      data: {
        userId,
        gameId,
        homeTeamScore,
        awayTeamScore,
      }
    })

  } catch(error) {
    ctx.body = error;
    ctx.status = 500;
  }


  // if(exists) {
  //   // update
  // } else {
  //   // create
  // }
  
}
