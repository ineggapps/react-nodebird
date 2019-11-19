import React from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

const PostForm = () => {
  const { imagePaths } = useSelector(state => state.post);
  return (
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
        {imagePaths &&
          imagePaths.map((v, i) => {
            return (
              <div key={v} style={{ display: "inline-block" }}>
                <img src={"https://localhost:3065/" + v} style={{ width: "200px" }} alt={v} />
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export default PostForm;
