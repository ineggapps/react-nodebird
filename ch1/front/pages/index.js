import React from "react";
import { Form, Input, Button, Card, Icon, Avatar } from "antd";
const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "inegg"
      },
      content: "the first post",
      img: "https://cdn.pixabay.com/photo/2019/09/11/22/29/leaf-4470075_960_720.jpg"
    }
  ]
};

const Home = () => {
  console.log("index page");
  return (
    <div>
      {dummy.isLoggedIn && (
        <Form encType="multipart/form-data">
          <Input.TextArea
            maxLength={140}
            placeholder="Did something strange happen?"
          ></Input.TextArea>
          <div>
            <input type="file" multiple hidden></input>
            <Button>Upload Images</Button>
            <Button type="primary" style={{ float: "right" }} htmlType="submit">
              Submit
            </Button>
          </div>
          <div>
            {dummy.imagePaths.map((v, i) => {
              return (
                <div key={v} style={{ display: "inline-block" }}>
                  <img src={"https://localhost:3065/" + v} style={{ width: "200px" }} alt={v} />
                </div>
              );
            })}
          </div>
        </Form>
      )}
      {dummy.mainPosts.map(c => {
        return (
          <Card
            key={+c.createdAt}
            cover={c.img && <img alt="example" src={c.img} />}
            actions={[
              <Icon type="retweet" key="retweet" />,
              <Icon type="heart" key="heart" />,
              <Icon type="message" key="message" />,
              <Icon type="ellipsis" key="ellipsis" />
            ]}
            extra={<Button>Follow</Button>}
          >
            <Card.Meta
              avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
              title={c.User.nickname}
              description={c.content}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
