import React, { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import { postNewService } from "../submitFunctions/submitFunctions";
import "./CreateService.css";
import plus from "../../media/plus.png";

function CreateService({ serviceModal, setServiceModal, setServices }) {
  const [newService, setNewService] = useState({
    name_service: "",
    price_service: "",
    duration: "",
    max_booking: "",
  });
  const [submitState, setSubmitState] = useState(false);
  useEffect(() => {
    console.log(newService);
    if (newService.name_service !== "") {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [newService]);
  useEffect(() => {
    if (!serviceModal) {
      setNewService({
        name_service: "",
        price_service: "",
        duration: "",
        max_booking: "",
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
          fieldName={"name_service"}
          value={newService}
          setValue={setNewService}
        />
        <InputField
          fieldName={"price_service"}
          value={newService}
          setValue={setNewService}
        />
        <InputField
          fieldName={"duration"}
          value={newService}
          setValue={setNewService}
          style={{ marginTop: "10px" }}
        />
        <InputField
          fieldName={"max_booking"}
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
            postNewService(newService).then((value) => {
              setServices(value.data);
              setServiceModal(false);
            });
          setSubmitState(false);
        }}
      >
        Готово
      </div>
    </div>
  );
}

export default CreateService;
