import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationItem } from './allocation-item';

describe('AllocationItem', () => {
  let component: AllocationItem;
  let fixture: ComponentFixture<AllocationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
