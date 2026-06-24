import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emailverification } from './emailverification';

describe('Emailverification', () => {
  let component: Emailverification;
  let fixture: ComponentFixture<Emailverification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emailverification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emailverification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
