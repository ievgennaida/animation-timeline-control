interface TimelineEvent {
    topic: string;
    callback: (args: any) => void;
}
/**
 * Timeline events emitter.
 */
export declare class TimelineEventsEmitter {
    /**
     * Active events subscriptions.
     */
    _subscriptions: TimelineEvent[];
    /**
     * Subscribe event.
     * @param topic event name.
     * @param callback callback to be added.
     */
    on<T>(topic: string, callback: (args: T) => void): boolean;
    /**
     * Remove an event from the subscriptions list.
     */
    off<T>(topic: string, callback: (args: T) => void): boolean;
    /**
     * Unsubscribe all
     */
    offAll(): void;
    /**
     * Emit event.
     * @param topic Event name.
     * @param args Event arguments.
     */
    emit<T>(topic: string, args: T): void;
}
export {};
