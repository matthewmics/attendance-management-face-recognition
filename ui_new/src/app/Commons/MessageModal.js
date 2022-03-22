import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";

export const MessageModal = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Content>
        <span dangerouslySetInnerHTML={{ __html: message }}></span>
      </Modal.Content>
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
