'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = (request) => {

    console.log(request);

    const searchParams = useSearchParams();  
    const profileName = searchParams.get('name'); 
    const prodileId = request.params.id;

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${prodileId}/posts`);
        const data = await response.json();
    
        setPosts(data);
      };
    
      useEffect(() => {
        if(prodileId) fetchPosts();
      }, []);

  return (
    <Profile
        name = {`${profileName}'s`}
        desc = {`Welcome to ${profileName}'s profile page! `}
        data = {posts}
        handleEdit = {()=>{}}
        handleDelete = {()=>{}}
    />
    // <div>Its Loading for {request.params.id} and his name is {request.searchParams.name}</div>
    // <div>Its Loading for {request.params.id} and his name is {profileName}</div>

  )
}

export default MyProfile