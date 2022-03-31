import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Dropdown,
  Icon,
  Image,
  Input,
  Modal,
  Segment,
  Select,
} from "semantic-ui-react";
import modalActions from "../../actions/modalActions";
import agent from "../../agent";
import { InputGroupStyleParent } from "../Commons/Styles";

export const EmployeeUploadPicture = ({ id, onSave }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const inputFileRef = React.useRef();
  const [objURL, setObjURL] = useState(null);

  useEffect(() => {
    return () => {
      if (objURL) {
        URL.revokeObjectURL(objURL);
      }
    };
  }, [objURL]);
  return (
    <>
      <Modal.Content>
        <div style={InputGroupStyleParent}>
          <span style={{ whiteSpace: "nowrap" }}>Picture</span>
          <Input
            ref={inputFileRef}
            className="width-100"
            name="name"
            type="file"
            accept=".jpg,.jpeg"
            onChange={(e) => {
              if (objURL) URL.revokeObjectURL(objURL);

              const file = e.target.files.length > 0 ? e.target.files[0] : "";

              setObjURL(URL.createObjectURL(file));
            }}
          />
        </div>

        <br></br>
        {objURL && <Image src={objURL} />}
        <br></br>

        {/* ACTIONS */}
        <Button.Group fluid>
          <Button
            loading={loading}
            disabled={loading}
            icon
            labelPosition="left"
            onClick={() => {
              modalActions.closeModal(dispatch);
            }}
          >
            <Icon name="times" />
            CLOSE
          </Button>
          <Button
            color="green"
            loading={loading}
            disabled={loading}
            icon
            labelPosition="left"
            onClick={async () => {
              const files = inputFileRef.current.inputRef.current.files;
              const file = files.length > 0 ? files[0] : "";

              setLoading(true);

              try {
                await agent.Employee.uploadFace(id, file);

                toast.success("Face Picture Uploaded");
                if (onSave) onSave();
                modalActions.closeModal(dispatch);
              } catch (err) {
                modalActions.setErrors(dispatch, err.data.errors);
                setLoading(false);
              }
            }}
          >
            <Icon name="save" />
            SAVE
          </Button>
        </Button.Group>
      </Modal.Content>
    </>
  );
};
