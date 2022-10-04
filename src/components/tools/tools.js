export const dateFromDayWeek = (weekDayIndex, treeWeekStart) => {
  const splitSelectDateRange = treeWeekStart.split("-");
  const counterDate = new Date(
    splitSelectDateRange[0],
    splitSelectDateRange[1],
    0
  );

  if (Number(splitSelectDateRange[2]) + weekDayIndex > counterDate.getDate()) {
    const newMonth =
      Number(splitSelectDateRange[1]) === 12
        ? 1
        : Number(splitSelectDateRange[1]) + 1;
    return [
      Number(splitSelectDateRange[2]) +
        Number(weekDayIndex) -
        counterDate.getDate(),
      newMonth,
    ];
  }
  return [
    Number(splitSelectDateRange[2]) + Number(weekDayIndex),
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

export const getNewWeek = (date, direction) => {
  if (direction === "front") {
    const splitSelectDate = date[6].day.split("-");
    const counterDate = new Date(splitSelectDate[0], splitSelectDate[1], 0);
    if (Number(splitSelectDate[2]) + 1 > counterDate.getDate()) {
      const newMonth =
        Number(splitSelectDate[1]) === 12 ? 1 : Number(splitSelectDate[1]) + 1;
      const newYear =
        Number(splitSelectDate[1]) === 12
          ? Number(splitSelectDate[0]) + 1
          : splitSelectDate[0];
      return (
        newYear +
        "-" +
        newMonth +
        "-" +
        (Number(splitSelectDate[2]) + 1 - counterDate.getDate())
      );
    }
    return (
      splitSelectDate[0] +
      "-" +
      Number(splitSelectDate[1]) +
      "-" +
      (Number(splitSelectDate[2]) + 1)
    );
  }
  if (direction === "back") {
    const splitSelectDate = date[0].day.split("-");
    const counterDate = new Date(splitSelectDate[0], splitSelectDate[1], 0);
    if (Number(splitSelectDate[2]) === 1) {
      const newYear =
        Number(splitSelectDate[1]) === 1
          ? Number(splitSelectDate[0]) - 1
          : splitSelectDate[0];
      const newMonth =
        Number(splitSelectDate[1]) === 1 ? 12 : Number(splitSelectDate[1]) - 1;
      return (
        newYear +
        "-" +
        newMonth +
        "-" +
        (Number(splitSelectDate[2]) + 1 - counterDate.getDate())
      );
    }
    return (
      splitSelectDate[0] +
      "-" +
      splitSelectDate[1] +
      "-" +
      (Number(splitSelectDate[2]) - 1)
    );
  }
  if (direction === undefined) {
    return date;
  }
};

export const getTimeCoef = (startTime, endTime) => {
  const startTimeSplit = startTime.split(":");
  const endTimeSplit = endTime.split(":");
  const minutesCoef = Math.abs(endTimeSplit[1] - startTimeSplit[1]) / 60;
  return endTimeSplit[0] - startTimeSplit[0] + minutesCoef;
};
