import React, { useState, useEffect } from "react";
import { AiFillFilter } from "react-icons/ai";
import firebase from "./firebase";
import Posts from "./Posts";
import IsLoading from "./IsLoading";
function Postrender() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const ref = firebase.firestore().collection("AllPosts");
  const [showMe, setShowMe] = useState(false);

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
  const [searchBookName, setsearchBookName] = useState("");
  const [searchBookLocation, setsearchBookLocation] = useState("");
  const [searchbookAuthor, setsearchbookAuthor] = useState("");
  const [searchbookType, setsearchbookType] = useState("");
  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <div className="BooksList">
      <div className="filter">
        <button className="filterButton" onClick={() => setShowMe(!showMe)}>
          {" "}
          <AiFillFilter />
          Filter
        </button>

        {showMe ? (
          <div className="SearchForm ">
            <input
              type="text"
              placeholder="Book Name"
              className="SearchInput"
              onChange={(e) => {
                setsearchBookName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Book Location"
              className="SearchInput"
              onChange={(e) => {
                setsearchBookLocation(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Book Author"
              className="SearchInput"
              onChange={(e) => {
                setsearchbookAuthor(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Book Type"
              className="SearchInput"
              onChange={(e) => {
                setsearchbookType(e.target.value);
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="AllBooks">
        {posts
          .filter((post) => {
            if (
              searchBookName === "" &&
              searchBookLocation === "" &&
              searchbookAuthor === "" &&
              searchbookType === ""
            ) {
              return post;
            } else if (
              searchBookName !== "" &&
              post.bookName.toLowerCase().includes(searchBookName.toLowerCase())
            ) {
              return post;
            } else if (
              searchBookLocation !== "" &&
              post.bookLocation
                .toLowerCase()
                .includes(searchBookLocation.toLowerCase())
            ) {
              return post;
            } else if (
              searchbookAuthor !== "" &&
              post.bookAuthor
                .toLowerCase()
                .includes(searchbookAuthor.toLowerCase())
            ) {
              return post;
            } else if (
              searchbookType !== "" &&
              post.bookType.toLowerCase().includes(searchbookType.toLowerCase())
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
