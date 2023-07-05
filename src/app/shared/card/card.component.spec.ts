import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CardModule } from 'primeng/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [CardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = 'Test Title';
    component.title = title;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.p-card-title');
    expect(titleElement.textContent).toContain(title);
  });

  it('should display the subtitle', () => {
    const subtitle = 'Test Subtitle';
    component.subtitle = subtitle;
    fixture.detectChanges();

    const subtitleElement =
      fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subtitleElement.textContent).toContain(subtitle);
  });
});
