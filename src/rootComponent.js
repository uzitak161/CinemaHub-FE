import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as userClient from "./MongoDBClients/usersClient";
import { setCurrentUser } from "./Login/reducer";

function RootComponent({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchCurrentUser = async () => {
    try {
      const currentUser = await userClient.account();
      dispatch(setCurrentUser(currentUser));
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <div>{!loading && children}</div>;
}

export default RootComponent;
