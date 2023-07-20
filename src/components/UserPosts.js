import React from "react";
import { useNavigate } from "react-router-dom";

function UserPosts() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div>This is user's posts</div>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  )
}

export default UserPosts;