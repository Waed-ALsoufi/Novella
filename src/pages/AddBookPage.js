/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
// Waed ALsoufi
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import publishStyle from '../Style/Publish.module.css';
import fire from '../Components/firebase';
import 'firebase/storage';
import { useAuth } from '../Components/Auth';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Pin from '../Components/pin';

function AddBookPage() {
  const { currentUser, location } = useAuth();
  const history = useHistory();

  const [state, setState] = useState({
    bookName: '',
    bookAuthor: '',
    bookType: '',
    description: '',
  });
  const [image, setImage] = useState({
    alt: '',
    PhotoUrl: '',
  });
  const [viewport, setViewport] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    height: ' 150px',
    width: '450px',
    zoom: 8,
  });
  const [marker, setMarker] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const [Adress, setAdress] = useState();
  const date = `${new Date().getFullYear()
    }-${new Date().getMonth() + 1
    }-${new Date().getDate()}`;

  async function addNewPost() {
    if (state.bookName !== '') {
      if (state.bookAuthor === '') {
        // eslint-disable-next-line no-alert
        alert('Book Author required');
      } else if (state.bookType === '') {
        alert('Book Type required');
      } else if (state.description === '') {
        alert('Book Description required');
      } else if (Adress === '') {
        alert('Adress required');
      } else if (image.PhotoUrl === '') {
        alert('Book Image  required');
      } else {
        try {
          await fire
            .firestore()
            .collection('AllPosts')
            .add({
              bookName: state.bookName,
              bookAuthor: state.bookAuthor,
              bookType: state.bookType,
              bookLocation: Adress,
              src: image.PhotoUrl,
              alt: image.alt || state.bookName,
              description: state.description,
              latitude: marker.latitude,
              longitude: marker.longitude,
              time: date,
              publisherId: currentUser.uid,
              requester: [],
            });
          history.push('/Posts');
        } catch (error) {
          alert(error.message);
        }
      }
    } else {
      alert('Book Title required!');
    }
  }

  const [background, setBackground] = useState(
    'https://static.thenounproject.com/png/558475-200.png',
  );

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImage({
        alt: e.target.files[0].name,
      });
      setBackground(
        'http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif',
      );
    }

    const uploadTask = fire.storage().ref();
    uploadTask
      .child(`/books/${e.target.files[0].name}`)
      .put(e.target.files[0])
      .then((snapshot) => snapshot.ref.getDownloadURL().then((downloadURL) => {
        if (downloadURL) {
          setImage({ PhotoUrl: downloadURL });
          setBackground(downloadURL);
        }
      }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateAdress = (e) => setAdress(e.target.value);

  useEffect(() => {
    let active = true;
    const GetAdress = async () => {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.60c4eff43cb5d5b1a97a7b542ff728ae&lat=${marker.latitude}&lon=${marker.longitude}&format=json`,
      );
      const newData = await response.json();
      const add = newData.display_name.split(', ');

      if (active) {
        setAdress(`${add[0]} ${add[1]}`);
      }
    };

    GetAdress();
    return () => {
      active = false;
    };
  }, [marker]);

  const onMarkerDragEnd = (event) => {
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  return (
    <div className={publishStyle.container}>
      <div className={publishStyle.contact_box}>
        <div className={publishStyle.left}>
          <h2 className={publishStyle.Title}>Share New Book</h2>
          <div className={publishStyle.subtitle}>Image </div>
          <div
            className={publishStyle.bg}
            style={{
              backgroundImage: `url(${background})`,
              width: '130px',
              height: '100px',
            }}
          >
            <input
              type="file"
              name="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImg}
              className={publishStyle.inputfile}
            />

            <label htmlFor="file" />
          </div>
          <div className={publishStyle.subtitle}>Title </div>

          <input
            name="bookName"
            type="text"
            className={publishStyle.field}
            placeholder="Book Title"
            onChange={handleInputChange}
          />
          <div className={publishStyle.subtitle}>Author </div>
          <input
            name="bookAuthor"
            type="text"
            className={publishStyle.field}
            placeholder="Book Author"
            onChange={handleInputChange}
          />
          <div className={publishStyle.subtitle}>Description </div>

          <textarea
            rows="4"
            cols="50"
            name="description"
            type="text"
            className={publishStyle.fieldDescription}
            placeholder="Please give description about the book (e.g condition, your personal opinion about the book)"
            onChange={handleInputChange}
          />
        </div>
        <div className={publishStyle.right}>
          <div>
            <div className={publishStyle.subtitle}>Type </div>
            <input
              name="bookType"
              type="text"
              className={publishStyle.field}
              placeholder="Book Type"
              onChange={handleInputChange}
            />
            <div className={publishStyle.subtitle}>Pickup Location </div>

            <input
              name="bookLocation"
              type="text"
              className={publishStyle.field2}
              placeholder="Location"
              value={Adress || ''}
              onChange={updateAdress}
            />

            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken="pk.eyJ1Ijoid2FlZGFsc291ZmkiLCJhIjoiY2twYm9lZGhyMTRhbjJ1bXBpanNicjM1byJ9.UWOw36CzRp28by_RMiKvUw"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={() => {
                setViewport(viewport);
              }}
            >
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetTop={-20}
                offsetLeft={-10}
                draggable
                onDragEnd={onMarkerDragEnd}
              >
                <Pin size={20} />
                {' '}
              </Marker>
            </ReactMapGL>
          </div>

          <button className={publishStyle.btn} onClick={addNewPost}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBookPage;
