import React, { useCallback, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

  useEffect(() => {
    setText("");
  }, [postAdded === true]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (!text || !text.trim()) {
        return alert("Content is blank. Write your content.");
      }
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text
        }
      });
    },
    [text]
  ); // 두 번째 인자가 []로 비어있으면 text의 변경내용이 반영되지 않는다.
  const onChangeText = useCallback(e => {
    setText(e.target.value);
  });
  return (
    <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder="How happend something strange?"
        value={text}
        onChange={onChangeText}
      ></Input.TextArea>
      <div>
        <input type="file" multiple hidden></input>
        <Button>Upload Images</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit" loading={isAddingPost}>
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
