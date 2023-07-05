import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.scss'],
})
export class InputEditorComponent implements OnInit {
  Editor = ClassicEditor;
  @Input() control: FormControl = new FormControl('', []);

  @Input() label: string;
  constructor() {}

  ngOnInit(): void {}
}
