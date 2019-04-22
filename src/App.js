import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { downloadPosts } from "./redux/reducer";
import Post from "./redux/components/post";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import Button from "@material-ui/core/Button";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },
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

class App extends Component {
  render() {
    const { posts, classes } = this.props;

    console.log(this.props);

    return (
      <>
        <DenseAppBar {...this.props} />
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
                posts.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    viewPost={() => {
                      console.log("--whatsup");
                    }}
                    editPost={() => {
                      console.log("--whatsup");
                    }}
                  />
                ))}
            </Grid>
          </div>
        </main>
      </>
    );
  }
}

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Demo
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({ posts: state.posts }),
  dispatch => ({
    downloadPosts: () => dispatch(downloadPosts())
  })
)(withRoot(withStyles(styles)(App)));
