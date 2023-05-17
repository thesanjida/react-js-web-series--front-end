import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserTable = (props) => {
  const { Id, Name, Email, Phone, Status, Role, handleDeleteUser } =
    props.userTable;

  let navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <td>{1 + props.count}</td>
      <td>{Name}</td>
      <td>{Email}</td>
      <td>{Phone}</td>
      <td>{Status}</td>
      <td>{Role}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Button className="ms-2 me-1" onClick={() => handelClick(Id)}>
            Detail
          </Button>
          <Button className="ms-1 me-2" onClick={() => handelClick(Id)}>
            Edit
          </Button>
          <Button onClick={() => props.handleDeleteUser(Id)}>Delete</Button>
        </div>
      </td>
    </>
  );
};

export default UserTable;
