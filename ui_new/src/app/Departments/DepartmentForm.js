import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { InputGroupStyleParent } from "../Commons/Styles";

export const DepartmentForm = ({ onSave, toEdit }) => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const initialData = { name: "", id: 0 };
  const [formData, setFormData] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (toEdit) {
      setFormData({
        name: toEdit.name,
        id: toEdit.id,
      });
    } else {
      setFormData({ ...initialData });
    }
  }, [toEdit]);

  return (
    <>
      <Modal.Content>
        <div style={InputGroupStyleParent}>
          <span style={{ whiteSpace: "nowrap" }}>Department</span>
          <Input
            className="width-100"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <Button.Group fluid>
          <Button
            loading={loading}
            disabled={loading}
            icon
            labelPosition="left"
            onClick={() => {
              modalActions.closeModal(dispatch);
            }}
          >
            <Icon name="times" />
            CLOSE
          </Button>
          <Button
            color="green"
            loading={loading}
            disabled={loading}
            icon
            labelPosition="left"
            onClick={async () => {
              setLoading(true);

              try {
                if (formData.id === 0) {
                  await agent.Department.create({
                    name: formData.name,
                  });
                  toast.success("Department Created");
                } else {
                  await agent.Department.update(formData.id, {
                    ...formData,
                  });
                  toast.success("Department Updated");
                }

                onSave();
                modalActions.closeModal(dispatch);
              } catch (err) {
                modalActions.setErrors(dispatch, err.data.errors);
                setLoading(false);
              }
            }}
          >
            <Icon name="save" />
            SAVE
          </Button>
        </Button.Group>
      </Modal.Content>
    </>
  );
};
