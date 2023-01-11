import { Test, TestingModule } from '@nestjs/testing';
import { PrintArrayController } from './print-array.controller';
import { PrintArrayService } from './print-array.service';

describe('PrintArrayController', () => {
  let controller: PrintArrayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintArrayController],
      providers: [PrintArrayService],
    }).compile();

    controller = module.get<PrintArrayController>(PrintArrayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
