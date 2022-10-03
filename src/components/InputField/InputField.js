import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import "./InputField.css";
import { getServices } from "../submitFunctions/submitFunctions";

function InputField({ fieldName, setValue, value, style }) {
  const fieldsMap = new Map([
    ["name", "Название события"],
    ["dateStart", "Дата начала"],
    ["dateEnd", "Дата конца"],
    ["timeStart", "Время начала"],
    ["timeEnd", "Время конца"],
    ["selection", "Выбор услуги"],
  ]);

  const [inputValue, setInputValue] = useState(value[fieldName]);

  switch (fieldName) {
    case "selection":
      const services = getServices();
      return (
        <Autocomplete
          id={fieldName}
          options={services}
          getOptionLabel={(option) => option.name || ""}
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
