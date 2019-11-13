import React from "react";
import { Form, Input, Button, List, Icon, Card } from "antd";

const Profile = () => {
  return (
    <div>
      <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}>
        <Input addonBefore="nickname" />
        <Button type="primary">Edit</Button>
        <List
          style={{ marginBottom: "20px" }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>Follower List</div>}
          loadMore={<Button style={{ width: "100%" }}>More</Button>}
          bordered
          dataSource={["inegg", "hello", "bird"]}
          renderItem={item => (
            <List.Item style={{ marginTop: "20px" }}>
              <Card actions={[<Icon key="stop" type="stop" />]}>
                <Card.Meta description={item} />
              </Card>
            </List.Item>
          )}
        />
        <List
          style={{ marginBottom: "20px" }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>Following List</div>}
          loadMore={<Button style={{ width: "100%" }}>More</Button>}
          bordered
          dataSource={["inegg", "hello", "bird"]}
          renderItem={item => (
            <List.Item style={{ marginTop: "20px" }}>
              <Card actions={[<Icon key="stop" type="stop" />]}>
                <Card.Meta description={item} />
              </Card>
            </List.Item>
          )}
        />
      </Form>
    </div>
  );
};

export default Profile;
