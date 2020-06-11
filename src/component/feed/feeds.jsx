import React from 'react'
import { Feed, Icon, Label } from 'semantic-ui-react'

import { daysAgo } from '../../services/helperFunction'
import {Link} from 'react-router-dom'

const Feeds = (props) => {
  let feedList;
  if (props.feeds.length > 0) {
    feedList = props.feeds.map(curr => {
      return (
        <Feed.Event key={curr.slug} className="hr-line">
          <Feed.Label image={curr.author.image} alt={curr.author.username} />
          <Feed.Content>
            <Feed.Summary>
              {curr.author.username}
              <Feed.Date>{daysAgo(curr.createdAt)}</Feed.Date>
              <Feed.Meta className="feed-like">
                <Feed.Like onClick={() => props.favoriteArticle(curr.slug,curr.favorited)}>
                  <Icon name='like' color={curr.favorited?"red":'grey'}/> {curr.favoritesCount} Likes
              </Feed.Like>
              </Feed.Meta>
            </Feed.Summary>
            <h3 className="feedTitle">{curr.title}</h3>
            <Feed.Extra text className="desc-text">
              {curr.description}
            </Feed.Extra>
            {curr.tagList.length>0 && curr.tagList.map((curr, i) =>
              <Label key={i} className="tag-cursor" >{curr}</Label>
            )}
             {curr.tagList.length>0 && <br/>}
            <Link to={`articles/${curr.slug}`}>Read more ...</Link>
          </Feed.Content>
        </Feed.Event>
      )
    }
    )
  }
  else {
    feedList = <p>No articles are here... yet.</p>
  }
  return (
    <Feed>
      {feedList}
    </Feed>
  )
}
export default Feeds
