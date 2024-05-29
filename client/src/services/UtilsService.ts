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
  static renderVaccinated(status: number) {
    switch (status) {
      case 0:
        return "ยังไม่ได้รับการฉีดวัคซีนแล้ว";
      case 1:
        return "ได้รับการฉีดวัคซีนแล้ว";
      default:
        return "ไม่ระบุ";
    }
  }

  static renderWean(status: 0 | 1 | 2) {
    switch (status) {
      case 0:
        return "ยังไม่หย่านม";
      case 1:
        return "หย่านมแล้ว";
      default:
        return "ไม่ระบุ";
    }
  }

  static renderGender(gender: 0 | 1 | 2) {
    switch (gender) {
      case 0:
        return "เพศชาย";
      case 1:
        return "เพศหญิง";
      case 2:
        return "อื่นๆ";
      default:
        return "-";
    }
  }

  static renderSterilized(status: 0 | 1 | 2) {
    switch (status) {
      case 0:
        return "ยังไม่ทำหมัน";
      case 1:
        return "ทำหมันแล้ว";
      default:
        return "ไม่ระบุ";
    }
  }

  static renderHouseBreaking(status: 0 | 1 | 2) {
    switch (status) {
      case 0:
        return "ยังไม่ฝึกขับถ่าย";
      case 1:
        return "ฝึกขับถ่ายแล้ว";
      default:
        return "ไม่ระบุ";
    }
  }
}

export default UtilsService;
