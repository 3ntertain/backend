import { Controller, Get, Res } from '@nestjs/common';
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
}
