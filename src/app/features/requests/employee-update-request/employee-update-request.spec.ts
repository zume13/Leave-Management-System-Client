import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateRequest } from './employee-update-request';

describe('EmployeeUpdateRequest', () => {
  let component: EmployeeUpdateRequest;
  let fixture: ComponentFixture<EmployeeUpdateRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUpdateRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUpdateRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
