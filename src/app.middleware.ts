import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Task } from '@prisma/client';

import { instance as prisma } from './prisma'


@Injectable()
export class ValidateContents implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body?.contents) {
      if (typeof(req.body.contents) === 'string') {
        next();
      } else {
        return res.sendStatus(400);
      }
    } else {
      return res.sendStatus(400);
    }
  }
}

@Injectable()
export class ValidateUuid implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body?.uuid) {
      prisma.task.findUnique({
        where: {
          uuid: req.body.uuid
        }
      })
      .then((task: Task) => {
        if (!task) {
          return res.sendStatus(400);
        } else {
          next();
        }
      })
      .catch((err: any) => {
        return res.sendStatus(400);
      })
    } else {
      return res.sendStatus(400);
    }
  }
}

@Injectable()
export class ValidateIsComplete implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body?.isComplete) {
      if (typeof(req.body.contents) === 'boolean') {
        next();
      } else {
        return res.sendStatus(400);
      }
    } else {
      return res.sendStatus(400);
    }
  }
}