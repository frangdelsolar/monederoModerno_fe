import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDropdownComponent } from './service-provider-dropdown.component';

describe('ServiceProviderDropdownComponent', () => {
  let component: ServiceProviderDropdownComponent;
  let fixture: ComponentFixture<ServiceProviderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
