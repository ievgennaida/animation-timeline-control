interface Event {
    topic: string;
    callback: Function;
}
export declare class TimelineEventsEmitter {
    protected _subscriptions: Array<Event>;
    on(topic: string, callback: Function): void;
    /**
     * Remove an event from the subscriptions list.
     */
    off(topic: string, callback: Function): void;
    /**
     * Unsubscribe all
     */
    offAll(): void;
    emit(topic: string, args: any): void;
}
export {};
