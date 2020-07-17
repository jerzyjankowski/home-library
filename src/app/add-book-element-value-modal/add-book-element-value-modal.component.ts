import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-book-element-value-modal',
  templateUrl: './add-book-element-value-modal.component.html',
  styleUrls: ['./add-book-element-value-modal.component.scss']
})
export class AddBookElementValueModalComponent implements OnInit {
  @Input() title = '';
  @Input() checkAvailability: ((value: string) => {available: boolean, message: string | null});

  // tslint:disable-next-line:variable-name
  _value: string | null = null;
  get value(): string {
    return this._value;
  }
  set value(newValue: string) {
    this.availableValue = false;
    const result = this.checkAvailability(newValue);
    if (result.available) {
      this.availableValue = true;
    }
    this._value = newValue;
    this.unavailableMessage = result.message;
  }

  availableValue = false;
  unavailableMessage = null;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  useValue(value): void {
    if (this.checkAvailability(value)) {
      this.activeModal.close(value);
    }
  }

}
