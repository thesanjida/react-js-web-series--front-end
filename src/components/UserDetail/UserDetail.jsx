import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../Hooks/service";
import getToken from "../../services/getToken";
import "./UserDetail.css";

const UserDetail = () => {
  const [user, setUser] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const handelClick = (id) => {
    navigate(`/user/edit/${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await service.get(`/user/${id}`, {
          headers: { Authorization: getToken() },
        });
        setUser(response);
        setIsLoaded(true);
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
      <div className="user_detail">
        <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="user_detail_box d-flex flex-column align-items-center w-50">
            <div className=" d-flex justify-content-evenly">
              {" "}
              <div>{"Profile"}</div>
              <div></div>
            </div>
            <div className="d-flex  w-100">
              <div className="w-75 me-15">
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    readOnly
                    value={user.Name == null ? "Please Insert Data" : user.Name}
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      user.Email == null ? "Please Insert Data" : user.Email
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Present Address</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      user.Address1 == null
                        ? "Please Insert Data"
                        : user.Address1
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    readOnly
                    value={user.DOB == null ? "Please Insert Data" : user.DOB}
                    type=""
                    placeholder=""
                  />
                </div>
              </div>

              <div className=" w-75 ">
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    readOnly
                    value={user.Role == null ? "Please Insert Data" : user.Role}
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      user.Phone == null ? "Please Insert Data" : user.Phone
                    }
                    type=""
                    placeholder=""
                  />
                </div>
                <div className="pt-2 pb-2 ps-2 pe-2">
                  <Form.Label>Permanent Address</Form.Label>
                  <Form.Control
                    readOnly
                    value={
                      user.Address2 == null
                        ? "Please Insert Data"
                        : user.Address2
                    }
                    type=""
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex  justify-content-start">
              <div>
                <Button onClick={() => handelClick(user.Id)}>Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
