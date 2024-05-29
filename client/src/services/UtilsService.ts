import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";

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
    return dayjs.unix(date).format("DD MMM BBBB");
  }

  static getRandomColor(): string {
    const colors = [
      "#f56a00",
      "#7265e6",
      "#ffbf00",
      "#00b3c0",
      "#10c231",
      "#da007f",
      "#b300e9",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  static renderStatus(status: number, type: 'vaccinated' | 'wean' | 'gender' | 'sterilized' | 'houseBreaking'): string {
    const statusMappings: { [key: string]: {
      default: string; [key: number]: string 
} } = {
      vaccinated: { 0: "ยังไม่ได้รับการฉีดวัคซีน", 1: "ได้รับการฉีดวัคซีนแล้ว", default: "ไม่ระบุ" },
      wean: { 0: "ยังไม่หย่านม", 1: "หย่านมแล้ว", default: "ไม่ระบุ" },
      gender: { 0: "เพศชาย", 1: "เพศหญิง", 2: "อื่นๆ", default: "-" },
      sterilized: { 0: "ยังไม่ทำหมัน", 1: "ทำหมันแล้ว", default: "ไม่ระบุ" },
      houseBreaking: { 0: "ยังไม่ฝึกขับถ่าย", 1: "ฝึกขับถ่ายแล้ว", default: "ไม่ระบุ" },
    };

    return statusMappings[type][status] || statusMappings[type].default;
  }
}

export default UtilsService;
