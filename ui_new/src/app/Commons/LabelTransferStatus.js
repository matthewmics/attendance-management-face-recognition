import React from "react";
import { Label } from "semantic-ui-react";

export const LabelTransferStatus = ({ status }) => {

  if (status === "rejected") return <Label size='tiny' color="red">{status}</Label>;
  if (status === "in progress") return <Label size='tiny' color="yellow">{status}</Label>;
  if (status === "completed") return <Label size='tiny' color="green">{status}</Label>;

  return <Label size='tiny' color='blue'>{status}</Label>;
};
