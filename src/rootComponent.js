import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./Login/reducer";
import * as client from "./MongoDBClients/usersClient";

function RootComponent({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log("RootComponent");
  const fetchUser = async () => {
    try {
      const user = await client.account();
      dispatch(setCurrentUser(user));
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
  });
  return <div>{!loading && children}</div>;
}

export default RootComponent;
