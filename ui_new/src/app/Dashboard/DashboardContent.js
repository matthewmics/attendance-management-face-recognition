import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  Segment,
  Select,
} from "semantic-ui-react";
import agent from "../../agent";
import { EmptyRecordComponent } from "../Commons/EmptyRecordComponent";
import { departmentOptions } from "../Commons/Enumerations";
import { DtStyle, InputGroupStyleParent } from "../Commons/Styles";
import moment from "moment";
import { dateStringToLocal, dateStringToLocalDate } from "../../helpers";
import { PopupButton } from "../Commons/PopupButton";
import modalActions from "../../actions/modalActions";
import { AttendanceLogCapturedContent } from "./AttendanceLogCapturedContent";
import { saveAs } from "file-saver";
import { DelayedSearchInput } from "../Commons/DelayedSearchInput";

export const DashboardContent = () => {
  const { user } = useSelector((state) => state.auth);

  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const columns = [
    {
      name: "Employee",
      selector: (row) => row.app_user.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.app_user.department.name,
      format: (row) => <Label>{row.app_user.department.name}</Label>,
      sortable: true,
    },
    {
      name: "Temp",
      selector: (row) => row.temperature,
    },
    {
      name: "In",
      selector: (row) => row.created_at,
      format: (row) => (
        <>
          <span style={{ fontSize: "11px", color: "grey" }}>
            {dateStringToLocal(row.created_at, "ddd, MMM DD, YYYY")}
          </span>
          <div style={{ color: "black", fontWeight: "bold" }}>
            {dateStringToLocal(row.created_at, "LT")}
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Out",
      selector: (row) => row.time_out,
      format: (row) =>
        row.time_out ? (
          <>
            <span style={{ fontSize: "11px", color: "grey" }}>
              {dateStringToLocal(row.time_out, "ddd, MMM DD, YYYY")}
            </span>
            <div style={{ color: "black", fontWeight: "bold" }}>
              {dateStringToLocal(row.time_out, "LT")}
            </div>
          </>
        ) : (
          "-"
        ),
      sortable: true,
    },
    {
      name: "-",
      selector: (row) => (
        <>
          <PopupButton
            content="View Captured"
            iconName="camera retro"
            color="violet"
            onClick={() => {
              modalActions.openModal(
                dispatch,
                row.app_user.name,
                <AttendanceLogCapturedContent id={row.id} />
              );
            }}
          ></PopupButton>
        </>
      ),
      right: true,
    },
  ];

  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logsList, setLogsList] = useState([]);
  const [logsDt, setLogsDt] = useState([]);

  const [loadingReport, setLoadingReport] = useState(false);

  const [employees, setEmployees] = useState([
    {
      text: "From Department",
      value: 0,
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(0);

  const [departmentData, setDepartmentData] = useState({
    options: [{ value: 0, text: "All" }],
    optionsReport: [],
    selected: 0,
    selectedReport: 0,
    loading: true,
  });

  const [filter, setFilter] = useState({
    from: moment().subtract(30, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
    max: moment().format("YYYY-MM-DD"),
  });

  const [filterReport, setFilterReport] = useState({
    from: moment().subtract(30, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
    max: moment().format("YYYY-MM-DD"),
  });

  const handFilterInputReport = (e) => {
    if (e.target.name === "to") {
      if (moment(e.target.value).isBefore(moment(filterReport.from))) {
        setFilterReport({ to: e.target.value, from: e.target.value });
      } else {
        setFilterReport({ ...filterReport, [e.target.name]: e.target.value });
      }

      return;
    }

    setFilterReport({ ...filterReport, [e.target.name]: e.target.value });
  };

  const handFilterInput = (e) => {
    if (e.target.name === "to") {
      if (moment(e.target.value).isBefore(moment(filter.from))) {
        setFilter({ to: e.target.value, from: e.target.value });
      } else {
        setFilter({ ...filter, [e.target.name]: e.target.value });
      }

      return;
    }

    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadDepartments().then(() => {
      loadLogs();
    });
  }, []);

  const loadLogs = async () => {
    setLoadingLogs(true);
    const response = await agent.AttendanceLog.list();
    setLogsList(response);
    setLoadingLogs(false);

    applyFilter(response);
  };

  const applyFilter = (list) => {
    setLogsDt(
      list.filter((a) => {
        const localDate = dateStringToLocalDate(a.created_at);
        const isBetween =
          moment(localDate).isSameOrBefore(moment(filter.to)) &&
          moment(localDate).isSameOrAfter(moment(filter.from));

        const { selected } = departmentData;
        if (selected === 0) return isBetween;

        return isBetween && selected === a.app_user.department_id;
      })
    );
  };

  const loadDepartments = async () => {
    let response = await agent.Employee.list();

    response = response.map((a) => {
      return {
        text: a.name,
        value: a.id,
      };
    });

    setEmployees([...employees, ...response]);

    response = await agent.Department.list();
    setDepartmentData({
      selected: 0,
      loading: false,
      options: [
        ...departmentData.options,
        ...response.map((a) => {
          return {
            text: a.name,
            value: a.id,
          };
        }),
      ],
      optionsReport: [
        ...response.map((a) => {
          return {
            text: a.name,
            value: a.id,
          };
        }),
      ],
      selectedReport: response.length > 0 ? 1 : 0,
    });
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column computer={8} mobile={8}>
            <Header as="h3">Filter</Header>
            <Card fluid>
              <Card.Content>
                <div style={InputGroupStyleParent}>
                  <span>Department</span>
                  <Select
                    value={departmentData.selected}
                    fluid
                    onChange={(e, data) => {
                      setDepartmentData({
                        ...departmentData,
                        selected: data.value,
                      });
                    }}
                    options={departmentData.options}
                  ></Select>
                </div>
                <br></br>
                <div style={InputGroupStyleParent}>
                  <span>From</span>
                  <Input
                    max={filter.to}
                    onChange={handFilterInput}
                    name="from"
                    value={filter.from}
                    type="date"
                    className="width-100"
                  />
                </div>
                <br></br>
                <div style={InputGroupStyleParent}>
                  <span>To</span>
                  <Input
                    max={filter.max}
                    onChange={handFilterInput}
                    name="to"
                    value={filter.to}
                    type="date"
                    className="width-100"
                  />
                </div>
                <br></br>
                <div style={{ height: "58px" }}></div>
                <Button
                  onClick={() => {
                    applyFilter(logsList);
                    searchRef.current.inputRef.current.value = "";
                  }}
                  icon
                  fluid
                  labelPosition="left"
                  disabled={departmentData.loading || loadingLogs}
                  loading={departmentData.loading || loadingLogs}
                >
                  <Icon name="filter" />
                  Apply Filter
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={8}>
            <Header as="h3">Generate Report</Header>
            <Card fluid>
              <Card.Content>
                <div style={InputGroupStyleParent}>
                  <span>Department</span>
                  <Select
                    disabled={selectedEmployee !== 0}
                    value={departmentData.selectedReport}
                    fluid
                    onChange={(e, data) => {
                      setDepartmentData({
                        ...departmentData,
                        selectedReport: data.value,
                      });
                    }}
                    options={departmentData.optionsReport}
                  ></Select>
                </div>
                <br></br>
                <div style={InputGroupStyleParent}>
                  <span>Employee</span>
                  <Select
                    search
                    value={selectedEmployee}
                    fluid
                    onChange={(e, data) => {
                      setSelectedEmployee(data.value);
                    }}
                    options={employees}
                  ></Select>
                </div>
                <br></br>
                <div style={InputGroupStyleParent}>
                  <span>From</span>
                  <Input
                    value={filterReport.from}
                    onChange={handFilterInputReport}
                    name="from"
                    type="date"
                    className="width-100"
                  />
                </div>
                <br></br>
                <div style={InputGroupStyleParent}>
                  <span>To</span>
                  <Input
                    value={filterReport.to}
                    onChange={handFilterInputReport}
                    max={filterReport.max}
                    name="to"
                    type="date"
                    className="width-100"
                  />
                </div>

                <br></br>
                <Button
                  loading={loadingReport || departmentData.loading}
                  disabled={loadingReport || departmentData.loading}
                  icon
                  fluid
                  labelPosition="left"
                  onClick={async () => {
                    setLoadingReport(true);

                    let response = null;

                    if (selectedEmployee === 0) {
                      response = await agent.Report.generate({
                        ...filterReport,
                        department_id: departmentData.selectedReport,
                      });
                    } else {
                      response = await agent.Report.employee(selectedEmployee, {
                        ...filterReport,
                        department_id: departmentData.selectedReport,
                      });
                    }

                    let fileName = "";

                    if (selectedEmployee === 0) {
                      fileName = departmentData.optionsReport.filter(
                        (a) => a.value === departmentData.selectedReport
                      )[0].text;
                    } else {
                      fileName = employees.find(
                        (a) => a.value === selectedEmployee
                      ).text;
                    }

                    saveAs(
                      response,
                      fileName +
                        "_" +
                        filterReport.from +
                        "_to_" +
                        filterReport.to +
                        ".csv"
                    );
                    setLoadingReport(false);
                  }}
                >
                  <Icon name="file text" />
                  Generate Report
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          {/* ATTENDANCE LOGS */}
          <Grid.Column computer={16} mobile={16}>
            <Header style={{ display: "inline" }} as="h3">
              Attendance Logs
            </Header>

            <Button
              icon
              size="mini"
              style={{ marginLeft: "10px" }}
              color="orange"
              circular
              disabled={loadingLogs || departmentData.loading}
              loading={loadingLogs || departmentData.loading}
              onClick={() => {
                loadLogs().then(() => {
                  searchRef.current.inputRef.current.value = "";
                  applyFilter();
                });
              }}
            >
              <Icon name="redo" />
            </Button>
            <Segment>
              <span style={{ float: "left" }}>
                <DelayedSearchInput
                  searchRef={searchRef}
                  onSearch={(term) => {
                    setLogsDt(
                      logsList.filter((r) =>
                        r.app_user.name
                          .toLowerCase()
                          .includes(term.toLowerCase())
                      )
                    );
                  }}
                />
              </span>
              <DataTable
                data={logsDt}
                columns={columns}
                striped
                pagination
                noDataComponent={<EmptyRecordComponent></EmptyRecordComponent>}
                progressComponent={
                  <Icon name="spinner" color="violet" loading size="big" />
                }
                customStyles={DtStyle}
                progressPending={loadingLogs || departmentData.loading}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
