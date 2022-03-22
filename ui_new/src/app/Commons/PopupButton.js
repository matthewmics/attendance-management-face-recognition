import React from "react";
import { Button, Popup } from "semantic-ui-react";

export const PopupButton = ({
  content,
  iconName,
  onClick,
  color = "teal",
  disabled = false,
}) => {
  return (
    <Popup
      content={content}
      trigger={
        <Button
          disabled={disabled}
          color={color}
          icon={iconName}
          size="mini"
          onClick={() => {
            onClick();
          }}
        />
      }
    />
  );
};
