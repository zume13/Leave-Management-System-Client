import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListContainer } from './employee-list-container';

describe('EmployeeListContainer', () => {
  let component: EmployeeListContainer;
  let fixture: ComponentFixture<EmployeeListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
