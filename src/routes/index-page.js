import React, { Component } from "react";
import { connect } from "react-redux";
import { downloadPosts } from "../redux/reducer";

import PostCard from "../components/post-card";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  }
});

class IndexPage extends Component {
  render() {
    const { posts, classes } = this.props;

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

              <h2>Click download button</h2>

              <Button
                variant="contained"
                color="primary"
                onClick={this.props.downloadPosts}
              >
                Download
              </Button>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {posts &&
                posts.map(post => <PostCard key={post.id} post={post} />)}
            </Grid>
          </div>
        </main>
      </>
    );
  }
}

export default connect(
  state => ({ posts: state.posts }),
  dispatch => ({
    downloadPosts: () => dispatch(downloadPosts())
  })
)(withRoot(withStyles(styles)(IndexPage)));
