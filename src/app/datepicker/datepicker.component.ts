import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _dateStruct: NgbDateStruct;
  get dateStruct(): NgbDateStruct {
    return this._dateStruct;
  }
  set dateStruct(value: NgbDateStruct) {
    this._dateStruct = value;
    this.dateChange.emit(this.date);
  }

  @Input()
  set date(date: string) {
    if (date) {
      this._dateStruct = {
        year: +date.split('-')[0],
        month: +date.split('-')[1],
        day: +date.split('-')[2]
      };
    } else {
      setTimeout(() => {
        const today = new Date();
        this.dateStruct = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
      }, 0);
    }
  }
  get date(): string {
    return `${this._dateStruct.year}`
      + `-${this._dateStruct.month < 10 ? '0' : ''}${this._dateStruct.month}`
      + `-${this._dateStruct.day < 10 ? '0' : ''}${this._dateStruct.day}`;
  }
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
