import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import {
    Segment, Container, Comment,
    Icon, Label, Form, Button, Header, Grid
} from 'semantic-ui-react'

import UserComment from "../component/feed/comment";
import { daysAgo } from '../services/helperFunction'
import {
    fetchArticleBySlag,
    fetchCommnetsBySlag,
    addCommentToArticle,
    deleteCommentToArticle,
    favoriteArticleFeedPage,
    followUser,
    fetchUser
} from "../redux/action/feed";
import Spinner from '../component/loader'
import { feedPageConstant } from '../utils/feedConstant'


export class FeedPage extends Component {
    state = { article: {}, comments: [], user: {}, body: "", disabled: true }

    componentDidMount() {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        fetchArticleBySlag(this.props.location.pathname, header).then(res => {
            this.setState({
                article: res.data.article
            }, () => {
                fetchUser(header, this.state.article.author.username).then(res => {


                    this.setState({
                        user: res.data.profile
                    })
                })
                    .catch(err => {
                        this.props.history.push("/")
                        console.log("rdtyoipiuytryuiopliujh");
                        console.log(err);
                        console.log(err.response);

                    })
            })
        })
        fetchCommnetsBySlag(this.props.location.pathname + "/comments")
            .then(res => {
                this.setState({
                    comments: res.data.comments
                })
            })
            .catch(err => {
                this.props.history.push("/")
                console.log("rdtyoipiuytryuiopliujh");
                console.log(err);
                console.log(err.response);

            })


    }
    handleInputChnage = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const { body } = this.state;
            if (body !== "") {
                this.setState({
                    disabled: false
                })

            } else {
                this.setState({
                    disabled: true
                })
            }
        })

    }
    addComments = () => {
        const { body, comments, user } = this.state;
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        addCommentToArticle(this.props.location.pathname + "/comments",
            {
                comment: {
                    body
                }
            },
            header
        ).then(res => {

            this.setState({
                comments: [res.data.comment, ...comments],
                body: "",
                disabled: true
            })

        })
            .catch(err => {


            })
    }
    deleteComment = (id) => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
        }
        deleteCommentToArticle(
            this.props.location.pathname.substring(1) + "/comments",
            id,
            header
        ).then(res => {
            fetchCommnetsBySlag(this.props.location.pathname + "/comments")
                .then(res => {


                    this.setState({
                        comments: res.data.comments
                    })
                })
        })
    }
    followUser = () => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
            let user = this.state.article.author.username;
            let method = this.state.user.following ? "DELETE" : "POST"
            followUser(header, user, method).then(res => {

                this.setState({
                    user: res.data.profile
                })

            })
                .catch(err => {

                    const errorCode = err.response;

                    const errorList = []
                    for (const error in errorCode) {
                        errorList.push(`${error} ${errorCode[error]}`)
                    }
                    return errorList
                    // dispatch(errorOnUpdatingUser(errorList))
                })
        } else {


        }
    }
    likeArticle = () => {
        let header = {};
        if (this.props.userDetails.token) {
            header = { Authorization: "Token " + this.props.userDetails.token }
            let slug = this.state.article.slug;
            let method = this.state.article.author.following ? "DELETE" : "POST"
            favoriteArticleFeedPage(header, slug, method).then(res => {

                this.setState({
                    article: res.data.article
                })
            })
                .catch(err => {

                    const errorCode = err.response;

                    const errorList = []
                    for (const error in errorCode) {
                        errorList.push(`${error} ${errorCode[error]}`)
                    }
                    return errorList
                    // dispatch(errorOnUpdatingUser(errorList))
                })
        } else {


        }
    }
    render() {


        const { articleConstant,
            follow,
            by,
            comments,
            signin,
            signup,
            toAdd } = feedPageConstant;
        const { article, user } = this.state;

        if (!article || Object.keys(article).length < 1) {
            return <Spinner text="Fetching article" />
        }
        return (
            <div>
                <Header
                    as='h1'
                    textAlign='center'
                    block
                >
                    {article.title}
                    <Header.Subheader>
                        {article.body}
                    </Header.Subheader>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Button as='div' labelPosition='right' onClick={this.likeArticle}>
                                    <Button color={article.favorited ? "red" : "grey"}>
                                        <Icon name='heart' />
                                        {articleConstant}
                                    </Button>
                                    <Label as='a' basic color={article.favorited ? "red" : "grey"} pointing='left'>
                                        {article.favoritesCount}
                                    </Label>
                                </Button>
                                <Button as='div' labelPosition='right' onClick={this.followUser}>
                                    <Button basic color={user.following ? "green" : "blue"}>
                                        <Icon name='add user' />
                                        {user.following ? "UnFollow" : "Follow"}
                                    </Button>
                                    <Label as='a' basic color={user.following ? "green" : "blue"} pointing='left'>
                                        {article.author.username}
                                    </Label>
                                </Button>
                            </Grid.Column>
                            <Grid.Column >
                                <Header.Subheader align='right'>
                                    {by}:<strong> {article.author.username}</strong>
                                </Header.Subheader>
                                <Header.Subheader align='right'>
                                    {daysAgo(article.createdAt)}
                                </Header.Subheader>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Header>
                <Container text>
                    <Segment>{article.description}</Segment>
                    <Comment.Group>
                        <Header as='h3' dividing>
                            {comments}
                        </Header>
                        {this.state.comments.length > 0 ?
                            this.state.comments.map(curr =>
                                <UserComment
                                    key={curr.id}
                                    data={curr}
                                    loginUsername={this.props.userDetails.username}
                                    deleteCommentToArticle={this.deleteComment}
                                // deleteComent = {}
                                />
                            )
                            : "No comments yet"}
                        {this.props.userDetails.token ?
                            <Form reply className="margin-bottom-footer">
                                <Form.TextArea placeholder="Add Comments" rows="3" className="comment-textbox"
                                    name="body" onChange={this.handleInputChnage}
                                    value={this.state.body}
                                />
                                <Button content='Add Reply'
                                    labelPosition='left' icon='edit' primary
                                    onClick={this.addComments}
                                    disabled={this.state.disabled} />
                            </Form> :
                            <>
                                <br />
                                <Link to="/login">{signin} in </Link> or
                                <Link to="/login">{signup} up </Link>
                                {toAdd} add comments on this article.
                            </>
                        }


                    </Comment.Group>
                </Container>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.user.user,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchArticleBySlag
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedPage))
