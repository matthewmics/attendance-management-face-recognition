import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";

export const ConfirmationModal = ({ content, onSubmit }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return (
    <>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Button
          disabled={modal.loading}
          onClick={() => {
            modalActions.closeModal(dispatch);
          }}
        >
          Cancel
        </Button>
        <Button
          icon
          labelPosition="left"
          positive
          disabled={modal.loading}
          onClick={onSubmit}
        >
          <Icon name="check" />
          OK
        </Button>
      </Modal.Actions>
    </>
  );
};
