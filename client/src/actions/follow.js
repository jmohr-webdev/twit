import axios from 'axios';

// ************************************* FOLLOW A USER *************************************
export const followUser = (username) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/${username}/follow`);
    console.log(res);
  } catch (error) {}
};

// ************************************* UNFOLLOW A USER *************************************
export const unfollowUser = (username) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/${username}/unfollow`);

    console.log(res);
  } catch (error) {}
};
