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
