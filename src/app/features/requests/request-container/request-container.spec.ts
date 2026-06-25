import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContainer } from './request-container';

describe('RequestContainer', () => {
  let component: RequestContainer;
  let fixture: ComponentFixture<RequestContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
