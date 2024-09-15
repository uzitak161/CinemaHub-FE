import React from "react";
import MovieComponent from "./MovieComponent";
import UserComponent from "./UserComponent";

const ItemComponent = ({ item, type, currentUser }) => {
  return (
    <>
      {type !== "users" && <MovieComponent movie={item} currentUser={currentUser}/>}
      {type === "users" && <UserComponent user={item} currentUser={currentUser}/>}
    </>
  );
};

export default ItemComponent;
