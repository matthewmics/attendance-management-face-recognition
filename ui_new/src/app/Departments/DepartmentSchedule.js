import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Grid,
  Icon,
  Input,
  Label,
} from "semantic-ui-react";
import agent from "../../agent";
import { InputGroupStyleParent } from "../Commons/Styles";
import { localTimeToUTC, utcTimeToLocal } from "../../helpers";

export const DepartmentSchedule = ({ schedule }) => {
  const [formData, setFormData] = useState({
    in: utcTimeToLocal(schedule.in),
    out: utcTimeToLocal(schedule.out),
    rest_day: schedule.rest_day,
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card fluid color="violet">
      <Card.Content>
        <Card.Header style={{ fontSize: "15px", color: "grey" }}>
          {schedule.name.toUpperCase()}

          <Button
            disabled={loading}
            loading={loading}
            circular
            icon
            style={{ position: "absolute", top: "1em", right: "1em" }}
            size="mini"
            color="green"
            onClick={async () => {
              if (!formData.in || !formData.out) {
                toast.error(
                  "You have entered an invalid time. Schedule not Saved",
                  { position: "top-right" }
                );
                return;
              }

              setLoading(true);

              const request = {
                in: localTimeToUTC(formData.in),
                out: localTimeToUTC(formData.out),
                rest_day: formData.rest_day,
              };

              await agent.Schedule.update(schedule.id, request);

              toast.success(`Schedule for ${schedule.name} has been updated`, {
                position: "top-right",
              });
              setLoading(false);
            }}
          >
            <Icon name="save" />
          </Button>
        </Card.Header>
        <Card.Description>
          <Form>
            <Form.Group>
              <Form.Field width={8}>
                <Label size="mini">IN</Label>
                <Form.Input
                  name="in"
                  type="time"
                  placeholder="In"
                  value={formData.in}
                  onChange={handleInput}
                />
              </Form.Field>
              <Form.Field width={8}>
                <Label size="mini">OUT</Label>
                <Form.Input
                  name="out"
                  type="time"
                  placeholder="In"
                  onChange={handleInput}
                  value={formData.out}
                />
              </Form.Field>
            </Form.Group>
            <Checkbox
              label="Rest Day"
              checked={formData.rest_day}
              toggle
              onChange={(e, data) => {
                setFormData({ ...formData, rest_day: data.checked });
              }}
            />
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
