// Waed ALsoufi
import axios from "axios";
// import "../Style/Publish.css";
import firebase from "./firebase";
import "firebase/storage";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Publish(props) {
  const [state, setState] = useState({
    bookName: "",
    bookAuthor: "",
    bookType: "",
    bookLocation: "",
  });
  const [image, setImage] = useState({
    alt: "",
    PhotoUrl: "",
  });
  const [description, setdescription] = useState("");
  const apiUrl = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async (e) => {
    const result = await axios.get(`${apiUrl}?q=${state.bookName}`);
    // Books result
    console.log(result.data.items[0].volumeInfo.description);
    setdescription(result.data.items[0].volumeInfo.description);
  };

  const addNewPost = () => {
    firebase
      .firestore()
      .collection("AllPosts")
      .add({
        bookName: state.bookName,
        bookAuthor: state.bookAuthor,
        bookType: state.bookType,
        details: state.details,
        bookLocation: state.bookLocation,
        src: image.PhotoUrl,
        alt: image.alt || state.bookName,
        description: description,
      });
  };

  const handleImg = (e) => {
    fetchBooks();
    if (e.target.files[0]) {
      setImage({
        alt: e.target.files[0].name,
      });
    }

    var uploadTask = firebase.storage().ref();
    uploadTask
      .child(`/books/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then((snapshot) =>
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          if (downloadURL) {
            setImage({ PhotoUrl: downloadURL });
          }
        })
      );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="contact-box">
        <div className="left"></div>
        <div className="right">
          <h2 className="Title">ADD BOOK</h2>

          <input
            name="bookName"
            type="text"
            className="field"
            placeholder="Book Name"
            onChange={handleInputChange}
          ></input>
          <input
            type="file"
            name="Image"
            accept=".png, .jpg, .jpeg"
            onChange={handleImg}
            className="field"
          />
          <input
            name="bookAuthor"
            type="text"
            className="field"
            placeholder="Book Author"
            onChange={handleInputChange}
          ></input>
          <input
            name="bookType"
            type="text"
            className="field"
            placeholder="Book Type"
            onChange={handleInputChange}
          ></input>
          <input
            name="bookLocation"
            type="text"
            className="field"
            placeholder="Book Location"
            onChange={handleInputChange}
          ></input>

          <textarea
            name="details"
            placeholder="Book Details"
            className="field"
            onChange={handleInputChange}
          ></textarea>

          <Link to="/Posts">
            <button className="btn" onClick={addNewPost}>
              Publish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Publish;
