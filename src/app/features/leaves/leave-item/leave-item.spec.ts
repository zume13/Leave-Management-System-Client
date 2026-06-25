import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveItem } from './leave-item';

describe('LeaveItem', () => {
  let component: LeaveItem;
  let fixture: ComponentFixture<LeaveItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
