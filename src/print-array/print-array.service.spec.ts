import { Test, TestingModule } from '@nestjs/testing';
import { PrintArrayService } from './print-array.service';

describe('PrintArrayService', () => {
  let service: PrintArrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintArrayService],
    }).compile();

    service = module.get<PrintArrayService>(PrintArrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
