export class TimelineBaseEvent {
  private _prevented = false;
  /**
   * Prevent default click logic.
   */
  preventDefault(): void {
    this._prevented = true;
  }

  isPrevented(): boolean {
    return this._prevented;
  }
}
