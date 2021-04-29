import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Posts from "./Posts";
import IsLoading from "./IsLoading";
function Postrender() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const ref = firebase.firestore().collection("AllPosts");

  function getPosts() {
    setisLoading(true);
    ref.get().then((item) => {
      const all = [];
      setisLoading(false);
      item.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        all.push(data);
      });
      setPosts(all);
    });
  }
  useEffect(() => {
    getPosts();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <div className="BooksList">
      <div className="SearchForm ">
        <input
          type="text"
          placeholder="Book Name"
          className="SearchInput"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="AllBooks">
        {posts
          .filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (
              post.bookName.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post) => (
            <Posts
              bookName={post.bookName}
              id={post.id}
              bookAuthor={post.bookAuthor}
              bookType={post.bookType}
              bookLocation={post.bookLocation}
              src={post.src}
              alt={post.alt}
              description={post.description}
              details={post.details}
            />
          ))}
      </div>
    </div>
  );
}

export default Postrender;
