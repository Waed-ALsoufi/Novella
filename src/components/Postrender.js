import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Posts from "./Posts";
import IsLoading from "./IsLoading";
import postStyle from "../Style/Posts.module.css";

function Postrender() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const ref = firebase.firestore().collection("AllPosts");
  const [renderpost, setrenderposts] = useState([]);
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
      setrenderposts(all);
    });
  }
  useEffect(() => {
    getPosts();
  }, []);
  const [searchBook, setsearchBook] = useState("");

  function filterByName() {
    let filteredpost = posts.filter((post) => {
      return (
        post.bookName.toLowerCase().includes(searchBook.toLowerCase()) ||
        post.bookLocation.toLowerCase().includes(searchBook.toLowerCase()) ||
        post.bookAuthor.toLowerCase().includes(searchBook.toLowerCase()) ||
        post.bookType.toLowerCase().includes(searchBook.toLowerCase())
      );
    });
    setrenderposts(filteredpost);
  }

  useEffect(() => {
    filterByName();
  }, [searchBook]);
  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={postStyle.BooksList}>
      <div className={postStyle.SearchForm}>
        <input
          type="text"
          placeholder="Search"
          className={postStyle.SearchInput}
          onChange={(e) => {
            setsearchBook(e.target.value);
            console.log(searchBook);
            filterByName(searchBook);
          }}
        />
        <i class="far fa-search"></i>
      </div>

      <div className={postStyle.AllBooks}>
        {renderpost.map((post, index) => (
          <Posts
            key={index}
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
