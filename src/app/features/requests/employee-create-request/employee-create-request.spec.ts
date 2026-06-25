import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateRequest } from './employee-create-request';

describe('EmployeeCreateRequest', () => {
  let component: EmployeeCreateRequest;
  let fixture: ComponentFixture<EmployeeCreateRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCreateRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCreateRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
