import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TextField, Autocomplete } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import "./InputField.css";
import { fixTimeToDatejs, fixDatejsToString } from "../tools/tools";

function InputField({ fieldName, setValue, value, style, services, error }) {
  const fieldsMap = new Map([
    ["name", "Название события"],
    ["dateStart", "Дата начала"],
    ["dateEnd", "Дата конца"],
    ["timeStart", "Время начала"],
    ["timeEnd", "Время конца"],
    ["selection", "Выбор услуги"],
    ["repeatEnd", "Дата конца повторений"],
    ["name_service", "Название"],
    ["duration", "Продолжительность"],
    ["price_service", "Цена"],
    ["max_booking", "Макс. кол-во записей"],
    ["login", "Логин"],
    ["password", "Пароль"],
    ["teg", "Тег"],
    ["userName", "Имя"],
  ]);

  const [inputValue, setInputValue] = useState(value[fieldName]);
  const [dateValue, setDateValue] = useState(
    value[fieldName] !== "" ? dayjs(value[fieldName]) : null
  );
  const [timeValue, setTimeValue] = useState(
    value[fieldName] !== ""
      ? dayjs("2020-01-01" + fixTimeToDatejs(value[fieldName]))
      : null
  );
  useEffect(() => {
    if (fieldName === "dateStart" || "dateEnd" || "repeatEnd") {
      setDateValue(value[fieldName] !== "" ? dayjs(value[fieldName]) : null);
    }
    if (fieldName === "timeStart" || "timeEnd") {
      setTimeValue(
        value[fieldName] !== ""
          ? dayjs("2020-01-01" + fixTimeToDatejs(value[fieldName]))
          : null
      );
    }
  }, [value[fieldName]]);

  if (fieldsMap.has(fieldName)) {
    switch (fieldName) {
      case "dateStart":
      case "dateEnd":
      case "repeatEnd":
        let minDate;
        if (fieldName === "repeatEnd") {
          minDate = dayjs(value.dateEnd);
        } else if (fieldName === "dateEnd") {
          minDate = dayjs(value.dateStart);
        }
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <DesktopDatePicker
              label={fieldsMap.get(fieldName)}
              value={dateValue}
              minDate={minDate}
              onChange={(newValue) => {
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
      case "duration":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <DesktopTimePicker
              label={fieldsMap.get(fieldName)}
              value={timeValue}
              PaperProps={{ onClick: (e) => e.stopPropagation() }}
              onChange={(newValue) => {
                setTimeValue(newValue);
                console.log("value", newValue);
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
                    [fieldName]:
                      newValue.$H +
                      ":" +
                      (newValue.$m === 0 ? "00" : newValue.$m) +
                      ":00",
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    ...style,
                    width: style?.width,
                  }}
                />
              )}
            />
          </LocalizationProvider>
        );
      case "selection":
        return (
          <Autocomplete
            multiple
            sx={style}
            id={fieldName}
            options={services}
            noOptionsText={"Добавьте услугу"}
            getOptionLabel={(option) => option?.name_service || ""}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
      case "password":
        return (
          <TextField
            style={{
              ...style,
              width: style?.width,
            }}
            type={"password"}
            id={fieldName}
            error={error}
            value={value[fieldName]}
            label={fieldsMap.get(fieldName)}
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setValue({ ...value, [fieldName]: e.target.value });
            }}
          />
        );
      case "max_booking":
        return (
          <TextField
            style={{
              ...style,
              width: style?.width,
            }}
            type={"number"}
            id={fieldName}
            error={error}
            value={value[fieldName]}
            label={fieldsMap.get(fieldName)}
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setValue({ ...value, [fieldName]: e.target.value });
            }}
          />
        );
      case "price_service":
        return (
          <TextField
            style={{
              ...style,
              width: style?.width,
            }}
            type={"number"}
            id={fieldName}
            error={error}
            value={value[fieldName]}
            label={fieldsMap.get(fieldName)}
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setValue({ ...value, [fieldName]: e.target.value });
            }}
          />
        );
      default:
        return (
          <TextField
            style={{
              ...style,
              width: style?.width,
            }}
            id={fieldName}
            error={error}
            value={value[fieldName]}
            label={fieldsMap.get(fieldName)}
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setValue({ ...value, [fieldName]: e.target.value });
            }}
          />
        );
    }
  }
}
export default InputField;
