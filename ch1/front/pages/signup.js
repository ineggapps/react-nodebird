import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";

const Signup = () => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

  const onSubmit = () => {};
  const onChangeId = e => {
    setId(e.target.value);
  };
  const onChangeNickname = e => {
    setNickname(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = e => {
    setPasswordCheck(e.target.value);
  };
  const onChangeTerm = e => {
    setTerm(e.target.value);
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
            onChange={onChangePasswordChk}
          ></Input>
        </div>
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            I agree
          </Checkbox>
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
