import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLeave } from './remove-leave';

describe('RemoveLeave', () => {
  let component: RemoveLeave;
  let fixture: ComponentFixture<RemoveLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
