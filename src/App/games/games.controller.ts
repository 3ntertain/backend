import { Controller, Get, Post, Res, Body, OnModuleInit } from '@nestjs/common';
import { GamesService } from './games.service';
import { Response } from 'express';

@Controller('games')
export class GamesController {
  onModuleInit() {
    this.test();
  }

  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getHello(@Res() res: Response) {
    const data = this.gamesService.getList();
    res.status(200).json(data);
  }

  @Get('list')
  getData(@Res() res: Response) {
    const data = { message: 'Hello, world!' };
    res.status(200).json(data);
  }

  test() {
    const data = this.gamesService.getList();

    const toto = JSON.stringify(data);
  }
}
