import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";

export const ComponentModal = ({ component }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Content>{component}</Modal.Content>
      <Modal.Actions>
        <Button
          positive
          onClick={() => {
            modalActions.closeModal(dispatch);
          }}
        >
          Done
        </Button>
      </Modal.Actions>
    </>
  );
};
