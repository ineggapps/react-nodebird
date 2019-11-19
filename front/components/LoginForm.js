import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useInput } from "./UseInput";
import Link from "next/Link";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    dispatch(loginAction);
  }, []);

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: "10px" }}>
      <div>
        <label htmlFor="user-id">id</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">password</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={false}>
          Sign In
        </Button>
        <Button loading={false}>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
