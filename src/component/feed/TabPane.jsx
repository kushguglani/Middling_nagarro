import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import Feeds from './feeds'
import Spinner from '../loader';


class TabPane extends Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        
        const { feedLoader, feeds, userDetails, activeIndex,
            selectedTag, fetchFeeds, fetchConditionalFeeds, isUserLogin, favoriteArticle } = this.props;
        let header = {}
        if (userDetails.token)
            header = { Authorization: "Token " + userDetails.token };
        return (
            <>
                <Menu pointing>
                    <Menu.Item
                        className={isUserLogin ? "" : "displayNone"}
                        name='author'
                        active={activeIndex === 'author'}
                        onClick={() => fetchConditionalFeeds("author", userDetails.username, 0, header)}
                    >

                        <Icon name='user' />
                        Your Feed
                    </Menu.Item>
                    <Menu.Item
                        name='globalFeed'
                        active={activeIndex === 'globalFeed'}
                        onClick={() => fetchFeeds(0,
                            header)}
                    >
                        <Icon name='users' />
                        Global Feed
                    </Menu.Item>

                    <Menu.Item
                        name='favorited'
                        className={isUserLogin ? "" : "displayNone"}
                        active={activeIndex === 'favorited'}
                        onClick={() => fetchConditionalFeeds(
                            "favorited", userDetails.username, 0,
                            header)}
                    >
                        <Icon name='heart' />

                        Favorited Feeds
                    </Menu.Item>
                    <Menu.Item
                        className={selectedTag === "" ? "displayNone" : ""}
                        name='tag'
                        active={activeIndex === 'tag'}
                        onClick={() => fetchConditionalFeeds("tag", selectedTag, 0,
                            header)}
                    >
                        <Icon name='hashtag' />
                        {selectedTag}
                    </Menu.Item>
                </Menu>
                {feedLoader ?
                    <Spinner text="Fetching Feeds" /> : <Feeds feeds={feeds} favoriteArticle={favoriteArticle} />}
            </>
        )
    }
}

export default TabPane;

