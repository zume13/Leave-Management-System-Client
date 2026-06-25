import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestItem } from './admin-request-item';

describe('AdminRequestItem', () => {
  let component: AdminRequestItem;
  let fixture: ComponentFixture<AdminRequestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRequestItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
