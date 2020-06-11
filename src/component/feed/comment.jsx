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
                    <Icon name="delete" size='big' onClick={() => props.deleteCommentToArticle(id)} />
                </Comment.Metadata> : ""}
                <Comment.Text>{body}</Comment.Text>
                <Comment.Actions>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
}
