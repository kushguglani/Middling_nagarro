import React from 'react'
import { daysAgo } from '../../services/helperFunction'

import { Comment, Icon } from 'semantic-ui-react'

export default function UserComment(props) {
    const { author, body, createdAt, id } = props.data;

    return (
        <Comment>
            <Comment.Avatar src={author.image} />
            <Comment.Content>
                <Comment.Author as='a'>{author.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{daysAgo(createdAt)}</div>
                </Comment.Metadata>
                {author.username === props.loginUsername ? <Comment.Metadata>
                    {/* <div>Delete</div> */}
                    <Icon name="delete" size='big' onClick={() => props.deleteCommentToArticle(id)} />
                </Comment.Metadata> : ""}
                {/* <Comment.Author as='a' align="right">Delete</Comment.Author> */}
                <Comment.Text>{body}</Comment.Text>
                <Comment.Actions>
                    {/* <Comment.Action>Reply</Comment.Action> */}
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
}
