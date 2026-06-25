import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationListContainer } from './allocation-list-container';

describe('AllocationListContainer', () => {
  let component: AllocationListContainer;
  let fixture: ComponentFixture<AllocationListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationListContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
