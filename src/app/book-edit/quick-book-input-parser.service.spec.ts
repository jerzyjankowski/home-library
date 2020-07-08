import { TestBed } from '@angular/core/testing';

import { QuickBookInputParserService } from './quick-book-input-parser.service';

describe('QuickBookInputParserService', () => {
  let service: QuickBookInputParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickBookInputParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
