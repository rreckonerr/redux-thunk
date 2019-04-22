import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import PostPage from "../routes/post-page";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

export class PostCard extends Component {
  render() {
    const { post, classes } = this.props;
    const { userId, id, title, body, img } = post;

    const MyLink = props => <Link to={`/posts/${id}`} {...props} />;

    return (
      <Grid item sm={6} md={4} lg={3} style={{ margin: "20px" }}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={img}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography>{body}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" component={MyLink}>
              View
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)(PostCard));
