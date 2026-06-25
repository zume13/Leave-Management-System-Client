import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveContainer } from './leave-container';

describe('LeaveContainer', () => {
  let component: LeaveContainer;
  let fixture: ComponentFixture<LeaveContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
