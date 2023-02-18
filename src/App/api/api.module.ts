import { Module } from '@nestjs/common';
import { SolanaWeb3 } from 'src/Utilities/SolanaWeb3';
import { ThirdWeb } from 'src/Utilities/ThirdWeb';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, SolanaWeb3, ThirdWeb],
})
export class ApiModule {}
