import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import Feeds from './feeds'
import Spinner from '../loader';

import { headerTabPane } from '../../utils/feedConstant'

function TabPane(props) {

    const { feedLoader, feeds, userDetails, activeIndex, userClicked, globalFeed,
        selectedTag, fetchFeeds, fetchConditionalFeeds, isUserLogin, favoriteArticle } = props;
    let header = {},username=""
    if (userDetails.token)
        header = { Authorization: "Token " + userDetails.token };
    if (globalFeed && globalFeed.username) {
        username = globalFeed.username
    } else {
        username = userDetails.username
    }
    const onFetchFeeds = (e, { name }) => {
        console.log("00000000000000000000");

        fetchConditionalFeeds(name, username, 0, header)
    }
    const { your_feed, global_feed, favorited_feeds } = headerTabPane;
    console.log(globalFeed);

    return (
        <>
            <Menu pointing>
                <Menu.Item
                    className={isUserLogin || globalFeed ? "" : "displayNone"}
                    name='author'
                    active={activeIndex === 'author'}
                    onClick={onFetchFeeds}
                >

                    <Icon name='user' />
                    {your_feed}
                </Menu.Item>
                <Menu.Item
                    className={!globalFeed ? "" : "displayNone"}
                    name='globalFeed'
                    active={activeIndex === 'globalFeed'}
                    onClick={() => fetchFeeds(0,
                        header)}
                >
                    <Icon name='users' />
                    {global_feed}
                </Menu.Item>

                <Menu.Item
                    name='favorited'
                    className={isUserLogin || globalFeed ? "" : "displayNone"}
                    active={activeIndex === 'favorited'}
                    onClick={onFetchFeeds}
                >
                    <Icon name='heart' />

                    {favorited_feeds}
                </Menu.Item>
                <Menu.Item
                    className={selectedTag === "" ? "displayNone" : ""}
                    name='tag'
                    active={activeIndex === 'tag'}
                    onClick={onFetchFeeds}
                >
                    <Icon name='hashtag' />
                    {selectedTag}
                </Menu.Item>
            </Menu>
            {feedLoader ?
                <Spinner text="Fetching Feeds" /> : <Feeds userClicked={userClicked} feeds={feeds} favoriteArticle={favoriteArticle} />}
        </>
    )

}

export default TabPane;

