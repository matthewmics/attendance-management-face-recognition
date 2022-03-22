import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Icon, Modal } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { DepartmentSchedule } from "./DepartmentSchedule";

export const DepartmentSchedules = ({ departmentID }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    setLoading(true);
    const response = await agent.Department.schedules(departmentID);
    setSchedules(response);
    setLoading(false);
  };

  if (loading)
    return (
      <div style={{ padding: "2em" }}>
        <Icon loading name="spinner" size="large" color="violet" />
      </div>
    );
  return (
    <>
      <Button
        style={{ position: "absolute", top: "15px", right: "15px" }}
        icon
        size="mini"
        color="red"
        labelPosition="left"
        onClick={() => {
          modalActions.closeModal(dispatch);
        }}
      >
        <Icon name="times" />
        CLOSE
      </Button>
      <Modal.Content scrolling>
        {schedules.map((schedule) => {
          return <DepartmentSchedule key={schedule.id} schedule={schedule} />;
        })}
      </Modal.Content>
    </>
  );
};
