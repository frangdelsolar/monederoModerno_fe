import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PasswordNewComponent } from './password-new.component';
import { AuthService } from '@core/services/auth.service';
import { PasswordModule } from 'primeng/password';

describe('PasswordNewComponent', () => {
  let component: PasswordNewComponent;
  let fixture: ComponentFixture<PasswordNewComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'passwordReset',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, PasswordModule],
      declarations: [PasswordNewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: of({ get: () => 'test_token' }) },
        },
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(PasswordNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the token on component initialization', () => {
    expect(component.token).toBe('test_token');
  });

  it('should show error message when form is invalid', () => {
    // Simulate form submission with empty values
    component.onSubmitClick();

    // Expect error message to be shown
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Algo anda mal',
      detail: 'Parece que falta completar algo.',
    });

    // Expect AuthService.passwordReset not to be called
    expect(authService.passwordReset).not.toHaveBeenCalled();
  });

  it('should show error message when password is weak', () => {
    // Set up form values
    component.email.setValue('test@example.com');
    component.password.setValue('password');
    component.password_confirmation.setValue('password');

    // Simulate form submission
    component.onSubmitClick();

    // Expect error message to be shown
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Algo anda mal',
      detail: 'La contraseña es muy débil.',
    });

    // Expect AuthService.passwordReset not to be called
    expect(authService.passwordReset).not.toHaveBeenCalled();
  });

  it('should call passwordReset method on valid form submission', () => {
    // Set up form values
    component.email.setValue('test@example.com');
    component.password.setValue('Password1');
    component.password_confirmation.setValue('Password1');

    // Simulate form submission
    component.onSubmitClick();

    // Expect AuthService.passwordReset to be called with the correct data
    expect(authService.passwordReset).toHaveBeenCalledWith({
      token: 'test_token',
      password: 'Password1',
    });

    // Expect info message to be shown
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Operación en curso',
      detail: 'Hemos recibido tu petición',
    });
  });
});
