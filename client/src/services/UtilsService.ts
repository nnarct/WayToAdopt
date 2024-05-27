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
    const monthsThai = [
        "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const inputDate = new Date(date * 1000); // Convert epoch to milliseconds
    const day = inputDate.getDate();
    const month = inputDate.getMonth();
    const year = inputDate.getFullYear() + 543; // Convert to Buddhist calendar year

    return `${day} ${monthsThai[month]} ${year}`;
  }
  static getRandomColor(): string {
    const colors = ["#f56a00","#7265e6","#ffbf00","#00b3c0","#10c231","#da007f","#b300e9",];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

export default UtilsService;
