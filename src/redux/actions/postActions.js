const { default: axios } = require("axios");
const {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  INFO,
  FETCH_PROFILE_POST_SUCCESS,
  FETCH_PROFILE_POST_FAILURE,
} = require("redux/constants");

export const fetch_posts = (skip = 0) => {
  return async (dispatch) => {
    const { data } = await axios.get("/post/fetchHomepagePosts?skip=" + skip);

    const { success, details } = await data;

    console.log(success, details);
    switch (success) {
      case true:
        return dispatch({
          type: FETCH_POST_SUCCESS,
          payload: details,
        });
      case false:
        return dispatch({
          type: FETCH_POST_FAILURE,
        });
      default:
        return dispatch({
          type: INFO,
          payload: "Something went wrong while fetching the posts.",
        });
    }
  };
};

export const fetch_profile_post = ({ skip, profile }) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/post/fetchProfilePosts`, {
      params: {
        skip,
        profile,
      },
    });
    const { success, details } = await data;
    console.log(details);
    switch (success) {
      case true:
        return dispatch({
          type: FETCH_PROFILE_POST_SUCCESS,
          payload: details,
        });
      case false:
        return dispatch({
          type: FETCH_PROFILE_POST_FAILURE,
        });
      default:
        return dispatch({
          type: INFO,
          payload: "Something went wrong while fetching the posts.",
        });
    }
  };
};
