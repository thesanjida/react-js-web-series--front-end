import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../Hooks/service";
import { MutatingDots } from "react-loader-spinner";
import getToken from "../../services/getToken";
import { toast } from "react-hot-toast";

const VideoEdit = () => {
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [allData, setAllData] = useState({
    id: "",
    videoTitle: "",
    categoryId: "",
    description: "",
    status: "",
    userName: "",
    userId: "",
    uploadDate: "",
  });

  const handelChange = (e) => {
    setAllData({
      ...allData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setAllData({
      ...allData,
      [e.target.name]: value,
    });

    const { data: response } = await service.put(`/video/edit`, allData, {
      headers: { Authorization: getToken() },
    });
    toast(response);
    navigate("/dashboard/manage/videos");
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await service.get(`/video/${id}`, {
          headers: { Authorization: getToken() },
        });
        setVideo(response);
        setAllData({
          id: response.Id,
          videoTitle: response.VideoTitle,
          categoryId: response.CategoryId,
          description: response.Description,
          status: response.Status,
          userName: response.UserName,
          userId: response.UserId,
          uploadDate: response.UploadDate,
        });
        setIsLoaded(true);
        console.log(response);
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
  if (video === null) navigate(`/login`); // null means error, redirect to login
  if (!video)
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
              <div>{"Profile"}</div>
              <div></div>
            </div>
            <Form className="w-100" onSubmit={handleFormSubmit}>
              <div className="d-flex  w-100">
                <div className="w-75 me-15">
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Video Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="videoTitle"
                      defaultValue={
                        video.VideoTitle == null
                          ? "Please Insert Data"
                          : video.VideoTitle
                      }
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Upload By</Form.Label>
                    <Form.Control
                      name="userName"
                      type="text"
                      readOnly
                      value={
                        video.UserName == null
                          ? "Please Insert Data"
                          : video.UserName
                      }
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      defaultValue={
                        video.Status == null
                          ? "Please Insert Data"
                          : video.Status
                      }
                      type="text"
                      name="status"
                      onChange={handelChange}
                    />
                  </div>
                </div>

                <div className=" w-75 ">
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Upload Date</Form.Label>
                    <Form.Control
                      defaultValue={
                        video.UploadDate == null
                          ? "Please Insert Data"
                          : video.UploadDate
                      }
                      type="text"
                      placeholder=""
                      name="uploadDate"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      defaultValue={
                        video.Description == null
                          ? "Please Insert Data"
                          : video.Description
                      }
                      type="text"
                      placeholder=""
                      name="description"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      readOnly
                      name="categoryName"
                      defaultValue={
                        video.CategoryName == null
                          ? "Please Insert Data"
                          : video.CategoryName
                      }
                      type="text"
                      placeholder=""
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Category Id</Form.Label>
                    <Form.Control
                      name="categoryId"
                      type="text"
                      value={
                        video.CategoryId == null
                          ? "Please Insert Data"
                          : video.CategoryId
                      }
                      onChange={handelChange}
                    />
                  </div>
                </div>
              </div>
            </Form>
            <div className="d-flex  justify-content-start">
              <div>
                <Button onClick={handleFormSubmit}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoEdit;
