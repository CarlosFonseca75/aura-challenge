import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export class Dayjs {
  static nowUtc(): Date {
    return dayjs().utc().toDate();
  }

  static toUtc(date: Date | string): Date {
    return dayjs(date).utc().toDate();
  }

  static format(date: Date | string, format = "YYYY-MM-DD HH:mm:ss"): string {
    return dayjs(date).utc().format(format);
  }

  static fromNow(date: Date | string): string {
    return dayjs(date).utc().fromNow();
  }
}
