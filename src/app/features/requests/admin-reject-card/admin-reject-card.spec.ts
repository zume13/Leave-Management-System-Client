import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRejectCard } from './admin-reject-card';

describe('AdminRejectCard', () => {
  let component: AdminRejectCard;
  let fixture: ComponentFixture<AdminRejectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRejectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRejectCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
