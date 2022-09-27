export const sendSelectedDate = (selectDate) => {
  console.log("sendSelectionDate", selectDate);
  return null;
};

export const changeWeekBack = (selectDateRange) => {
  console.log("changeWeekBack", selectDateRange);
  return null;
};

export const changeWeekFront = (selectDateRange) => {
  console.log("changeWeekFront", selectDateRange);
  return null;
};

export const getServices = () => {
  console.log("getServices");
  return [
    { id: 1, name: "11" },
    { id: 2, name: "22" },
    { id: 3, name: "33" },
  ];
};

export const getBooking = () => {
  return [
    {
      day: "2022-09-26",
      booking: [
        {
          id: 10,
          event_booking: [
            {
              time_start: "14:00:00",
              id: 4,
              day_booking: "2022-09-26",
              comment: "",
              connect_user: {
                name_client: "oleg",
                phone_num: "1111111",
                id: 1,
                tg_id: 12232,
              },
              time_end: "15:00:00",
            },
          ],
          many_day: [],
          start_event: "12:00:00",
          weekdays: [],
          name_event: "Work_Days",
          day_end: "2022-09-26",
          day_start: "2022-09-26",
          end_event: "14:00:00",
        },
        {
          id: 3,
          event_booking: [
            {
              time_start: "14:00:00",
              id: 1,
              day_booking: "2022-09-26",
              comment: "xer",
              connect_user: {
                name_client: "oleg",
                phone_num: "1111111",
                id: 1,
                tg_id: 12232,
              },
              time_end: "15:00:00",
            },
            {
              time_start: "16:00:00",
              id: 3,
              day_booking: "2022-09-26",
              comment: "",
              connect_user: {
                name_client: "oleg",
                phone_num: "1111111",
                id: 1,
                tg_id: 12232,
              },
              time_end: "17:00:00",
            },
          ],
          many_day: ["2022-09-19", "2022-09-21", "2022-09-26", "2022-09-28"],
          start_event: "15:00:00",
          weekdays: [0, 2],
          name_event: "LANCH GOOO",
          day_end: "2022-09-30",
          day_start: "2022-09-18",
          end_event: "17:00:00",
        },
      ],
    },
    {
      day: "2022-09-27",
      booking: [
        {
          id: 8,
          event_booking: [
            {
              time_start: "14:00:00",
              id: 2,
              day_booking: "2022-09-27",
              comment: "",
              connect_user: {
                name_client: "oleg",
                phone_num: "1111111",
                id: 1,
                tg_id: 12232,
              },
              time_end: "14:30:00",
            },
          ],
          many_day: [],
          start_event: "12:00:00",
          weekdays: [],
          name_event: "Work_Days",
          day_end: "2022-09-27",
          day_start: "2022-09-27",
          end_event: "15:00:00",
        },
      ],
    },
    {
      day: "2022-09-28",
      booking: [],
    },
    {
      day: "2022-09-29",
      booking: [],
    },
    {
      day: "2022-09-30",
      booking: [],
    },
    {
      day: "2022-10-01",
      booking: [],
    },
    {
      day: "2022-10-02",
      booking: [],
    },
  ];
};
