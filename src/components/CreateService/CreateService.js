import React, { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import { postNewService } from "../submitFunctions/submitFunctions";
import "./CreateService.css";
import plus from "../../media/plus.png";

function CreateService({ serviceModal, setServiceModal, setServices }) {
  const [newService, setNewService] = useState({
    serviceName: "",
    servicePrice: "",
    serviceDuration: "",
    serviceMaxBook: "",
  });
  const [submitState, setSubmitState] = useState(false);
  useEffect(() => {
    console.log(newService);
    if (newService.serviceName !== "") {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [newService]);
  useEffect(() => {
    if (!serviceModal) {
      setNewService({
        serviceName: "",
        servicePrice: "",
        serviceDuration: "",
        serviceMaxBook: "",
      });
    }
  }, [serviceModal]);
  console.log("service", serviceModal);
  return (
    <div
      className="create-service__wrapper"
      style={serviceModal ? { width: "260px", padding: "20px 30px" } : {}}
      onClick={(e) => {
        e.stopPropagation();
      }}
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
        className={
          submitState
            ? "create-service__submit"
            : "create-service__submit create-service__submit_error"
        }
        onClick={() => {
          console.log("NewServ");
          submitState &&
            postNewService(newService, setServiceModal, setServices);
          setSubmitState(false);
        }}
      >
        Готово
      </div>
    </div>
  );
}

export default CreateService;
