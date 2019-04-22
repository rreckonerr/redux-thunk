import React, { Component } from "react";
import { connect } from "react-redux";
import { downloadPost } from "../ducks/posts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

export class PostPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { downloadPost } = this.props;

    downloadPost(id);
  }

  render() {
    const { post } = this.props;
    const { title, body, img } = post;
    console.log("---post", post);

    const currentDate = new Date();

    return (
      post && (
        <div style={{ margin: "50px" }}>
          <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
            <CardHeader
              title={title}
              subheader={`${currentDate.getDate()}/${currentDate.getMonth() +
                1}/${currentDate.getYear()}`}
            />
            <CardMedia
              style={{ height: "0", paddingTop: "56.25%" }}
              image={img}
            />
            <CardContent>{body}</CardContent>
          </Card>
        </div>
      )
    );
  }
}

export default connect(
  state => ({
    post: state.post
  }),
  dispatch => ({
    downloadPost: id => dispatch(downloadPost(id))
  })
)(PostPage);
