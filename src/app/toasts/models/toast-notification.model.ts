import { ToastNotificationType } from '../types/toast-notification-type.enum';

export class ToastNotification {
  public id: number;
  public type: ToastNotificationType;
  public message: string;

  static builder(): ToastNotificationBuilder {
    return new ToastNotificationBuilder();
  }
}

export class ToastNotificationBuilder {
  toastNotification: ToastNotification;

  constructor() {
    this.toastNotification = new ToastNotification();
  }

  withId(id: number): ToastNotificationBuilder {
    this.toastNotification.id = id;
    return this;
  }
  withType(type: ToastNotificationType): ToastNotificationBuilder {
    this.toastNotification.type = type;
    return this;
  }
  withMessage(message: string): ToastNotificationBuilder {
    this.toastNotification.message = message;
    return this;
  }

  build(): ToastNotification {
    if (!this.toastNotification.type) {
      this.toastNotification.type = ToastNotificationType.OTHER;
    }
    return this.toastNotification;
  }
}
