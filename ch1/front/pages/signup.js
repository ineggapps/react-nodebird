import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = e => {
      setter(e.target.value);
    };
    return [value, handler];
  };

  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  };

  const onChangePasswordCheck = e => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };
  const onChangeTerm = e => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <AppLayout>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">Id</label>
          <br />
          <Input name="user-id" required value={id} onChange={onChangeId}></Input>
        </div>
        <div>
          <label htmlFor="user-nickname">Nickname</label>
          <br />
          <Input name="user-nickname" required value={nickname} onChange={onChangeNickname}></Input>
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            required
            value={password}
            onChange={onChangePassword}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-password-check">Password Confirm</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            required
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          ></Input>
          {passwordError && (
            <p style={{ color: "red" }}>Password Confirm is different from password input box.</p>
          )}
        </div>
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            I agree
          </Checkbox>
          {termError && <p style={{ color: "red" }}>You must check on the checkbox</p>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
