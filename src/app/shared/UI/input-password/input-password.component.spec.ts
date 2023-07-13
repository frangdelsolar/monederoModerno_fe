import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputPasswordComponent } from './input-password.component';
import { InputTextModule } from 'primeng/inputtext';

describe('InputPasswordComponent', () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPasswordComponent],
      imports: [ReactiveFormsModule, InputTextModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.label).toBe('Password');
    expect(component.control instanceof FormControl).toBe(true);
  });

  it('should render the password input field', () => {
    const passwordInput = fixture.nativeElement.querySelector('#password1');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(passwordInput.getAttribute('class')).toContain('p-password');
  });

  it('should display the label correctly', () => {
    const labelElement = fixture.nativeElement.querySelector(
      'label[for="float-password"]'
    );
    expect(labelElement.textContent).toBe(component.label);
  });

  it('should not display server error message when there are no errors', () => {
    component.control.setErrors(null);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#input-help');
    expect(errorElement).toBeFalsy();
  });

  it('should display the server error message when there are server errors', () => {
    component.control.setErrors({ serverError: 'Invalid password' });
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#input-help');
    expect(errorElement.textContent).toBe('Invalid password');
  });
});
