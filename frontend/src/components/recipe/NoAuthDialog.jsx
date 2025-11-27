import { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";

function NoAuthDialog({ showDialog, setShowDialog, action }) {
  const navigate = useNavigate();

  return (
    <ConfirmDialog
      header="Login Required"
      message={`You need to be logged in to ${action}. Would you like to log in?`}
      visible={showDialog}
      onHide={() => setShowDialog(false)}
      accept={() => navigate("/login")}
      reject={() => setShowDialog(false)}
      acceptLabel="Yes"
      rejectLabel="No"
      className="p-dialog--custom"
    />
  );
}

export default NoAuthDialog;
