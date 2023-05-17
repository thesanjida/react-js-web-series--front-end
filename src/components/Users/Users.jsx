import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import axios from "axios";
import UserTable from "../UserTable/UserTable";
import getToken from "../../services/getToken";
import { useNavigate } from "react-router-dom";
import service from "../../Hooks/service";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Users = () => {
  const [allUsers, setaAllUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reloader, setReloader] = useState(0);
  let navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:44314/api/users", {
        headers: { Authorization: getToken() },
      })
      .then((resp) => {
        setaAllUsers(() => resp.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        toast(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, [reloader]);

  const handleDeleteUser = async (id) => {
    const { data: response } = await service.delete(`user/remove/${id}`, {
      headers: { Authorization: getToken() },
    });
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

  if (user === null) navigate(`/login`);
  if (!user)
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
      <Container>
        <Row>
          <div className="mt-5">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={index}>
                    <UserTable
                      count={index}
                      userTable={user}
                      handleDeleteUser={handleDeleteUser}
                    ></UserTable>
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

export default Users;
