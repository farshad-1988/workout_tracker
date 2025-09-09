import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

export default function checkDay(date: string) {
  const today = new DateObject({ calendar: persian, locale: persian_fa });

  // کپی از امروز و کم کردن یک روز برای دیروز
  const yesterday = new DateObject(today).subtract(1, "day");

  if (date === today.format("YYYY-MM-DD")) {
    return `امروز `;
  } else if (date === yesterday.format("YYYY-MM-DD")) {
    return `دیروز `;
  } else {
    return new DateObject({
      date,
      calendar: persian,
      locale: persian_fa,
    }).format("dddd D MMMM YYYY");
  }
}
