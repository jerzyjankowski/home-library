import { Injectable } from '@angular/core';
import {ToastNotification} from '../models/toast-notification.model';
import {ToastNotificationType} from '../types/toast-notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toastNotifications: ToastNotification[] = [];
  lastToastNotificationId = 0;

  constructor() {
    // this.toastNotifications.push(this.buildToastNotification('test1', ToastNotificationType.GOOD));
    // this.toastNotifications.push(this.buildToastNotification('Lorem Ipsum', ToastNotificationType.BAD));
    // this.toastNotifications.push(this.buildToastNotification('Lorem Ipsum Dores Dolores', ToastNotificationType.OTHER));
  }

  buildToastNotification(message: string, type: ToastNotificationType): ToastNotification {
    return ToastNotification.builder()
      .withId(this.lastToastNotificationId++)
      .withMessage(message)
      .withType(type)
      .build();
  }

  removeToastNotification(id: number): void {
    this.toastNotifications = this.toastNotifications.filter(notification => notification.id !== id);
  }

  showGoodNotification(message: string): void {
    this.toastNotifications.push(this.buildToastNotification(message, ToastNotificationType.GOOD));
  }

  showBadNotification(message: string): void {
    this.toastNotifications.push(this.buildToastNotification(message, ToastNotificationType.BAD));
  }
}
