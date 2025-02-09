import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

import { instance as prisma } from './prisma'


@Injectable()
export class AppService {

  async getAllTasks(): Promise<(Task[])> {
    return new Promise<(Task[])>(async (resolve, reject) => {
      await prisma.task.findMany({
        orderBy: [
          {
            date: 'asc',
          },
        ]
      })
      .then((tasks: Task[]) => {
        resolve(tasks); 
      })
      .catch((err: any) => {
        resolve([]);
      })
    })
  }

  async addTask(contents: string): Promise<(Task | void)> {
    return new Promise<(Task | void)>(async (resolve, reject) => {
      await prisma.task.create({
        data: {
          uuid: Buffer.from(crypto.randomUUID(), 'hex').toString('base64url'),
          contents: contents
        }
      })
      .then((task: Task) => {
        resolve(task); 
      })
      .catch((err: any) => {
        reject();
      })
    })
  }

  async updateTask(uuid: string, isComplete: boolean): Promise<(Task | void)> {
    return new Promise<(Task | void)>(async (resolve, reject) => {
      await prisma.task.update({
        where: {
          uuid: uuid
        },
        data: {
          isComplete: !isComplete
        }
      })
      .then((task: Task) => {
        resolve(task); 
      })
      .catch((err: any) => {
        reject();
      })
    })
  }

  async deleteTask(uuid: string): Promise<(Task | void)> {
    return new Promise<(Task | void)>(async (resolve, reject) => {
      await prisma.task.delete({
        where: {
          uuid: uuid
        }
      })
      .then((task: Task) => {
        resolve(task); 
      })
      .catch((err: any) => {
        reject();
      })
    })
  }
}
