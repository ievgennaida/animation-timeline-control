interface Event {
  topic: string;
  callback: Function;
}

export class TimelineEventsEmitter {
  protected _subscriptions: Array<Event> = [];

  // on event.
  on(topic: string, callback: Function): void {
    if (!callback) {
      return;
    }

    this._subscriptions.push({
      topic: topic,
      callback: callback,
    });
  }
  /**
   * Remove an event from the subscriptions list.
   */
  off(topic: string, callback: Function): void {
    this._subscriptions = this._subscriptions.filter((event) => {
      return event && event.callback != callback && event.topic != topic;
    });
  }

  /**
   * Unsubscribe all
   */
  offAll(): void {
    this._subscriptions.length = 0;
  }

  // emit event.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(topic: string, args: any): void {
    this._subscriptions.forEach((event) => {
      if (event && event.topic == topic && event.callback) {
        event.callback(args);
      }
    });
  }
}
