import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-frequency-form',
  templateUrl: './frequency-form.component.html',
  styleUrls: ['./frequency-form.component.scss'],
})
export class FrequencyFormComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl(null, []);

  eventTypeControl: FormControl = new FormControl(null, []);
  eventType = [
    {
      key: 'one-off',
      name: 'Transacción única',
    },
    {
      key: 'recurring',
      name: 'Transacción recurrente',
    },
  ];

  showFrequencyControl: boolean = false;

  frequencyControl: FormControl = new FormControl(null, []);
  frequencyItems = [
    {
      value: 'daily',
      name: 'Diario',
    },
    {
      value: 'weekly',
      name: 'Semanal',
    },
    {
      value: 'biweekly',
      name: 'Quincenal',
    },
    {
      value: 'monthly',
      name: 'Mensual',
    },
    {
      value: 'yearly',
      name: 'Anual',
    },
  ];

  showMonthControl: boolean = false;
  monthControl: FormControl = new FormControl(null, []);
  monthItems = [
    {
      value: '1',
      name: 'Enero',
    },
    {
      value: '2',
      name: 'Febrero',
    },
    {
      value: '3',
      name: 'Marzo',
    },
    {
      value: '4',
      name: 'Abril',
    },
    {
      value: '5',
      name: 'Mayo',
    },
    {
      value: '6',
      name: 'Junio',
    },
    {
      value: '7',
      name: 'Julio',
    },
    {
      value: '8',
      name: 'Agosto',
    },
    {
      value: '9',
      name: 'Septiembre',
    },
    {
      value: '10',
      name: 'Octubre',
    },
    {
      value: '11',
      name: 'Noviembre',
    },
    {
      value: '12',
      name: 'Diciembre',
    },
  ];

  showDayControl: boolean = false;
  dayControl: FormControl = new FormControl(null, []);
  dayItems: any[] = [];
  constructor() {
    for (let i = 1; i <= 31; i++) {
      this.dayItems.push({
        value: i.toString(),
        name: i.toString(),
      });
    }
  }

  ngOnInit(): void {
    this.frequencyControl.valueChanges.subscribe((value) => {
      if (value.value === 'monthly') {
        this.showMonthControl = false;
        this.showDayControl = true;
      } else if (value.value === 'yearly') {
        this.showMonthControl = true;
        this.showDayControl = true;
      } else {
        this.showMonthControl = false;
        this.showDayControl = false;
      }
    });

    this.monthControl.valueChanges.subscribe((value) => {
      if (value) {
        this.dayItems = [];
        const month = parseInt(value.value);
        const year = new Date().getFullYear();
        const days = new Date(year, month, 0).getDate();
        for (let i = 1; i <= days; i++) {
          this.dayItems.push({
            value: i.toString(),
            name: i.toString(),
          });
        }
      }
    });

    this.eventTypeControl.valueChanges.subscribe((value) => {
      if (value.key === 'one-off') {
        this.showFrequencyControl = false;
      } else {
        this.showFrequencyControl = true;
      }
    });
  }
}
