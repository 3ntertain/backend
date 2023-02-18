import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { Response } from 'express';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  getData(@Res() res: Response) {
    const data = { message: 'Hello, world!' };
    res.status(200).json(data);
  }

  @Post('createevent')
  getAlr(@Body() data: Request) {
    return this.apiService.createEvent(data);
  }

  // @Get('createevent')
  // createEvent(@Body() data: Request) {
  //   return this.apiService.createEvent(data);
  // }
}
