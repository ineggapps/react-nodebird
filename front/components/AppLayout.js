import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/Link";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { LOAD_USER_REQUEST } from "../reducers/user";

const AppLayout = ({ children }) => {
  const { isLoggedIn, me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(me, "me가 있나 없나");
    if (!me) {
      console.log("me 정보를 불러오겠습니다.");
      dispatch({
        type: LOAD_USER_REQUEST
      });
    }
  }, []);

  return (
    <>
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">
              <a>NodeBird</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="mail">
            <Input.Search enterButton style={{ verticalAlign: "middle" }} />
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          {/* xs:모바일 , sm: 작은화면, md:중간화면, lg:큰 화면 */}
          <Col xs={8} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={8} md={12}>
            {children}
          </Col>
          <Col xs={8} md={6}>
            3rd
          </Col>
        </Row>
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
