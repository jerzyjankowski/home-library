import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reading-register-modal',
  templateUrl: './reading-register-modal.component.html',
  styleUrls: ['./reading-register-modal.component.scss']
})
export class ReadingRegisterModalComponent implements OnInit {
  date: NgbDateStruct;
  note = '';

  get dateString(): string {
    return `${this.date.year}-${this.date.month < 10 ? '0' : ''}${this.date.month}-${this.date.day < 10 ? '0' : ''}${this.date.day}`;
  }

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.date = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  registerReading(): void {
    this.activeModal.close({date: this.dateString, note: this.note});
  }
}
