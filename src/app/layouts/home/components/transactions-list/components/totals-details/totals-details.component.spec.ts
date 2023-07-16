import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsDetailsComponent } from './totals-details.component';

describe('TotalsDetailsComponent', () => {
  let component: TotalsDetailsComponent;
  let fixture: ComponentFixture<TotalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
