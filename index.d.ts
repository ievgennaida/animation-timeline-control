export type TimelineEvent =
  | "selected"
  | "timeChanged"
  | "keyframeChanged"
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
  name?: string;
  color: string;
  selectedColor: string;
  keyframes?: AnimationTimelineKeyframe[];
  data?: any;
  /**
   * Custom renderer for the lane.
   */
  render: null | undefined | RenderLaneFunction;
  /**
   * Value indicating whether to draw keyframes or not.
   */
  drawKeyframes: boolean;
  /**
   * Custom renderer for all keyframes in a lane.
   */
  renderKeyframes: null | undefined | RenderKeyframeFunction;
};

export type AnimationTimelineKeyframe = {
  keyframesLaneSizePx?: number;
  selected?: boolean;
  keyframesShape?: string;
  hidden?: boolean;
  val: number;
  draggable?: boolean;
  data?: any;
  /**
   * Custom renderer for the keyframe.
   */
  render: null | undefined | RenderKeyframeFunction;
};

export type AnimationTimelineOptions = {
  keysPerSecond: number;
  snapsPerSeconds: number;
  snapEnabled: boolean;
  extraRightMargin: number;
  // Snap all the keyframes when multiple is moved.
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
  lineHeight: number;
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
  from: number | null;
  to: number | null;
  /**
   * Fire intermediate events during the drag process. Default: true
   */
  fireEventsDuringTheDrag: boolean;
  /**
   * Whether all keyframes draggable. Can be also configured by a keyframe property draggable
   */
  keyframesDraggable?: boolean;
  /**
   * Whether keyframes lanes draggable.  Can be also configured by a lane property draggable
   */
  keyframesLanesDraggalbe?: boolean;
};

type AnimationTimeline = {
  initialize(
    options: AnimationTimelineOptions,
    lanes?: AnimationTimelineLane[]
  ): Timeline;
};

declare const timeline: AnimationTimeline;

export default timeline;
