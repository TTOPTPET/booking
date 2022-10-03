export const dateFromDayWeek = (weekDayIndex, selectDateRange) => {
  const splitSelectDateRange = selectDateRange.start.split(".");
  const counterDate = new Date(
    splitSelectDateRange[2],
    splitSelectDateRange[1],
    0
  );

  if (Number(splitSelectDateRange[0]) + weekDayIndex > counterDate.getDate()) {
    const newMonth =
      Number(splitSelectDateRange[1]) === 12
        ? 1
        : Number(splitSelectDateRange[1]) + 1;
    return [
      Number(splitSelectDateRange[0]) +
        Number(weekDayIndex) -
        counterDate.getDate(),
      newMonth,
    ];
  }
  return [
    Number(splitSelectDateRange[0]) + Number(weekDayIndex),
    Number(splitSelectDateRange[1]),
  ];
};

export const formatDateToView = (date) => {
  let splitDate = date.split("-");
  return splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
};

export const formatDateToSet = (objDate) => {
  return objDate.year + "-" + objDate.month + "-" + objDate.day;
};

export const formatDateToObject = (date) => {
  let splitDate = date.split("-");
  return { year: splitDate[0], month: splitDate[1], day: splitDate[2] };
};
