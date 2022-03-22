import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Input,
  Message,
} from "semantic-ui-react";
import { history } from "..";
import { authLogin } from "../actions";
import { getToken } from "../helpers";

export const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    invalidLogin: false,
  });

  const dispatch = useDispatch();
  const { loadingLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getToken();
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, invalidLogin: false });
    authLogin(
      {
        email: state.email,
        password: state.password,
      },
      dispatch
    ).catch((err) => {
      setState({ ...state, invalidLogin: true });
    });
  };

  return (
    <Grid container centered columns={2} style={{ paddingTop: "2em" }}>
      <Grid.Row>
        <h1 style={{ color: "#6435c9" }}>
          <Icon name="lock" />
          LOGIN
        </h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Card style={{ width: "100%", backgroundColor: "#f5f5f5" }}>
            <Card.Content>
              <Form id="form-login" onSubmit={handleSubmit}>
                <Form.Field>
                  <Input
                    label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  ></Input>
                </Form.Field>
                <Form.Field>
                  <Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  ></Input>
                </Form.Field>
                {state.invalidLogin && (
                  <Message color="red">
                    <p>Credentials were incorrect</p>
                  </Message>
                )}
              </Form>
            </Card.Content>
            <Card.Content extra>
              <Button
                floated="right"
                form="form-login"
                type="submit"
                disabled={loadingLogin}
                loading={loadingLogin}
                size="small"
                icon
                labelPosition="left"
              >
                LOGIN
                <Icon name="lock" />
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
