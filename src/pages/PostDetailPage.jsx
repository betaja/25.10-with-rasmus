import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  const params = useParams();
  const url = `https://with-rasmus-default-rtdb.firebaseio.com/posts/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      console.log(postData);
      setPost(postData);
    }

    getPost();
  }, [url]);

  function navigateToUpdate() {
    navigate(`/posts/${params.id}/update`);
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (shouldDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Something went wrong");
      }
    }
  }

  return (
    <section className="page" id="post-page">
      <div className="container">
        <h1>{post.caption}</h1>
        <PostCard post={post} />
        <div className="btns">
          <button className="btn-cancel" onClick={handleDelete}>
            Delete Post
          </button>
          <button onClick={navigateToUpdate}>Update post</button>
        </div>
      </div>
    </section>
  );
}
