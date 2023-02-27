import { Test, TestingModule } from '@nestjs/testing';
import { HappeningsResolver } from './happenings.resolver';
import { HappeningsService } from './happenings.service';

describe('HappeningsResolver', () => {
  let resolver: HappeningsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HappeningsResolver, HappeningsService],
    }).compile();

    resolver = module.get<HappeningsResolver>(HappeningsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
