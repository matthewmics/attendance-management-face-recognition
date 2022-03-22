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
  Input,
  Segment,
} from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { dateStringToLocal } from "../../helpers";
import { ConfirmationModal } from "../Commons/ConfirmationModal";
import { DelayedSearchInput } from "../Commons/DelayedSearchInput";
import { EmptyRecordComponent } from "../Commons/EmptyRecordComponent";
import { PopupButton } from "../Commons/PopupButton";
import { DtStyle, InputGroupStyleParent } from "../Commons/Styles";
import { DepartmentForm } from "./DepartmentForm";
import { DepartmentSchedules } from "./DepartmentSchedules";

export const DepartmentsContent = () => {
  const dispatch = useDispatch();

  const columns = [
    {
      name: "Department",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Created",
      sortable: true,
      selector: (row) => row.created_at,
    },
    {
      name: "-",
      selector: (row) => row.actions,
      right: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [dtData, setDtData] = useState([]);
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    let response = await agent.Department.list();

    setRecordList(response);

    processDt(response);

    setLoading(false);
  };

  function processDt(_data) {
    setDtData(
      _data.map((a) => {
        return {
          name: a.name,
          created_at: dateStringToLocal(a.created_at),
          actions: (
            <>
              <PopupButton
                iconName="calendar alternate"
                content="Schedules"
                color="orange"
                onClick={() => {
                  modalActions.openModal(
                    dispatch,
                    a.name,
                    <DepartmentSchedules departmentID={a.id} />
                  );
                }}
              />
              <PopupButton
                iconName="pencil"
                content="Edit Department"
                color="yellow"
                onClick={() => {
                  modalActions.openModal(
                    dispatch,
                    "Edit " + a.name,
                    <DepartmentForm toEdit={a} onSave={() => loadData()} />
                  );
                }}
              />
              <PopupButton
                iconName="trash"
                content="Delete Department"
                color="red"
                onClick={() => {
                  modalActions.openModal(
                    dispatch,
                    `Delete Department`,
                    <ConfirmationModal
                      content={`Delete ${a.name}?`}
                      onSubmit={async () => {
                        modalActions.setLoading(dispatch, true);
                        await agent.Department.delete(a.id);
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
        };
      })
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={16} mobile={16}>
          <Header as="h3">Departments</Header>
          <Segment style={{ minHeight: "250px" }}>
            <div>
              <Button
                color="violet"
                icon
                labelPosition="left"
                onClick={() => {
                  modalActions.openModal(
                    dispatch,
                    "New Department",
                    <DepartmentForm onSave={() => loadData()} />
                  );
                }}
              >
                <Icon name="plus" />
                New Department
              </Button>
              <span style={{ float: "right" }}>
                <DelayedSearchInput
                  onSearch={(term) => {
                    processDt(
                      recordList.filter((a) =>
                        a.name.toLowerCase().includes(term.toLowerCase())
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
              progressPending={loading}
              progressComponent={
                <Icon name="spinner" color="violet" loading size="big" />
              }
              data={dtData}
              noDataComponent={<EmptyRecordComponent />}
              customStyles={DtStyle}
            />
          </Segment>
          <br></br>
        </Grid.Column>
        {/* <Grid.Column computer={6} mobile={16}>
          <Header as="h3">Create New Department</Header>
          <Segment>
            <DepartmentForm
              onSave={() => {
                loadData();
              }}
            />
          </Segment>
        </Grid.Column> */}
      </Grid.Row>
    </Grid>
  );
};
