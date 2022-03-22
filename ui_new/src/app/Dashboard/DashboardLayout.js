import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ErrorMessage } from "../Commons/ErrorMessage";
import {
  Container,
  Dropdown,
  Grid,
  Header,
  Image,
  Menu,
  Modal,
} from "semantic-ui-react";
import { authSignOut } from "../../actions";
import { DashboardContent } from "./DashboardContent";
import { DepartmentsContent } from "../Departments/DepartmentsContent";
import { EmployeesContent } from "../Employees/EmployeesContent";
import { history } from "../..";
import modalActions from "../../actions/modalActions";

export const DashboardLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const { pathname } = location;

  return (
    <>
      <Modal
        size="tiny"
        closeOnDimmerClick={false}
        open={modal.open}
        dimmer="inverted"
        
      >
        <Modal.Header>{modal.title}</Modal.Header>
        {modal.errorMessages && (
          <Modal.Content style={{ paddingBottom: "0px" }}>
            <ErrorMessage errors={modal.errorMessages} />
          </Modal.Content>
        )}
        {modal.content}
      </Modal>

      <Menu
        stackable
        pointing
        secondary
        style={{
          marginTop: "0px",
          paddingTop: "14px",
          backgroundColor: "white",
        }}
        color="violet"
      >
        <Menu.Item>
          {/* <div style={{ backgroundImage: "url('logo-main.png')" }}>test</div> */}
          <Image
            src="logo-main.png"
            style={{ height: "25px", width: "25px", marginRight: "1em" }}
          />
          <span
            style={{
              color: "black",
              fontSize: "15px",
              fontWeight: "bold",
              paddingRight: "5em",
            }}
          >
            Face Recognition System
          </span>
        </Menu.Item>
        <Menu.Item
          name="Dashboard"
          active={pathname === "/dashboard"}
          onClick={() => {
            history.push("/dashboard");
          }}
        />
        <Menu.Item
          name="Employees"
          active={pathname === "/employees"}
          onClick={() => {
            history.push("/employees");
          }}
        />
        <Menu.Item
          name="Departments"
          active={pathname === "/departments"}
          onClick={() => {
            history.push("/departments");
          }}
        />
        <Menu.Menu position="right">
          <Dropdown item text="Admin">
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  authSignOut(dispatch);
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <div style={{ padding: "2em" }}>
        <Switch>
          <Route path="/dashboard" component={DashboardContent} />
          <Route path="/employees" component={EmployeesContent} />
          <Route path="/departments" component={DepartmentsContent} />
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    </>
  );
};
