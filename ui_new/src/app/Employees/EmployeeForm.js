import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Dropdown,
  Icon,
  Input,
  Modal,
  Segment,
  Select,
} from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { InputGroupStyleParent } from "../Commons/Styles";

export const EmployeeForm = ({ onSave, toEdit, toEditDepartmentId }) => {
  //specific
  const [deparmentsLoading, setDepartmentsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  // generic
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const initialData = { id: 0, name: "" };
  const [formData, setFormData] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (departments.length > 0) {
      if (toEditDepartmentId) {
        setSelectedDepartment(toEditDepartmentId);
      } else {
        setSelectedDepartment(departments[0].value);
      }
    } else {
      loadDepartments().then(() => {
        if (toEdit) {
          setFormData({
            name: toEdit.name,
            id: toEdit.id,
          });
        } else {
          setFormData({ ...initialData });
        }
      });
    }
  }, [toEdit, departments]);

  const loadDepartments = async () => {
    setDepartmentsLoading(true);

    const response = await agent.Department.list();

    setDepartments(
      response.map((dept) => {
        return {
          text: dept.name,
          value: dept.id,
        };
      })
    );

    setDepartmentsLoading(false);
  };

  if (deparmentsLoading)
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          padding: "2em",
        }}
      >
        <Icon name="spinner" loading size="large" color="violet" />
      </div>
    );

  return (
    <>
      <Modal.Content>
        <div style={InputGroupStyleParent}>
          <span style={{ whiteSpace: "nowrap" }}>Employee Name</span>
          <Input
            className="width-100"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div style={InputGroupStyleParent}>
          <span style={{ whiteSpace: "nowrap" }}>Department</span>
          {departments.length > 0 ? (
            <Select
              className="width-100"
              name="department_id"
              options={departments}
              value={selectedDepartment}
              onChange={(e, data) => {
                setSelectedDepartment(data.value);
              }}
            ></Select>
          ) : (
            <div>No departments to display.</div>
          )}
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
                  await agent.Employee.create({
                    name: formData.name,
                    department_id: selectedDepartment,
                  });
                  toast.success("Employee Created");
                } else {
                  await agent.Employee.update(formData.id, {
                    ...formData,
                    department_id: selectedDepartment,
                  });
                  toast.success("Employee Updated");
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
