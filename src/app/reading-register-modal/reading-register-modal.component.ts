import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reading-register-modal',
  templateUrl: './reading-register-modal.component.html',
  styleUrls: ['./reading-register-modal.component.scss']
})
export class ReadingRegisterModalComponent implements OnInit {
  date = '';
  time = null;
  note = '';

  get dateString(): string {
    // return `${this.date.year}-${this.date.month < 10 ? '0' : ''}${this.date.month}-${this.date.day < 10 ? '0' : ''}${this.date.day}`;
    return this.date;
  }

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  registerReading(): void {
    this.activeModal.close({date: this.dateString, time: this.time, note: this.note});
  }
}
