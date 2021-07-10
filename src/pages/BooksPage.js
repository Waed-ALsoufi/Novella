import React, { useState, useEffect } from 'react';
import BookCard from '../Components/BookCard';
import Loading from '../Components/Loading';
import postStyle from '../Style/Posts.module.css';
import app from '../Components/firebase';
import { useAuth } from '../Components/Auth';

function BooksPage() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [books, SetBooks] = useState(posts);
  const [searchBook, setsearchBook] = useState('');
  useEffect(() => {
    let active = true;
    setisLoading(true);
    app
      .firestore()
      .collection('AllPosts')
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
          SetBooks(all);
          setisLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function filterByName() {
      const filteredpost = posts.filter(
        (post) =>
          post.bookName.toLowerCase().includes(searchBook.toLowerCase()) ||
          post.bookLocation.toLowerCase().includes(searchBook.toLowerCase()) ||
          post.bookAuthor.toLowerCase().includes(searchBook.toLowerCase()) ||
          post.bookType.toLowerCase().includes(searchBook.toLowerCase())
      );
      SetBooks(filteredpost);
    }
    filterByName();
  }, [searchBook, posts]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={postStyle.BooksPage}>
      <div className={postStyle.SearchForm}>
        <input
          type='text'
          placeholder='Search By Book Name'
          className={postStyle.SearchInput}
          onChange={(e) => {
            setsearchBook(e.target.value);
          }}
        />
        <i className='far fa-search' />
      </div>
      <div className={postStyle.BooksList}>
        {books.map((post, index) => (
          <BookCard
            key={post.id}
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

export default BooksPage;
