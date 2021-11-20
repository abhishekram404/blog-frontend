const {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_PROFILE_POST_SUCCESS,
  FETCH_PROFILE_POST_FAILURE,
  CLEAR_ALL,
} = require("redux/constants");

const postReducer = (
  state = { fetchedPosts: [], profilePosts: [], userPosts: [] },
  action
) => {
  switch (action.type) {
    case CLEAR_ALL:
      return { fetchedPosts: [], profilePosts: [], userPosts: [] };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        fetchedPosts: [...state.fetchedPosts, ...action.payload],
      };
    case FETCH_POST_FAILURE:
      return state;
    case FETCH_PROFILE_POST_SUCCESS:
      return {
        ...state,
        profilePosts: [...state.profilePosts, ...action.payload],
      };
    case FETCH_PROFILE_POST_FAILURE:
      return state;
    default:
      return state;
  }
};

export default postReducer;
