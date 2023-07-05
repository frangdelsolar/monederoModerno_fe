import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EditActionsComponent } from './edit-actions.component';
import { AuthService } from '@app/core/services/auth.service';

const mockAuthService = {
  isAuthenticatedObservable: of(true),
};

describe('EditActionsComponent', () => {
  let component: EditActionsComponent;
  let fixture: ComponentFixture<EditActionsComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditActionsComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditActionsComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editModeOn as true when onEditClick is called', () => {
    spyOn(component.editModeOnChange, 'emit');

    component.onEditClick();

    expect(component.editModeOn).toBe(true);
    expect(component.editModeOnChange.emit).toHaveBeenCalledWith(true);
  });
});
