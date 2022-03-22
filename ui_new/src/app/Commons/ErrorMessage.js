import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";

export const ErrorMessage = ({ errors }) => {
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    for (var props in errors) {
      setErrorList([...errors[props]]);
    }
  }, [errors]);

  return (
    <Message error>
      <Message.List>
        {errorList.map((err, i) => (
          <Message.Item key={i}>{err}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
};
