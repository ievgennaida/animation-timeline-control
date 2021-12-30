interface Event {
    topic: string;
    callback: (args: any) => void;
}
export declare class TimelineEventsEmitter {
    protected _subscriptions: Array<Event>;
    on(topic: string, callback: (args: any) => void): void;
    /**
     * Remove an event from the subscriptions list.
     */
    off(topic: string, callback: (args: any) => void): void;
    /**
     * Unsubscribe all
     */
    offAll(): void;
    emit(topic: string, args: any): void;
}
export {};
