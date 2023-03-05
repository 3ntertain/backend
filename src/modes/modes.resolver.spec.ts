import { Test, TestingModule } from '@nestjs/testing';
import { ModesResolver } from './modes.resolver';
import { ModesService } from './modes.service';

describe('ModesResolver', () => {
  let resolver: ModesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModesResolver, ModesService],
    }).compile();

    resolver = module.get<ModesResolver>(ModesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
