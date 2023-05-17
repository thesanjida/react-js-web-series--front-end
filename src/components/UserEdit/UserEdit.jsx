import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../Hooks/service";
import { MutatingDots } from "react-loader-spinner";
import getToken from "../../services/getToken";
import { toast } from "react-hot-toast";

const UserEdit = () => {
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [allData, setAllData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    loginId: "",
    loginTime: "",
    address1: "",
    address2: "",
    accountCreateTime: "",
    dob: "",
    status: "",
    phone: "",
    password: "",
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
    console.log("All Data: ", allData);

    const { data: response } = await service.put(`/user/edit`, allData, {
      headers: { Authorization: getToken() },
    });
    toast(response);

    if (response === "User updated successfully") {
      setTimeout(navigate("/users"), 1000);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await service.get(`/user/${id}`, {
          headers: { Authorization: getToken() },
        });
        setUser(response);
        setAllData({
          id: response.Id,
          name: response.Name,
          email: response.Email,
          password: response.Password,
          role: response.Role,
          loginId: response.LoginId,
          loginTime: response.LoginTime,
          address1: response.Address1,
          address2: response.Address2,
          accountCreateTime: response.AccountCreateTime,
          dob: response.DOB,
          status: response.Status,
          phone: response.Phone,
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
      <div className="user_detail">
        <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="user_detail_box d-flex flex-column align-items-center w-50">
            <div className=" d-flex justify-content-evenly">
              {" "}
              <div>{"Profile"}</div>
              <div></div>
            </div>
            <Form className="w-100" onSubmit={handleFormSubmit}>
              <div className="d-flex  w-100">
                <div className="w-75 me-15">
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      defaultValue={user.Name}
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      defaultValue={user.Email}
                      type="email"
                      name="email"
                      placeholder=""
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Present Address</Form.Label>
                    <Form.Control
                      defaultValue={user.Address1}
                      type="text"
                      name="address1"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Date of Birth</Form.Label>

                    <Form.Control
                      defaultValue={user.DOB}
                      type="text"
                      placeholder=""
                      name="dob"
                      onChange={handelChange}
                    />
                  </div>
                </div>

                <div className=" w-75 ">
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      defaultValue={user.Role}
                      type="text"
                      placeholder=""
                      name="role"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      defaultValue={user.Phone}
                      type="text"
                      placeholder=""
                      name="phone"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Permanent Address</Form.Label>
                    <Form.Control
                      defaultValue={user.Address2}
                      type="text"
                      placeholder=""
                      name="address2"
                      onChange={handelChange}
                    />
                  </div>
                  <div className="pt-2 pb-2 ps-2 pe-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      defaultValue={user.Password}
                      type="text"
                      placeholder=""
                      name="password"
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

export default UserEdit;
