import React from "react";
import { Avatar } from "primereact/avatar";

const getImage = (account, customImage, custom) => {
  if (custom) {
    return customImage ? customImage : "";
  }

  if (account && account.profile_picture) {
    return account.profile_picture;
  }

  return null;
};

function ProfileAvatar({
  account,
  customImage,
  width = "75px",
  height = "75px",
  custom = false,
}) {
  return (
    <>
      <Avatar
        label={
          account.first_name
            ? account.first_name[0].toUpperCase() +
              account.last_name[0].toUpperCase()
            : account.username[0].toUpperCase()
        }
        size="xlarge"
        shape="circle"
        style={{
          width: width,
          height: height,
        }}
        image={account && getImage(account, customImage, custom)}
      />
    </>
  );
}

export default ProfileAvatar;
