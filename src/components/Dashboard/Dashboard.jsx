import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { MutatingDots } from "react-loader-spinner";

const Dashboard = () => {
  let navigate = useNavigate();
  const { user } = useAuth();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data: response } = await service.get(`/video/${id}`, {
  //         headers: { Authorization: getToken() },
  //       });
  //       setVideo(response);
  //       setIsLoaded(true);
  //       console.log("data: ", response);
  //       console.log("message: ", response.message);
  //     } catch (err) {
  //       console.log(err);
  //       if (err.response.status == 401) {
  //         navigate("/page-not-found-404");
  //       }
  //     }
  //   })();
  // }, []);
  if (user === undefined)
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

  if (user === null) navigate(`/login`);
  return (
    <>
      <Container>
        <Row>
          <Link to="/users">User Dashboard</Link>
          <div className="m-2"></div>
          <Link to="/dashboard/manage/videos">Video Dashboard</Link>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
