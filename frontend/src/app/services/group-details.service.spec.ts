import { TestBed } from '@angular/core/testing';

import { GroupDetailsService } from './group-details.service';

describe('GroupDetailsService', () => {
  let service: GroupDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
