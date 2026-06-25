import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeave } from './create-leave';

describe('CreateLeave', () => {
  let component: CreateLeave;
  let fixture: ComponentFixture<CreateLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
