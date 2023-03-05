import { Test, TestingModule } from '@nestjs/testing';
import { HappeningsService } from './happenings.service';

describe('HappeningsService', () => {
  let service: HappeningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HappeningsService],
    }).compile();

    service = module.get<HappeningsService>(HappeningsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
