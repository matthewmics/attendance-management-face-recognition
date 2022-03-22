import React from "react";
import { Label } from "semantic-ui-react";

export const LabelRepairStatus = ({ status }) => {
  if (status === "rejected" || status === "disposed")
    return (
      <Label size="tiny" color="red">
        {status}
      </Label>
    );
  if (status === "job order created")
    return (
      <Label size="tiny" color="yellow">
        {status}
      </Label>
    );
  if (status === "completed" || status === "repaired" || status === "replaced" || status === "PO created")
    return (
      <Label size="tiny" color="green">
        {status}
      </Label>
    );

  return (
    <Label size="tiny" color="blue">
      {status}
    </Label>
  );
};
