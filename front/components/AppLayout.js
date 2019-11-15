import React from "react";
import PropTypes from "prop-types";
import Link from "next/Link";
import { Menu, Input, Row, Col, Card, Avatar } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const dummy = {
  nickname: "inegg",
  Post: [],
  Followings: [],
  Follwers: [],
  isLoggedIn: false
};

const AppLayout = ({ children }) => {
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
            {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />}
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
