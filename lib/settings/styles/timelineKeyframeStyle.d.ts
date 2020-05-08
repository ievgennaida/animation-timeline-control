import { TimelineKeyframeShape } from '../../enums/timelineKeyframeShape';
export interface TimelineKeyframeStyle {
    cursor?: string;
    shape?: TimelineKeyframeShape;
    draggable?: boolean;
    hidden?: boolean;
}
