import React, { Component } from "react";
import { connect } from "react-redux";
import { downloadPost } from "../redux/reducer";

export class PostPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { downloadPost } = this.props;

    downloadPost(id);
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        <p>{post && post.body}</p>
      </div>
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
