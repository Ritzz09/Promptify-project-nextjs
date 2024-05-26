"use client";

import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
//   const { data: session } = useSession();
  const searchParams = useSearchParams();  
  const promptId = searchParams.get('id');  

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(()=>{
    const getPromptDetails = async () => {
        const response = await fetch(`api/prompt/${promptId}`);
        const data = await response.json();
        
        setPost({
            prompt : data.prompt,
            tag : data.tag,
        })
    }

    if(promptId) getPromptDetails();

  },[promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) return alert('Missing prompt id from the database');

    try {
      let newTag = post.tag;
      if (newTag.indexOf('#') === -1) {
        newTag = '#' + newTag;
      }
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: newTag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;

// 'use client';

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import Form from "@components/Form";

// const UpdatePrompt = () => {
//     const router = useRouter();
//     const {data : session} = useSession();

//     const [submitting, setIsSubmitting] = useState(false);
//     const [post, setPost] = useState({
//          prompt: "", 
//          tag: "" 
//         });

//     const UpdatePrompt = async (e) =>{
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await fetch("/api/prompt/new", {
//                 method: "POST",
//                 body: JSON.stringify({
//                   prompt: post.prompt,
//                   userId: session?.user.id,
//                   tag: post.tag,
//                 }),
//               });

//               if (response.ok) {
//                 router.push("/");
//               }
            
//         } catch (error) {
//             console.log(error);
//         }finally{
//             setIsSubmitting(false);
//         }
//     }

//   return (
//     <Form
//         type='Create'
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={UpdatePrompt}
//     />
//   )
// }

// export default UpdatePrompt

