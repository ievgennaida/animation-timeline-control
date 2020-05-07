interface Event {
  topic: string;
  callback: Function;
}

export class TimelineEventsEmitter {
  private subscriptions: Array<Event> = [];

  // on event.
  on(topic: string, callback: Function): void {
    if (!callback) {
      return;
    }

    this.subscriptions.push({
      topic: topic,
      callback: callback,
    });
  }
  /**
   * Remove an event from the subscriptions list.
   */
  off(topic: string, callback: Function): void {
    this.subscriptions = this.subscriptions.filter((event) => {
      return event && event.callback != callback && event.topic != topic;
    });
  }

  /**
   * Unsubscribe all
   */
  offAll(): void {
    this.subscriptions.length = 0;
  }

  // emit event.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(topic: string, args: any): void {
    this.subscriptions.forEach((event) => {
      if (event && event.topic == topic && event.callback) {
        event.callback(args);
      }
    });
  }
}
