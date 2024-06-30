/* eslint-disable  @typescript-eslint/no-explicit-any */
interface TimelineEvent {
  topic: string;
  callback: (args: any) => void;
}

/**
 * Timeline events emitter.
 */
export class TimelineEventsEmitter {
  /**
   * Active events subscriptions.
   */
  _subscriptions: TimelineEvent[] = [];

  /**
   * Subscribe event.
   * @param topic event name.
   * @param callback callback to be added.
   */
  on<T>(topic: string, callback: (args: T) => void): boolean {
    if (!callback) {
      return false;
    }

    this._subscriptions.push({
      topic: topic,
      callback: callback,
    } as TimelineEvent);
    return true;
  }
  /**
   * Remove an event from the subscriptions list.
   */
  off<T>(topic: string, callback: (args: T) => void): boolean {
    const before = this._subscriptions.length;
    this._subscriptions = this._subscriptions.filter((event) => {
      return event && event.callback != callback && event.topic != topic;
    });
    return before !== this._subscriptions.length;
  }

  /**
   * Unsubscribe all
   */
  offAll(): void {
    // Remove all callbacks from array.
    this._subscriptions.length = 0;
  }

  /**
   * Emit event.
   * @param topic Event name.
   * @param args Event arguments.
   */
  emit<T>(topic: string, args: T): void {
    this._subscriptions.forEach((event) => {
      if (event?.topic === topic && event?.callback) {
        event.callback(args);
      }
    });
  }
}
