import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from '@app/core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { PasswordResetComponent } from './password-reset.component';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'passwordReset',
    ]);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['add']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [PasswordResetComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when form is invalid', () => {
    // Simulate form submission with empty values
    component.onSubmitClick();

    // Expect error message to be shown
    expect(toastService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Algo anda mal',
      detail: 'Parece que falta completar algo.',
    });

    // Expect AuthService.passwordReset not to be called
    expect(authService.passwordReset).not.toHaveBeenCalled();
  });
});
