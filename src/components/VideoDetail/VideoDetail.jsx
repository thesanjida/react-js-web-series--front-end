import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../Hooks/service";
import getToken from "../../services/getToken";
import "./VideoDetail.css";

const VideoDetail = () => {
  const [video, setVideo] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const handelClick = (id) => {
    navigate(`/video/edit/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await service.get(`/video/${id}`, {
          headers: { Authorization: getToken() },
        });
        setVideo(response);
        setIsLoaded(true);
        console.log("data: ", response);
        console.log("message: ", response.message);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      }
    })();
  }, []);
  if (!isLoaded)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <>
      <div className="video_detail">
        <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="video_detail_box d-flex flex-column align-items-center w-50">
            <div className=" d-flex justify-content-evenly">
              {" "}
              <div>{"Video Detail"}</div>
              <div></div>
            </div>
            <div className="d-flex  w-100">
              <div className="w-75 me-15">
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Video Name</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.VideoTitle == null
                        ? "Please Insert Data"
                        : video.VideoTitle
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Upload By</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.UserName == null
                        ? "Please Insert Data"
                        : video.UserName
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.Status == null ? "Please Insert Data" : video.Status
                    }
                    type=""
                    placeholder=""
                  />
                </div>
              </div>

              <div className=" w-75 ">
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.CategoryName == null
                        ? "Please Insert Data"
                        : video.CategoryName
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Upload Date</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.UploadDate == null
                        ? "Please Insert Data"
                        : video.UploadDate
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      video.Description == null
                        ? "Please Insert Data"
                        : video.Description
                    }
                    type=""
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex  justify-content-start">
              <div>
                <Button onClick={() => handelClick(video.Id)}>Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
