import { useState, useContext } from "react";
import AccountContext from "../../contexts/AccountContext";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { ACCOUNT_ENDPOINT } from "../../config/constants";
import useToken from "../../hooks/useToken";
import { Avatar } from "primereact/avatar";
import ProfileAvatar from "./ProfileAvatar";

function ProfilePictureUpload() {
  const { account, setAccount } = useContext(AccountContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null); // Add a state to store the selected file
  const [showModal, setShowModal] = useState(false);

  // if these are true then saving and removing of images will be handled
  // I will reset these to false after
  // -> modal is closed
  // -> save button is clicked
  // -> cancel button is clicked
  // -> modal is opened
  const [remove, setRemove] = useState(false);
  const [save, setSave] = useState(false);

  const { token } = useToken();
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;

  // user uploads file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the selected file in the state

    // Read the selected file and update the img element's src attribute
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile); // Pass the selectedFile instead of file

    setSave(true);
  };

  const handleSave = async () => {
    console.log("Save profile picture");

    if (remove === true) {
      // send axios patch request to with profile_picture = null
      try {
        const response = await axios.patch(ACCOUNT_ENDPOINT, {
          profile_picture: null,
        });
        setAccount(response.data);
      } catch (error) {
        console.error("Error removing profile picture:", error);
      }
      setFile(null);
      resetRemoveSave();
      setShowModal(false);
    }

    if (save === true) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      // Send a PATCH request to ACCOUNT_ENDPOINT with profile_photo
      try {
        const response = await axios.patch(ACCOUNT_ENDPOINT, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAccount(response.data);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }

    resetRemoveSave();
    setShowModal(false);
  };

  const handleRemove = () => {
    setImagePreview(null);
    setRemove(true);
  };

  const resetRemoveSave = () => {
    setRemove(false);
    setSave(false);
  };

  return (
    <>
      <label className="form-label">Profile Photo</label>
      <div>
        <label className="me-4" htmlFor="upload-image">
          <ProfileAvatar account={account} />
        </label>
      </div>
      <label
        className="link-primary-c"
        id="upload-image-label"
        onClick={() => {
          setShowModal(true);
          setImagePreview(account.profile_picture);
          resetRemoveSave();
        }}
      >
        <strong>Click here to change</strong>
      </label>

      {/* MODAL */}

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetRemoveSave();
        }}
      >
        <Modal.Body id="profile-image-upload-modal-body">
          <div id="profile-image-upload-modal-body-title">
            <ProfileAvatar
              account={account}
              customImage={imagePreview}
              custom={true}
              id="modal-upload-image-preview"
            />
            <h5>Profile Photo</h5>
          </div>

          <div className="profile-image-upload-modal-body-button">
            <label class="link-primary-c" htmlFor="upload-image">
              <strong>Upload Photo</strong>
            </label>
            <input
              id="upload-image"
              className="form-control d-none"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="profile-image-upload-modal-body-button profile-image-upload-modal-body-button-end">
            <label
              className="link-danger link-primary-danger-c"
              onClick={() => handleRemove()}
            >
              <strong>Remove Current Photo</strong>
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              resetRemoveSave();
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary-c text-light"
            onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePictureUpload;
