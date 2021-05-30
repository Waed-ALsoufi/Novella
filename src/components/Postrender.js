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
    setisLoading(true);
    app
      .firestore()
      .collection("AllPosts")
      .get()
      .then((item) => {
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
            bookName={post.bookName}
            id={post.id}
            bookAuthor={post.bookAuthor}
            bookType={post.bookType}
            bookLocation={post.bookLocation}
            src={post.src}
            alt={post.alt}
            description={post.description}
            details={post.details}
            publisherId={post.publisherId}
            userEmail={post.userEmail}
            uid={currentUser.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Postrender;
