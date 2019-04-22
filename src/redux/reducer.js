const defaultStore = {
  posts: [],
  error: null
};

const DOWNLOAD_POSTS_START = "DOWNLOAD_POSTS_START";
const DOWNLOAD_POSTS_SUCCESS = "DOWNLOAD_POSTS_SUCCESS";
const DOWNLOAD_POSTS_ERROR = "DOWNLOAD_POSTS_ERROR";

export default (state = defaultStore, action) => {
  const { payload, type } = action;

  switch (type) {
    case DOWNLOAD_POSTS_START:
      return {
        ...state
      };
    case DOWNLOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload.posts
      };
    case DOWNLOAD_POSTS_ERROR: {
      return {
        ...state,
        error: payload.error
      };
    }
    default:
      return state;
  }
};

export const downloadPosts = () => dispatch => {
  dispatch(downloadPostsStarted());

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts => {
      dispatch(downloadPostsSuccess(posts.slice(0, 10)));
    })
    .catch(err => {
      console.error("error", err);
      dispatch(downloadPostsError(err.message || err));
    });
};

const downloadPostsStarted = () => {
  return {
    type: DOWNLOAD_POSTS_START
  };
};

const downloadPostsSuccess = posts => {
  return {
    type: DOWNLOAD_POSTS_SUCCESS,
    payload: { posts }
  };
};

const downloadPostsError = error => {
  return {
    type: DOWNLOAD_POSTS_ERROR,
    payload: { error }
  };
};
