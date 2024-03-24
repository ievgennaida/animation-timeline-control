import { TimelineElement } from '../timelineElement';
import { TimelinePoint } from '../timelinePoint';
import { TimelineBaseEvent } from './timelineBaseEvent';
export declare class TimelineClickEvent extends TimelineBaseEvent {
    args: MouseEvent | TouchEvent | null;
    /**
     * Clicked screen position.
     */
    get pos(): DOMPoint | null;
    get val(): number;
    /**
     * All elements located under current mouse activity.
     */
    elements: TimelineElement[];
    /**
     * Element that selected as target under the click.
     */
    target: TimelineElement | null;
    /**
     * Timeline current active drag position.
     */
    point: TimelinePoint | null;
}
