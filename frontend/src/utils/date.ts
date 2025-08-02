import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

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
}
