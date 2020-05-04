export type TimelineEvent =
  | "selected"
  | "timeChanged"
  | "dragStarted"
  | "drag"
  | "dragFinished"
  | "scroll";

export type RenderLaneFunction = (ctx: any, laneBounds: any) => void;
export type RenderKeyframeFunction = (
  ctx: any,
  pos: any,
  bounds: any,
  keyframe: AnimationTimelineKeyframe,
  lane: AnimationTimelineLane
) => void;

export type SubscribeFunction = (args: any | ScrollEventArgs) => void;
export type ScrollEventArgs = {
  args: any;
  scrollLeft: number;
  scrollTop: number;
  scrollHeight: number;
  scrollWidth: number;
};

export type Timeline = {
  redraw(): void;
  rescale(): void;
  getOptions(): AnimationTimelineOptions;
  setOptions(options: AnimationTimelineOptions);
  getLanes(): AnimationTimelineLane[];
  setLanes(data: AnimationTimelineLane[]);
  on(event: TimelineEvent, callback: SubscribeFunction);
  onScroll(callback: SubscribeFunction);
  setScrollLeft(value: number);
  setScrollTop(value: number);
  getScrollLeft(): number;
  getScrollTop(): number;
  setLanes(data: AnimationTimelineLane[]);
  off(event: TimelineEvent, callback: Function);
  getTime(): number;
  setTime(value: number);
  nextFrame();
  prevFrame();
  setPanMode(value: boolean);
};

export type AnimationTimelineLane = {
  shape?: string;
  hidden?: boolean;
  selected?: boolean;
  cursor?: string;
  name?: string;
  color?: string;
  selectedColor?: string;
  /**
   * Keyframes bounds stripe size. When null default config is used.
   */
  keyframesLaneSizePx?: number;
  /**
   * Keyframes bounds stripe color. When null default config is used.
   */
  keyframesLaneColor?: string;
  keyframes?: AnimationTimelineKeyframe[];
  data?: any;
  /**
   * Custom renderer for the lane.
   */
  render?: null | undefined | RenderLaneFunction;
  /**
   * Value indicating whether to draw keyframes or not.
   */
  drawKeyframes?: boolean;
  /**
   * Custom renderer for all keyframes in a lane.
   */
  renderKeyframes?: RenderKeyframeFunction;
};

export type AnimationTimelineKeyframe = {
  selected?: boolean;
  keyframesShape?: string;
  hidden?: boolean;
  cursor?: string;
  val: number;
  draggable?: boolean;
  data?: any;
  /**
   * Custom renderer for the keyframe.
   */
  render?: RenderKeyframeFunction;
};

export type AnimationTimelineOptions = {
  snapsPerSeconds: number;
  snapEnabled: boolean;
  /**
   *  Snap all selected keyframes as bundle during the drag.
   */
  snapAllKeyframesOnMove: boolean;
  timelineThicknessPx: number;
  timelineMarginTopPx: number;
  timelineCapWidthPx: number;
  timelineCapHeightPx: number;
  timelineTriangleCap: boolean;
  timelineRectCap: boolean;
  // approximate step in px for 1 second
  stepPx: number;
  stepSmallPx: number;
  smallSteps: number;
  // additional left margin to start the gauge from
  leftMarginPx: number;
  minTimelineToDispayMs: number;
  headerBackground: string;
  selectedLaneColor: string;
  backgroundColor: string;
  timeIndicatorColor: string;
  labelsColor: string;
  laneLabelsColor: string;
  tickColor: string;
  selectionColor: string;
  // Lanes colors
  laneColor: string;
  alternateLaneColor: string;
  keyframesLaneColor: string;
  // keyframe color. can be overrided by a keyframe 'color' property.
  keyframeColor: string;
  // Shape of the keyframe: none|rhomb|circle|rect
  keyframeShape: string;
  selectedKeyframeColor: string;
  keyframeBorderColor: string;
  useAlternateLaneColor: boolean;
  keyframeBorderThicknessPx: number;
  // can be a number or 'auto'. can be overriden by 'keyframe.size'. Auto is calculated based on the laneHeightPx.
  keyframeSizePx: number | string;
  laneHeightPx: number;
  laneMarginPx: number;
  // Size of the lane in pixels. Can be 'auto' than size is based on the 'laneHeightPx'. can be overriden by lane 'lane.keyframesLaneSizePx'.
  keyframesLaneSizePx: string | number;
  headerHeight: number;
  autoWidth: boolean;
  ticksFont: string;
  zoom: number;
  // Zoom speed. Use percent of the screen to set zoom speed.
  zoomSpeed: number;
  // Max zoom
  zoomMin: number;
  // Min zoom
  zoomMax: number;
  // scroll by drag speed (from 0 to 1)
  scrollByDragSpeed: number;
  id: string;
  // Use from and to range to limit the animation payload:
  useTimelineAnimationRange: boolean;
  /**
   * Whether all keyframes draggable. Can be also configured by a keyframe property draggable
   */
  keyframesDraggable?: boolean;
  /**
   * Whether keyframes lanes draggable.  Can be also configured by a lane property draggable
   */
  keyframesLanesDraggable?: boolean;
};

type AnimationTimeline = {
  initialize(
    options: AnimationTimelineOptions,
    lanes?: AnimationTimelineLane[]
  ): Timeline;
};

declare const timeline: AnimationTimeline;

export default timeline;
