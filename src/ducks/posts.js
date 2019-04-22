import { appName } from "../config";

export const moduleName = `posts`;

const defaultStore = {
  posts: [],
  post: {},
  error: null,
  loading: false
};

const prefix = `${appName}/${moduleName}`;

const DOWNLOAD_POSTS_START = `${prefix}/DOWNLOAD_POSTS_START`;
const DOWNLOAD_POSTS_SUCCESS = `${prefix}/DOWNLOAD_POSTS_SUCCESS`;
const DOWNLOAD_POSTS_ERROR = `${prefix}/DOWNLOAD_POSTS_ERROR`;

export default (state = defaultStore, action) => {
  const { payload, type } = action;

  const images = [
    "https://oceana.org/sites/default/files/styles/large_1000x643/public/seaturtlesandreptiles.jpg",
    "https://img-aws.ehowcdn.com/750x428p/photos.demandstudios.com/getty/article/152/112/146907008.jpg",
    "https://assets.answersingenesis.org/img/articles/marvels-of-creation/sea-otter.jpg",
    "https://oceana.org/sites/default/files/styles/large_1000x643/public/marinemammals.jpg"
  ];

  switch (type) {
    case DOWNLOAD_POSTS_START:
      return {
        ...state,
        loading: true
      };
    case DOWNLOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload.posts.map(post => ({
          ...post,
          img: images[Math.floor(Math.random() * images.length)]
        })),
        loading: false
      };
    case DOWNLOAD_POSTS_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      };
    case DOWNLOAD_POST_START:
      return {
        ...state,
        loading: true
      };
    case DOWNLOAD_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...payload.post,
          img: images[Math.floor(Math.random() * images.length)]
        },
        loading: false
      };
    case DOWNLOAD_POST_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      };
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

const DOWNLOAD_POST_START = "DOWNLOAD_POST_START";
const DOWNLOAD_POST_ERROR = "DOWNLOAD_POST_ERROR";
const DOWNLOAD_POST_SUCCESS = "DOWNLOAD_POST_SUCCESS";

export const downloadPost = (id = "") => dispatch => {
  if (!id) return dispatch(downloadPostError(new Error("No id provided.")));

  dispatch(downloadPostStart());

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      dispatch(downloadPostSuccess(post));
    })
    .catch(err => {
      dispatch(downloadPostError(err.message || err));
    });
};

const downloadPostStart = () => {
  return {
    type: DOWNLOAD_POST_START
  };
};

const downloadPostSuccess = post => {
  return {
    type: DOWNLOAD_POST_SUCCESS,
    payload: {
      post
    }
  };
};

const downloadPostError = error => {
  return {
    type: DOWNLOAD_POST_ERROR,
    payload: {
      error: error.message || error
    }
  };
};
