import _ from 'underscore';
_.defaults(Date.prototype, {
  local2UTCTime(){
    const localTime = this.getTime();
    const localOffset = this.getTimezoneOffset() * 60000;
    return localTime + localOffset;
  },
  utc2LocalTime(){
    const utcTime = this.getTime();
    const localOffset = this.getTimezoneOffset() * 60000;
    return utcTime - localOffset;
  },
  getTimeOffest(){
    // Difference to Greenwich time (GMT) in hours
    const os = Math.abs(this.getTimezoneOffset());
    let h = String(Math.floor(os / 60));
    let m = String(os % 60);
    if (h.length === 1) {
      h = `0${h}`;
    }
    if (m.length === 1) {
      m = `0${m}`;
    }
    const timeOffset = this.getTimezoneOffset() < 0 ? `+${h}${m}` : `-${h}${m}`;
    return timeOffset;
  }
});
