import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoTable = (props) => {
  const {
    Id,
    CategoryId,
    CategoryName,
    Description,
    Status,
    UploadDate,
    UserId,
    UserName,
    VideoPath,
    VideoTitle,
  } = props.videoTable;

  let navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <>
      <td>{1 + props.count}</td>
      <td>{CategoryName}</td>
      <td>{VideoTitle}</td>
      <td>{Description}</td>
      <td>{Status}</td>
      <td>{UserName}</td>
      <td>{UploadDate}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Button className="ms-2 me-1" onClick={() => handelClick(Id)}>
            Detail
          </Button>
          <Button className="ms-1 me-2" onClick={() => handelClick(Id)}>
            Edit
          </Button>
          <Button onClick={() => props.handleDeleteVideo(Id)}>Delete</Button>
        </div>
      </td>
    </>
  );
};

export default VideoTable;
