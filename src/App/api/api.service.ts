import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getHello(): string {
    return 'Hello World from Lausanne from API not main!';
  }
}
