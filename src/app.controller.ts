import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from '@prisma/client';


@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-all')
  async getTasks(): Promise<(Task[])> {
    return await this.appService.getAllTasks();
  }

  @Post('add')
  async addTask(@Body() body: { contents: string }): Promise<(Task | void)> {
    return await this.appService.addTask(body.contents);
  }

  @Post('delete')
  async deleteTask(@Body() body: { uuid: string }): Promise<(Task | void)> {
    return await this.appService.deleteTask(body.uuid);
  }
}
