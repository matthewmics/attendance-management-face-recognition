import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Segment,
} from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { apiUrl } from "../../environment";
import { dateStringToLocal } from "../../helpers";
import { ComponentModal } from "../Commons/ComponentModal";
import { ConfirmationModal } from "../Commons/ConfirmationModal";
import { DelayedSearchInput } from "../Commons/DelayedSearchInput";
import { EmptyRecordComponent } from "../Commons/EmptyRecordComponent";
import { PopupButton } from "../Commons/PopupButton";
import { DtStyle, InputGroupStyleParent } from "../Commons/Styles";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeUploadPicture } from "./EmployeeUploadPicture";

export const EmployeesContent = () => {
  const columns = [
    {
      name: "Employee",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Department",
      selector: (row) => row.department.name,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => dateStringToLocal(row.created_at),
      sortable: true,
    },
    {
      name: "-",
      selector: (row) => (
        <>
          <PopupButton
            disabled={!row.picture_path}
            iconName="eye"
            content="View Face Picture"
            onClick={() => {
              modalActions.openModal(
                dispatch,
                row.name + " Face Picture",
                <ComponentModal
                  component={<Image src={apiUrl + row.picture_path} />}
                />
              );
            }}
          />
          <PopupButton
            iconName="upload"
            content="Upload Face Picture"
            color="orange"
            onClick={() => {
              modalActions.openModal(
                dispatch,
                "Upload " + row.name + " Face Picture",
                <EmployeeUploadPicture id={row.id} onSave={() => loadData()} />
              );
            }}
          />
          <PopupButton
            iconName="pencil"
            content="Edit Employee"
            color="yellow"
            onClick={() => {
              modalActions.openModal(
                dispatch,
                "Edit " + row.name,
                <EmployeeForm
                  toEdit={row}
                  toEditDepartmentId={row.department_id}
                  onSave={() => loadData()}
                />
              );
            }}
          />
          <PopupButton
            iconName="trash"
            content="Delete"
            color="red"
            onClick={() => {
              modalActions.openModal(
                dispatch,
                `Delete Employee`,
                <ConfirmationModal
                  content={`Delete ${row.name}?`}
                  onSubmit={async () => {
                    modalActions.setLoading(dispatch, true);
                    await agent.Employee.delete(row.id);
                    modalActions.closeModal(dispatch);
                    loadData();
                    toast.success("Deleted");
                  }}
                />
              );
            }}
          />
        </>
      ),
      right: true,
    },
  ];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dtData, setDtData] = useState([]);
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const response = await agent.Employee.list();
    setRecordList(response);
    setDtData(response);

    setLoading(false);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={16} mobile={16}>
          <Header as="h3">Employees</Header>
          <Segment style={{ minHeight: "250px" }}>
            <div>
              <Button
                color="violet"
                icon
                labelPosition="left"
                onClick={() => {
                  modalActions.openModal(
                    dispatch,
                    "New Employee",
                    <EmployeeForm onSave={() => loadData()} />
                  );
                }}
              >
                <Icon name="plus" />
                New Employee
              </Button>
              <span style={{ float: "right" }}>
                <DelayedSearchInput
                  onSearch={(term) => {
                    setDtData(
                      recordList.filter(
                        (r) =>
                          r.name.toLowerCase().includes(term.toLowerCase()) ||
                          r.department.name
                            .toLowerCase()
                            .includes(term.toLowerCase())
                      )
                    );
                  }}
                />
              </span>
            </div>
            <DataTable
              pagination
              striped
              columns={columns}
              data={dtData}
              progressPending={loading}
              noDataComponent={<EmptyRecordComponent />}
              progressComponent={
                <Icon name="spinner" color="violet" loading size="big" />
              }
              customStyles={DtStyle}
            />
          </Segment>
          <br></br>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
