import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  profile: {},
  editModalOpen: false,
  loading: true,
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: payload.newAvatar,
          smallAvatar: payload.newSmallAvatar,
        },
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
