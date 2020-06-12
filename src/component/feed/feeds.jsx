import React from 'react'
import { Feed, Icon, Label } from 'semantic-ui-react'

import { daysAgo } from '../../services/helperFunction'
import { Link } from 'react-router-dom'
import { feedPageConsatnt } from '../../utils/feedConstant'

const Feeds = (props) => {
  let feedList;
  const { feeds, userClicked, favoriteArticle } = props;
  const { no_article, read_more, likes } = feedPageConsatnt;
  if (feeds.length > 0) {
    feedList = feeds.map(curr => {
      return (
        <Feed.Event key={curr.slug} className="hr-line">
          <Feed.Label onClick={() => userClicked(`user/${curr.author.username}`)}
            image={curr.author.image} alt={curr.author.username} className="pointer-cursor" />
          <Feed.Content>
            <Feed.Summary>
              <span className="pointer-cursor" onClick={() => userClicked(`user/${curr.author.username}`)}>
                {curr.author.username}
              </span>
              <Feed.Date>{daysAgo(curr.createdAt)}</Feed.Date>
              <Feed.Meta className="feed-like">
                <Feed.Like onClick={() => favoriteArticle(curr.slug, curr.favorited)}>
                  <Icon name='like' color={curr.favorited ? "red" : 'grey'} /> {curr.favoritesCount} {likes}
                </Feed.Like>
              </Feed.Meta>
            </Feed.Summary>
            <h3 className="feedTitle">{curr.title}</h3>
            <Feed.Extra text className="desc-text">
              {curr.description}
            </Feed.Extra>
            {curr.tagList.length > 0 && curr.tagList.map((curr, i) =>
              <Label key={i} className="tag-cursor" >{curr}</Label>
            )}
            {curr.tagList.length > 0 && <br />}
            <Link to={`articles/${curr.slug}`}>{read_more}</Link>
          </Feed.Content>
        </Feed.Event>
      )
    }
    )
  }
  else {
    feedList = <p>{no_article}</p>
  }
  return (
    <Feed>
      {feedList}
    </Feed>
  )
}
export default Feeds
