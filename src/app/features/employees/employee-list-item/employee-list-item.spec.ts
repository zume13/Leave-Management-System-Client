import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListItem } from './employee-list-item';

describe('EmployeeListItem', () => {
  let component: EmployeeListItem;
  let fixture: ComponentFixture<EmployeeListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
