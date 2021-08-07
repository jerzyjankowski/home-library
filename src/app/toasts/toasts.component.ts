import {Component, OnInit} from '@angular/core';
import {ToastsService} from './services/toasts.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(
    public toastsService: ToastsService
  ) { }

  ngOnInit(): void {
  }
}
