import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TextField, Autocomplete } from "@mui/material";
import "./InputField.css";
import { fixTimeToDatejs, fixDatejsToString } from "../tools/tools";

function InputField({ fieldName, setValue, value, style, services }) {
  const fieldsMap = new Map([
    ["name", "Название события"],
    ["dateStart", "Дата начала"],
    ["dateEnd", "Дата конца"],
    ["timeStart", "Время начала"],
    ["timeEnd", "Время конца"],
    ["selection", "Выбор услуги"],
    ["repeatEnd", "Дата конца повторений"],
  ]);

  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState(
    value[fieldName] !== "" ? dayjs(value[fieldName]) : null
  );
  useEffect(() => {
    if (fieldName === "dateStart" || "dateEnd" || "repeatEnd") {
      setDateValue(value[fieldName] !== "" ? dayjs(value[fieldName]) : null);
    }
  }, [value[fieldName]]);
  switch (fieldName) {
    case "dateStart":
    case "dateEnd":
    case "repeatEnd":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
          <DesktopDatePicker
            label={fieldsMap.get(fieldName)}
            value={dateValue}
            // minDate={dayjs("2017-01-01")}
            onChange={(newValue) => {
              console.log("new date", newValue);
              setDateValue(newValue);
              if (newValue === null) {
                setValue({
                  ...value,
                  [fieldName]: "",
                });
              } else if (
                newValue !== null &&
                newValue?.$D &&
                !isNaN(newValue.$D)
              ) {
                setValue({
                  ...value,
                  [fieldName]: fixDatejsToString(newValue),
                });
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          ></DesktopDatePicker>
        </LocalizationProvider>
      );
    case "timeStart":
    case "timeEnd":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
          <DesktopTimePicker
            label={fieldsMap.get(fieldName)}
            value={dayjs("2020-01-01" + fixTimeToDatejs(value[fieldName]))}
            onChange={(newValue) => {
              setValue({
                ...value,
                [fieldName]: newValue.$H + ":" + newValue.$m + ":00",
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    case "selection":
      return (
        <Autocomplete
          id={fieldName}
          options={services}
          getOptionLabel={(option) => option.name_service || ""}
          value={value[fieldName]}
          onChange={(event, newValue) => {
            setValue({ ...value, [fieldName]: newValue });
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={fieldsMap.get(fieldName)}
              variant="standard"
            />
          )}
        ></Autocomplete>
      );
    default:
      return (
        <TextField
          id={fieldName}
          value={value[fieldName]}
          label={fieldsMap.get(fieldName)}
          variant="standard"
          style={{
            ...style,
            width: style?.width,
          }}
          onChange={(e) => {
            setValue({ ...value, [fieldName]: e.target.value });
          }}
        />
      );
  }
}
export default InputField;
