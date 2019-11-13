import React from "react";
import { Form, Input, Button } from "antd";

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

const PostForm = () => (
  <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data">
    <Input.TextArea maxLength={140} placeholder="Did something strange happen?"></Input.TextArea>
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
);

export default PostForm;
