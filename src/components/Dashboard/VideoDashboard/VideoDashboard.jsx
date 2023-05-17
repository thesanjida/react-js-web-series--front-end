import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import getToken from "../../../services/getToken";
import { MutatingDots } from "react-loader-spinner";
import service from "../../../Hooks/service";
import axios from "axios";
import VideoTable from "../../VideoTable/VideoTable";
import { toast } from "react-hot-toast";

const VideoDashboard = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reloader, setReloader] = useState(0);
  let navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("getToken: ", getToken());
    axios
      .get("http://localhost:44314/api/videos", {
        headers: { Authorization: getToken() },
      })
      .then((resp) => {
        console.log(resp.data);
        setAllVideos(() => resp.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/page-not-found-404");
        }
        console.log("message: ", err.response.status);
        console.log(err);
      });
  }, [reloader]);

  const handleDeleteVideo = async (id) => {
    console.log(id);
    const { data: response } = await service.delete(`video/remove/${id}`, {
      headers: { Authorization: getToken() },
    });
    console.log(response);
    setReloader((v) => v + 1);
    toast(response);
  };

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
  if (user === null) navigate(`/login`); // null means error, redirect to login
  if (!user) return <h1>Loading....</h1>;
  return (
    <>
      <Container>
        <Row>
          <div className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Video Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Upload By.</th>
                  <th>Upload Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allVideos.map((video, index) => (
                  <tr key={index}>
                    <VideoTable
                      count={index}
                      videoTable={video}
                      handleDeleteVideo={handleDeleteVideo}
                    ></VideoTable>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default VideoDashboard;
