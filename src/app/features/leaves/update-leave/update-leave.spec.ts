import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeave } from './update-leave';

describe('UpdateLeave', () => {
  let component: UpdateLeave;
  let fixture: ComponentFixture<UpdateLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
