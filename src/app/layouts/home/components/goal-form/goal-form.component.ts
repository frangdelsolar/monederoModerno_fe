import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl(null, []);

  goalTypeControl: FormControl = new FormControl(null, []);
  goalType = [
    {
      key: 'repetitions',
      name: 'Termina cuando se alcanza un número de repeticiones',
    },
    {
      key: 'calendar',
      name: 'Termina cuando se alcanza una fecha',
    },
    {
      key: 'amount',
      name: 'Termina cuando se alcanza un monto',
    },
    {
      key: 'no-goal',
      name: 'No se termina',
    },
  ];

  showRepetitionsControl: boolean = false;
  repetitionsControl: FormControl = new FormControl(null, []);
  showDateControl: boolean = false;
  dateControl: FormControl = new FormControl(null, []);
  showAmountControl: boolean = false;
  amountControl: FormControl = new FormControl(null, []);

  constructor() {}

  ngOnInit(): void {
    this.goalTypeControl.valueChanges.subscribe((value) => {
      if (value.key == 'repetitions') {
        this.showRepetitionsControl = true;
        this.showDateControl = false;
        this.showAmountControl = false;
      } else if (value.key == 'calendar') {
        this.showRepetitionsControl = false;
        this.showDateControl = true;
        this.showAmountControl = false;
      } else if (value.key == 'amount') {
        this.showRepetitionsControl = false;
        this.showDateControl = false;
        this.showAmountControl = true;
      } else {
        this.showRepetitionsControl = false;
        this.showDateControl = false;
        this.showAmountControl = false;
      }
    });
  }
}
