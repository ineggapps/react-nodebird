import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Card, Icon, Button, Avatar, Input, Form, List, Comment } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      if (!me) {
        return alert("You can't leave comments because you aren't signed in.");
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id
        }
      });
    },
    [me && me.id]
  );

  useEffect(() => {
    setCommentText("");
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  });

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={
            <Link href={`/user/${post.User.id}`}>
              <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={post.User.nickname}
          description={
            <div>
              {/*
                "#구독 #좋아요 눌러주세요 #유튜브"를 다음의 정규표현식으로 split하면?
                /#[^\s]+/g: (4)["", " ", " 눌러주세요 ", ""]
                /(#[^\s]+)/g: (7)["","#구독","#좋아요"," 눌러주세요 ", "#유튜브",""]
                */}
              {post.content.split(/(#[^\s]+)/g).map(v => {
                if (v.match(/(#[^\s]+)/)) {
                  return (
                    <Link href={`/hashtag/${v.slice(1)}`} key={v}>
                      <a>{v}</a>
                    </Link>
                  );
                }
                return v;
              })}
            </div>
          }
        />
      </Card>
      {commentFormOpened && (
        <Form onSubmit={onSubmitComment}>
          <Form.Item>
            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isAddingComment}>
            Commit
          </Button>
          <List
            header={`${post.Comments ? post.Comments.length : 0} comments`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${post.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={item.createdAt.toString()}
                />
              </li>
            )}
          />
        </Form>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object
  })
};

export default PostCard;
