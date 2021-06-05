import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import IsLoading from "./IsLoading";
import postStyle from "../Style/Posts.module.css";
import app from "./firebase";
import { useAuth } from "./Auth";

function Postrender(props) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [renderpost, setrenderposts] = useState(posts);
  const [searchBook, setsearchBook] = useState("");
  useEffect(() => {
    let active = true;
    setisLoading(true);
    app
      .firestore()
      .collection("AllPosts")
      .get()
      .then((item) => {
        const all = [];
        item.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          all.push(data);
        });
        if (active) {
          setPosts(all);
          setrenderposts(all);
          setisLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);
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
            filterByName(searchBook);
          }}
        />
        <i className="far fa-search"></i>
      </div>
      <div className={postStyle.AllBooks}>
        {renderpost.map((post, index) => (
          <Posts
            key={index}
            index={index}
            bookName={post.bookName}
            id={post.id}
            bookAuthor={post.bookAuthor}
            bookType={post.bookType}
            src={post.src}
            alt={post.alt}
            description={post.description}
            publisherId={post.publisherId}
            userEmail={post.userEmail}
            uid={currentUser.uid}
            latitude={post.latitude}
            longitude={post.longitude}
          />
        ))}
      </div>
    </div>
  );
}

export default Postrender;
