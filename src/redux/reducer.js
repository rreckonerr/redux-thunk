import { combineReducers } from "redux";
import postsReducer, { moduleName as postsModule } from "../ducks/posts";

// export default combineReducers({
//   [postsModule]: postsReducer
// })

export default postsReducer;
