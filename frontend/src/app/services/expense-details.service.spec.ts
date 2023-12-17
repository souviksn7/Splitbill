import { TestBed } from '@angular/core/testing';

import { ExpenseDetailsService } from './expense-details.service';

describe('ExpenseDetailsService', () => {
  let service: ExpenseDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
