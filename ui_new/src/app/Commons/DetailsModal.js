import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "semantic-ui-react";
import modalActions from "../../actions/modalActions";

export const DetailsModal = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Content>
        <Table definition>
          <Table.Body>
            {Object.entries(data).map(([key, value], index) => (
              <Table.Row key={index}>
                <Table.Cell width={5}>{key}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
