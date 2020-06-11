import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
    fetchFeeds, fetchTags,
    fetchConditionalFeeds, createArticle,
    favoriteArticle
} from "../redux/action/feed";
import { Grid, Pagination } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom'
import TabPane from '../component/feed/TabPane'
import { TagList } from '../component/feed/tag'

class Home extends Component {
    state = { activeItem: 'home', activePage: 1, }

    componentDidMount() {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        this.props.fetchFeeds(
            (this.state.activePage - 1) * 20,
            header
        );
        this.props.fetchTags();
        this.setState({ activePage: 1 })
    }
    componentDidUpdate() {

        if (this.props.loginPage) this.props.history.push(`/login`)
    }
    handlePaginationChange = (e, { activePage }) => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        const { activeTab, selectedTag, userDetails } = this.props;
        this.setState({ activePage }, () => {
            let offset = (this.state.activePage - 1) * 20;
            switch (activeTab) {
                case "globalFeed":
                    this.props.fetchFeeds(offset, header);
                    break;

                case "tag":
                    this.props.fetchConditionalFeeds("tag", selectedTag, offset,
                        header)
                    break;

                case "author":
                    this.props.fetchConditionalFeeds("author", userDetails.username, offset,
                        header)
                    break;

                case "favorited":
                    this.props.fetchConditionalFeeds("favorited", userDetails.username, offset,
                        { Authorization: "Token " + userDetails.token });
                    break;

                default:
                    break;
            }
        })
    }
    fetchConditionalFeedsByTag = (tag, curr) => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        this.setState({ activePage: 1 })
        this.props.fetchConditionalFeeds(tag, curr, header);
    }
    favoriteArticleClicked = (slug, fav) => {


        if (!this.props.userDetails.token) {
            this.props.history.push(`/login`)
        }
        else {
            let header = { Authorization: "Token " + this.props.userDetails.token }
            let method = fav === true ? "DELETE" : "POST"
            this.props.favoriteArticle(
                header
                , slug, method)
        }

    }
    userClicked=(to)=>{
        this.props.history.push(to)

    }
    render() {
        const { tags, userFeeds, panes, selectedTag, userDetails, isUserLogin,
            feedLoader, fetchConditionalFeeds, fetchFeeds, activeTab, tagLoader,
            articlesCount, searchValue } = this.props
        return (
            <Grid className="feedContainerGrid">
                <Grid.Column width={11}>
                    <TabPane activeIndex={activeTab} feeds={userFeeds} selectedTag={selectedTag} fetchFeeds={fetchFeeds}
                        panes={panes} feedLoader={feedLoader} fetchConditionalFeeds={fetchConditionalFeeds}
                        userDetails={userDetails} isUserLogin={isUserLogin} userClicked={this.userClicked}
                        favoriteArticle={this.favoriteArticleClicked} />
                    {searchValue === "" ?
                        <Pagination
                            activePage={this.state.activePage}
                            boundaryRange="2"
                            onPageChange={this.handlePaginationChange}
                            size='mini'
                            siblingRange="1"
                            totalPages={Math.ceil(articlesCount / 20)}
                        />
                        : ""}

                </Grid.Column>
                <Grid.Column width={5}>
                    <TagList tags={tags} fetchConditionalFeeds={this.fetchConditionalFeedsByTag} tagLoader={tagLoader} />

                </Grid.Column>
                {/* <Grid.Column width={1}>
                </Grid.Column> */}
            </Grid>


        )
    }
}

function initMapStateToProps(state) {
    return {
        userDetails: state.user.user,
        isUserLogin: state.user.isUserLogin,
        loginPage: state.user.loginPage,
        userFeeds: state.userFeeds.feeds,
        tags: state.userFeeds.tags,
        feedLoader: state.userFeeds.feedLoader,
        tagLoader: state.userFeeds.tagLoader,
        activeTab: state.userFeeds.activeTab,
        selectedTag: state.userFeeds.selectedTag,
        articlesCount: state.userFeeds.articlesCount,
        searchValue: state.userFeeds.searchValue
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchFeeds,
        fetchTags,
        fetchConditionalFeeds,
        createArticle,
        favoriteArticle
    }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(Home));