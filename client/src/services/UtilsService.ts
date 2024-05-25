import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th'; // Import Thai locale for dayjs

// Add BuddhistEra plugin to dayjs
dayjs.extend(buddhistEra);

class UtilsService {
  static formatAge(dob: number): string {
    // dob is Epoch
    if (!dob) {
      return "-";
    }

    const currentDate = new Date();

    const birthDate = new Date(dob);

    const yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();

    if (
      yearDiff < 0 ||
      (yearDiff === 0 && monthDiff < 0) ||
      (yearDiff === 0 && monthDiff === 0 && dayDiff > 0)
    ) {
      if (yearDiff === 0 && monthDiff === 0 && dayDiff > 0) {
        return `${dayDiff} วัน`;
      } else if (yearDiff === 0 && monthDiff < 0) {
        return `${Math.abs(monthDiff)} เดือน`;
      } else {
        const remainingMonths = ((yearDiff - 1) * 12 + monthDiff) % 12;
        return remainingMonths > 0 ? `${remainingMonths} เดือน` : "";
      }
    } else if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      const remainingMonths = 12 + monthDiff;
      return `${yearDiff} ปี ${remainingMonths} เดือน`;
    } else if (yearDiff === 0 && monthDiff > 0) {
      return `${monthDiff} เดือน`;
    } else {
      return `${yearDiff} ปี ${monthDiff} เดือน`;
    }
  }

  static formatDate(date: number): string {
    // Set Thai locale for dayjs
    dayjs.locale('th');

    const formattedDate = dayjs.unix(date).format('D MMM BBBB');

    return formattedDate;
}
}

export default UtilsService;
