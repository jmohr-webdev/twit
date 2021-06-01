import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../actions/profile';
import { toggleProfileModal } from '../../../actions/modal';

const initialState = {
  bio: '',
  location: '',
};

const EditModal = ({
  profile: { profile, loading },
  toggleProfileModal,
  updateProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const profileData = { ...initialState };

    if (!loading && profile) {
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [profile, loading]);

  const { bio, location } = formData;

  const handleClose = () => {
    setFormData('');
    toggleProfileModal();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-container" id="modal-container">
      <div className="modal">
        <h1 className="modal-title">Edit Profile</h1>
        <i
          className="fas fa-times-circle"
          onClick={() => {
            handleClose();
          }}
        ></i>
        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile(profile.username, formData);
            handleClose();
          }}
        >
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

export default connect(mapStateToProps, { toggleProfileModal, updateProfile })(
  EditModal
);
