import axios from "axios";
import React, { useEffect, useState } from "react";
import getToken from "../services/getToken";

const useAuth = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    axios
      .get(`http://localhost:44314/api/get/current/user`, {
        headers: { Authorization: getToken() },
      })
      .then((res) => res.data)
      .then(setUser)
      .catch((error) => {
        setUser(null);
      });
  }, []);
  return { user };
};

export default useAuth;
