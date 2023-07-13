import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageService } from '@app/core/controllers/image.controller';
import { Image } from '@app/core/models/image.interface';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
})
export class InputImageComponent implements OnInit {
  placeholder = {
    description: 'placeholder',
    image_url: 'assets/placeholder-main.png',
  };

  @Input() editModeOn: boolean = false;
  @Input() item: Image;
  @Input() control: FormControl = new FormControl(this.placeholder, []);

  processing: boolean = false;

  constructor(private imageSvc: ImageService) {}

  ngOnInit(): void {
    if (!('image_url' in this.control.value)) {
      this.control.setValue(this.placeholder);
    }

    if (this.item) {
      this.control.setValue(this.item);
    }
  }

  uploadHandler(event: any) {
    this.processing = true;
    let formData = new FormData();
    formData.append('file', event.files[0]);
    formData.append('name', event.files[0].name);
    formData.append('description', event.files[0].name);

    this.imageSvc.uploadImage(formData).subscribe((res) => {
      this.control.setValue(res);
      this.processing = false;
    });
  }
}
