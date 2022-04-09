import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export const dateFormat = (moment: Date) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ru');
  return dayjs(moment).from(dayjs());
};
