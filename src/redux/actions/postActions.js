const { default: axios } = require("axios");
const {
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  INFO,
} = require("redux/constants");

export const fetch_posts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/post/fetchHomepagePosts");

    const { success, details } = await data;

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
