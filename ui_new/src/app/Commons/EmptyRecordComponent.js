import React from "react";
import { Card, Header, Icon } from "semantic-ui-react";

export const EmptyRecordComponent = () => {
  return (
    <Header as="h2" icon>
      <Icon name="cube" />
      Empty
      <Header.Subheader>There are no records to be displayed.</Header.Subheader>
    </Header>
  );
};
