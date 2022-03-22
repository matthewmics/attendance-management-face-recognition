import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Icon, Image, Modal } from "semantic-ui-react";

import modalActions from "../../actions/modalActions";
import agent from "../../agent";

export const AttendanceLogCapturedContent = ({ id }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [base64data, setBase64Data] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await agent.AttendanceLog.viewCaptured(id);
    setBase64Data("data:image/jpg;base64," + response);
    setLoading(false);
  };

  if (loading)
    return (
      <div style={{ padding: "2em" }}>
        <Icon loading name="spinner" color="violet" size="large" />
      </div>
    );
  return (
    <Modal.Content>
      {base64data && <Image src={base64data} />}
      <br></br>
      <Button
        disabled={loading}
        fluid
        onClick={() => {
          modalActions.closeModal(dispatch);
        }}
      >
        <Icon name="times" />
        CLOSE
      </Button>
    </Modal.Content>
  );
};
