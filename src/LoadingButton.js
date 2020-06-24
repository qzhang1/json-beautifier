import React from "react";
import { CircularProgress, Button } from "@material-ui/core";

export default function LoadingButton(props) {
  const { onClick, loading, btnText, color } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={loading}
      color={color}
    >
      {loading && <CircularProgress size={14} />}
      {!loading && btnText}
    </Button>
  );
}
