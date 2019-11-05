import React from "react";
import Head from "next/head";
import Link from "next/Link";
import { Menu, Input, Button } from "antd";

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
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
          <Button>
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </Button>
        </Menu>
        {children}
      </div>
    </>
  );
};

export default AppLayout;
