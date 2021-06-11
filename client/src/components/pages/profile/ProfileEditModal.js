import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, updateAvatar } from '../../../actions/profile';
import { toggleProfileModal } from '../../../actions/modal';

const initialState = {
  bio: '',
  location: '',
  avatar: '',
};

const EditModal = ({
  profile: { profile, loading },
  toggleProfileModal,
  updateProfile,
  updateAvatar,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [tempAvatar, setTempAvatar] = useState('');
  const [changedAvatar, setChangedAvatar] = useState(false);

  useEffect(() => {
    const profileData = { ...initialState };

    if (!loading && profile) {
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
      setTempAvatar(`/img/avatars/${profileData.avatar}`);
    }
  }, [profile, loading, setTempAvatar]);

  const { bio, location } = formData;

  const handleClose = () => {
    setFormData('');
    toggleProfileModal();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setTempAvatar(reader.result);
    };

    setFormData({ ...formData, avatar: e.target.files[0] });
    setChangedAvatar(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (changedAvatar) {
      updateAvatar(profile.username, formData.avatar);
      setFormData({ ...formData, avatar: '' });
    }
    updateProfile(profile.username, formData);
    handleClose();
  };

  return (
    <div className="modal-container" id="modal-container">
      <div className="modal edit">
        <h1 className="modal-title">Edit Profile</h1>
        <i
          className="fas fa-times-circle"
          onClick={() => {
            handleClose();
          }}
        ></i>

        {/* <form encType="multipart/form-data" METHOD="PUT"> */}

        <form
          className="profile-form"
          encType="multipart/form-data"
          method="PUT"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group">
            <div className="edit-avatar-container">
              <label htmlFor="avatar">
                <input
                  className="upload-image"
                  name="avatar"
                  id="avatar"
                  type="file"
                  onChange={(e) => handleImage(e)}
                />
                <img
                  src={tempAvatar}
                  alt={`${profile.username}-avatar`}
                  className="edit-profile-avatar"
                />
              </label>
              <span></span>
            </div>
          </div>
          {/* </form> */}
          {/* 
        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile(profile.username, formData);
            handleClose();
          }}
        > */}
          <div className="form-group">
            <textarea
              type="text"
              name="bio"
              value={bio}
              placeholder={profile.bio ? profile.bio : 'Bio'}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={location}
              placeholder={profile.location ? profile.location : 'Location'}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="button" className="btn cancel" onClick={handleClose}>
              Cancel
            </button>
            <input type="submit" className="btn save" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  profile: PropTypes.object.isRequired,
  toggleProfileModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  toggleProfileModal,
  updateProfile,
  updateAvatar,
})(EditModal);
