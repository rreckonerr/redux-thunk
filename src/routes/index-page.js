import React, { Component } from "react";
import { connect } from "react-redux";
import { downloadPosts } from "../ducks/posts";

import PostCard from "../components/post-card";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  postsTitle: {
    backgroundColor: theme.palette.background.paper
  },
  titleContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class IndexPage extends Component {
  componentDidMount() {
    this.props.downloadPosts();
  }

  render() {
    const { posts, classes, loading } = this.props;

    return (
      <>
        <main className="App">
          <div className={classes.postsTitle}>
            <div className={classes.titleContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Posts
              </Typography>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {loading ? (
              <div style={{ margin: `0 auto` }}>
                <CircularProgress
                  className={classes.progress}
                  size={100}
                  thickness={10}
                />
              </div>
            ) : (
              <Grid container spacing={40}>
                {posts &&
                  posts.map(post => <PostCard key={post.id} post={post} />)}
              </Grid>
            )}
          </div>
        </main>
      </>
    );
  }
}

export default connect(
  state => ({ posts: state.posts, loading: state.loading }),
  dispatch => ({
    downloadPosts: () => dispatch(downloadPosts())
  })
)(withRoot(withStyles(styles)(IndexPage)));
