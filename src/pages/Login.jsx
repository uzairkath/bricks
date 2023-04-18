import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import apis from "../services/index.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "", otp: "" });

  const [isOTPSend, setOTPScreen] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const onChangeHandler = (e) =>
    setData({ ...data, [e.target.id]: e.target.value });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isOTPSend) {
      apis
        .LoginOTP(data)
        .then(async ({ data }) => {
          if (data.status === "SUCCESS") {
            const { token, expires } = data?.data?.token?.access || {};
            const dateTime = new Date("2023-02-24T06:56:46.630Z");
            console.log(token, data?.data);
            setUser(data?.data);
          }
        })
        .catch((error) => console.error("Error while verifying code", error));
    } else {
      const formData = { ...data };
      formData[data.otp] = true;
      apis
        .sendOTP(formData)
        .then(({ data }) => {
          if (data?.status === "SUCCESS") {
            setOTPScreen(true);
          } else {
            alert(data?.message);
          }
        })
        .catch((error) => {
          console.error("Error while send otp code", error);
        });
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center min-vh-100">
        <Col md={4}>
          <Form onSubmit={onSubmitHandler}>
            {isOTPSend ? (
              <Form.Group className="mb-3" controlId="code">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  id="code"
                  placeholder="Enter Code"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    id="username"
                    placeholder="Enter username"
                    value={data.username}
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={onChangeHandler}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="otp">
                  <div key={`inline-radio`} className="mb-3">
                    {/* <Form.Check
                      inline
                      label="Sms"
                      name="otp"
                      type={"radio"}
                      id="otp"
                      onChange={onChangeHandler}
                      value="sms"
                    /> */}
                    <Form.Check
                      inline
                      label="Email"
                      name="otp"
                      type={"radio"}
                      id="otp"
                      onChange={onChangeHandler}
                      value="email"
                    />
                  </div>
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              {isOTPSend ? "Verify" : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
