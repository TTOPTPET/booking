import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import "./InputField.css";
import { getServices } from "../submitFunctions/submitFunctions";

function InputField({ fieldName, setInputVal, value, style }) {
  const fieldsMap = new Map([
    ["event-name", "Название события"],
    ["event-date-start", "Дата начала"],
    ["event-date-end", "Дата конца"],
    ["event-time-start", "Время начала"],
    ["event-time-end", "Время конца"],
    ["selection-event", "Выбор услуги"],
  ]);

  switch (fieldName) {
    case "selection-event":
      return (
        <Autocomplete
          id={fieldName}
          options={getServices()}
          // getOptionLabel={(option) => option.title}
          value={value}
          onChange={setInputVal}
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
          label={fieldsMap.get(fieldName)}
          variant="standard"
          style={{
            ...style,
            width: style?.width,
          }}
          onChange={() => {
            console.log("fff");
          }}
        />
      );
  }
}
export default InputField;
