import { TestBed } from '@angular/core/testing';

import { BooksManagerService } from './books-manager.service';

describe('BooksManagerService', () => {
  let service: BooksManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
