/**
 */
class Time {
  /**
   */
  static Epoch(src_time) {
    if (
      src_time &&
      typeof src_time === 'number' &&
      src_time.toString().length < 13
    )
      src_time = src_time * 1000;

    // console.log(src_time)
    const dt = src_time ? new Date(src_time) : new Date(Date.now());
    const dt_ms = dt ? dt.getTime() : Date.now();
    return parseInt(dt_ms / 1000);
  } // Epoch

  /**
   */
  static Epoch2Time(src_time) {
    const epoch = this.Epoch(src_time);
    return epoch * 1000;
  } // Epoch2Time

  /**
   */
  static Print2D(src_number) {
    return src_number.toString().padStart(2, '0');
  }
  static DTObj(val) {
    const dd = val
      ? new Date(this.Epoch2Time(val)).getDate()
      : new Date().getDate();
    const dy = val
      ? new Date(this.Epoch2Time(val)).getDay()
      : new Date().getDay();
    const mm = val
      ? new Date(this.Epoch2Time(val)).getMonth() + 1
      : new Date().getMonth() + 1;
    const yyyy = val
      ? new Date(this.Epoch2Time(val)).getFullYear().toString()
      : new Date().getFullYear().toString();
    const HH = val
      ? new Date(this.Epoch2Time(val)).getHours()
      : new Date().getHours();
    const MM = val
      ? new Date(this.Epoch2Time(val)).getMinutes()
      : new Date().getMinutes();
    return {
      dd: this.Print2D(dd),
      dy,
      mm: this.Print2D(mm),
      yyyy,
      HH: this.Print2D(HH),
      MM: this.Print2D(MM),
    };
  }

  static FullMDY(src_time) {
    const {dd, mm, yyyy} = this.DTObj(src_time);

    return [this.monthsFull[mm], dd + ',', yyyy].join(' ');
  }

  /**
   */
  static dayShort = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };
  /**
   */
  static dayFull = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  /**
   */
  static monthsShort = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  /**
   */
  static monthsFull = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
} // class Time

export {Time};
