import {Component, Input, OnInit} from '@angular/core';
import {ToastNotification} from '../../models/toast-notification.model';
import {ToastsService} from '../../services/toasts.service';
import {ToastNotificationType} from '../../types/toast-notification-type.enum';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {
  Type = ToastNotificationType;

  @Input() notification: ToastNotification;

  constructor(
    public toastsService: ToastsService
  ) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.toastsService.removeToastNotification(this.notification.id);
  }
}
