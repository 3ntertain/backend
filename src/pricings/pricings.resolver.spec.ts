import { Test, TestingModule } from '@nestjs/testing';
import { PricingsResolver } from './pricings.resolver';
import { PricingsService } from './pricings.service';

describe('PricingsResolver', () => {
  let resolver: PricingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingsResolver, PricingsService],
    }).compile();

    resolver = module.get<PricingsResolver>(PricingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
