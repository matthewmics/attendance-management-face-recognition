import "../semantic-ui-css/semantic.min.css";
import "../index.css";

import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../actions";
import { Dimmer, Icon, Loader, Segment } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import { DashboardLayout } from "./Dashboard/DashboardLayout";

export const App = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  return (
    <Fragment>
      <ToastContainer
        position="bottom-center"
        pauseOnFocusLoss={false}
        autoClose={2500}
        hideProgressBar={true}
        theme="colored"
      />
      {!user.name || loading ? (
        // <Loader
        //   active
        //   inline="centered"
        //   content="Loading"
        //   style={{ marginTop: "2.5em" }}
        // />

        <div
          style={{
            width: "fit-content",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Icon loading name="spinner" size="huge" color="violet" />
        </div>
      ) : (
        <>
          <DashboardLayout></DashboardLayout>
          {/* <NotificationComponent /> */}
        </>
      )}
    </Fragment>
  );
};
