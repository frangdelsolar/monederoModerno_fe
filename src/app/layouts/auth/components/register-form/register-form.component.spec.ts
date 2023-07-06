import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterFormComponent } from './register-form.component';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

const mockMsgSvc = {
  add: () => {},
};

const mockAuthSvc = {
  auth: () => {},
  login: () => {},
};

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authSvc: AuthService;
  let toastSvc: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [RegisterFormComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthSvc },
        { provide: ToastService, useValue: mockMsgSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    authSvc = TestBed.inject(AuthService);
    toastSvc = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    const form = component.form;
    const firstName = form.controls['first_name'];
    const lastName = form.controls['last_name'];
    const email = form.controls['email'];
    const password = form.controls['password'];

    firstName.setValue('John');
    lastName.setValue('Doe');
    email.setValue('john.doe@example.com');
    password.setValue('password123');

    expect(form.valid).toBeTruthy();
  });
});
