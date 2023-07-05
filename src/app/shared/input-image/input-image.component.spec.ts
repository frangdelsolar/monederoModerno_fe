import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputImageComponent } from './input-image.component';
import { By } from '@angular/platform-browser';
import { ImageService } from '@app/core/controllers/image.controller';

const mockImageSvc = {
  uploadImage: () => {
    return {
      subscribe: () => {},
    };
  },
};

describe('InputImageComponent', () => {
  let component: InputImageComponent;
  let fixture: ComponentFixture<InputImageComponent>;
  let imageSvc: ImageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputImageComponent],
      providers: [{ provide: ImageService, useValue: mockImageSvc }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageComponent);
    component = fixture.componentInstance;
    imageSvc = TestBed.inject(ImageService);
    component.item = {
      name: 'test',
      description: 'Test Image',
      image_url: 'http://example.com/image.jpg',
      thumbnail_url: 'http://example.com/thumb.jpg',
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image with correct attributes', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.image')
    ).nativeElement;
    expect(image.alt).toBe('Test Image');
    expect(image.src).toBe('http://example.com/image.jpg');
  });

  it('should show the overlay and handle file upload when edit mode is on', () => {
    component.editModeOn = true;
    fixture.detectChanges();

    const overlay: HTMLDivElement = fixture.debugElement.query(
      By.css('.overlay')
    ).nativeElement;
    const fileUploadComponent = fixture.debugElement.query(
      By.css('p-fileUpload')
    );

    expect(overlay).toBeTruthy();
    expect(fileUploadComponent).toBeTruthy();
  });
});
