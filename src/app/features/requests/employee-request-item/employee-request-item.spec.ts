import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestItem } from './employee-request-item';

describe('EmployeeRequestItem', () => {
  let component: EmployeeRequestItem;
  let fixture: ComponentFixture<EmployeeRequestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRequestItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRequestItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
