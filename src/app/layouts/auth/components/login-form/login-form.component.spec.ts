import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { MessageService } from 'primeng/api';
import { AuthService } from '@core/services/auth.service';

const mockMsgSvc = {
  add: jasmine.createSpy('add'),
};

const mockAuthSvc = {
  auth: jasmine.createSpy('auth'),
  login: jasmine.createSpy('login'),
};

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let formBuilder: FormBuilder;
  let messageService: MessageService;
  let authSvc: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        FormBuilder,
        { provide: MessageService, useValue: mockMsgSvc },
        { provide: AuthService, useValue: mockAuthSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty email and password controls', () => {
    expect(component.form.get('email')?.value).toEqual('');
    expect(component.form.get('password')?.value).toEqual('');
  });

  it('should mark the email control as invalid if it is empty', () => {
    const emailControl = component.form.get('email');

    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should mark the email control as invalid if it contains an invalid email address', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid_email');

    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('should mark the password control as invalid if it is empty', () => {
    const passwordControl = component.form.get('password');

    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('should call the onLogin method when the login button is clicked', () => {
    spyOn(component, 'onLogin');
    const loginButton = fixture.nativeElement.querySelector('button');
    loginButton.click();

    expect(component.onLogin).toHaveBeenCalled();
  });
});
