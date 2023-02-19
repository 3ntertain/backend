import { Controller, Get, Post, Res, Body, OnModuleInit } from '@nestjs/common';
import { ApiService } from './api.service';
import { Response } from 'express';

@Controller('api')
export class ApiController {
  onModuleInit() {
    // Call your controller method here
    // this.testgetPlayer();
  }

  constructor(private readonly apiService: ApiService) {}

  @Get()
  getLune(@Res() res: Response) {
    const data = { message: 'Hello, LUNE!' };
    res.status(200).json(data);
  }

  @Get('hello')
  getData(@Res() res: Response) {
    const data = { message: 'Hello, NONO!' };
    res.status(200).json(data);
  }

  @Post('createevent')
  createEvent(@Body() data: Request) {
    return this.apiService.createEvent(data);
  }

  @Post('getevent')
  getEvent(@Body() data: any) {
    if (!data.address) return;

    return this.apiService.getEvent(data.address);
  }

  async testgetEvent() {
    return await this.apiService.getEvent(
      'F1k1scg229TH9Y8f2MMCgGo7bfD4g3a7QrKotntPvaNa',
    );
  }

  // @Get('createevent')
  // createEvent(@Body() data: Request) {
  //   return this.apiService.createEvent(data);
  // }
}
