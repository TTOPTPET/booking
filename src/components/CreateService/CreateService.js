import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { postNewService } from "../submitFunctions/submitFunctions";
import "./CreateService.css";
import plus from "../../media/plus.png";

function CreateService({ serviceModal, setServiceModal }) {
  const [newService, setNewService] = useState({
    serviceName: "",
    servicePrice: null,
    serviceDuration: "",
    serviceMaxBook: null,
  });
  console.log("service", serviceModal);
  return (
    <div
      className="create-service__wrapper"
      style={serviceModal ? { transform: "scale(1)" } : {}}
    >
      <div
        className="create-service__close"
        onClick={() => setServiceModal(false)}
      >
        <img src={plus} />
      </div>
      <div className="create-service__name">Создать услугу</div>
      <div className="create-service__form">
        <InputField
          fieldName={"serviceName"}
          value={newService}
          setValue={setNewService}
        />
        <InputField
          fieldName={"servicePrice"}
          value={newService}
          setValue={setNewService}
        />
        <InputField
          fieldName={"serviceDuration"}
          value={newService}
          setValue={setNewService}
        />
        <InputField
          fieldName={"serviceMaxBook"}
          value={newService}
          setValue={setNewService}
        />
      </div>
      <div
        className="create-service__submit"
        onClick={() => {
          console.log("NewServ");
          postNewService(newService, setServiceModal);
        }}
      >
        Готово
      </div>
    </div>
  );
}

export default CreateService;
