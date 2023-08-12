import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import './App.css';
import './index.css';
import spotifyLogo from './spotify.png'; // import the image file
import youtubeLogo from './youtube.png'; // import the image file
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [data, setData] = useState('');

  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [url, setUrl] = useState('');
  const [background, setBackground] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [music, setMusic] = useState('');
  const [badgeColor, setBadgeColor] = useState('');

  const [spotifyID, setSpotify] = useState(''); 
  const [youtubeID, setYoutube] = useState(''); 

  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const styles = {
    backgroundColor: darkMode ? 'white' : '#212529',
    color: darkMode ? 'black' : 'white' ,
  };
  const shadows = {
    backgroundColor: darkMode ? 'white' : '#212529' ,
    color: darkMode ? 'black' :  'white',
  };
  const paragraph = {
    color: darkMode ? '#8c959a' : '#adb5bd'
  };

  useEffect(() => {
    fetch('/data.txt')
      .then(response => response.text())
      .then(text => {
        const today = new Date().toLocaleDateString();
        const regex = new RegExp(`Date: ${today}.*?(?=Date:|$)`, 'gs');
        const todayData = text.match(regex)?.[0];

        console.log(todayData);
        const dataArray = todayData.split('\n');
        dataArray.forEach(line => {
          if (line.startsWith('Song Name:')) {
            setSongName(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Artist:')) {
            setArtist(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Year:')) {
            setYear(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Album:')) {
            setAlbum(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Genre:')) {
            setGenre(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Album Art URL:')) {
            setUrl(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Background:')) {
            setBackground(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Lyrics:')) {
            setLyrics(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Music:')) {
            setMusic(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Spotify ID:')) {
            setSpotify(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Youtube ID:')) {
            setYoutube(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Badge Color:')) {
            setBadgeColor(line.substring(line.indexOf(':') + 1));
          }
        });
      });

    }, []);

    const openSpotifyApp = () => {
      console.log(spotifyID)
      window.location.href = `spotify:track:${spotifyID}`;
    };
    const openYouTubeApp = () => {
      window.location.href = `https://www.youtube.com/watch?v=${youtubeID}`;
    };








  const [streakCounter, setStreakCounter] = useState(1);
  
  useEffect(() => {
    var streak = parseInt(Cookies.get('streak'));
    const lastVisit = Cookies.get('lastVisit');
    const today = new Date().toLocaleDateString();
  
    if (!lastVisit) {
      Cookies.set('lastVisit', today);
      Cookies.set('streak', 1);
      streak = 1;
    } else if (lastVisit === today) {
      // do nothing, streak remains the same
    } else if ((new Date() - new Date(lastVisit) <= 86400000) || (new Date(lastVisit) - new Date() <= 86400000)) {
      Cookies.set('lastVisit', today);
      streak++;
      Cookies.set('streak', streak);
    } else {
      Cookies.set('lastVisit', today);
      Cookies.set('streak', 1);
      streak = 1;
    }    
    
  
    setStreakCounter(streak);
  }, []);
    



  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const showPopupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
  
    return () => clearTimeout(showPopupTimeout);
  }, []);

  useEffect(() => {
    const isPopupShown = localStorage.getItem('isPopupShown');
    if (isPopupShown) {
      setShowPopup(false);
    } else {
      localStorage.setItem('isPopupShown', true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };



  return (
    
    <Container fluid style={styles}>
      
      {/*showPopup && (
        <Modal show={showPopup} onHide={handleClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Share the Daily Beat!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
            Take a screenshot of the Daily Beat and share your thoughts on social media with your friends using #beatwise!
            </p>
            <img src="/share.jpg" alt="Instagram Example" className="img-fluid rounded-3" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )*/}
      
      <div className="border-lg d-flex pt-3 px-3 bg-dark fixed-top">
        <h2 style={{color: "#2E86C1"}}> beat</h2><h2 style={{color: "white"}}>wise</h2>
      </div>
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={8} lg={6} className="col-12">
          <Card className="border-0 rounded-3" style={styles}>
            <Card.Body className="px-4 py-1 mt-3">
              <div className="row">
                <h3 className="col-6 mt-3 mb-2 ">Today's Beat</h3>
                <button className="col-3 h6 rounded-2 border-0 mt-3 mb-2 mx-1 justify-content-center" style={styles}> </button>
                <button className="col-2 rounded-2 border-0 mt-3 mb-2 mx-1 pt-1 justify-content-center" style={{backgroundColor: "#000000"}} onClick={toggleDarkMode}><i className="material-icons" style={{ fontSize: '24px', color: 'white' }}>dark_mode</i></button>
              </div>
              <Card className="border-0 rounded-3 mb-3 shadow" style={styles}>
                <Card.Body className="py-3 pt-4">
                  <h5 className="">{songName}</h5>
                  <h6 style={paragraph}>{artist}</h6>
                  <div className="text-muted fs-1 justify-content-center align-items-center row">
                    <img className="rounded-2 p-0 col-8 mt-2 mb-3" src={url}></img>
                  </div>
                  <h6>
                    <span><Badge className={`mx-1 my-1 p-2 ${badgeColor}`} style={paragraph}>{year}</Badge><Badge className={`mx-1 my-1 p-2 ${badgeColor}`} style={paragraph}>{album}</Badge><Badge className={`mx-1 my-1 p-2 ${badgeColor}`} style={paragraph}>{genre}</Badge></span>
                  </h6>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={styles}>
                <Card.Body className="py-3">
                  <h5 className="">Background</h5>
                  <p style={paragraph}>{background}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={styles}>
                <Card.Body className="py-3">
                  <h5 className="">Lyrics</h5>
                  <p style={paragraph}>{lyrics}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={styles}>
                <Card.Body className="py-3">
                  <h5 className="">Music</h5>
                  <p style={paragraph}>{music}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={styles}>
                <Card.Body className="py-4 row justify-content-center">
                  <h5 className="mb-0">Listen</h5>
                  <p style={paragraph} className="mt-0">On Your Favorite Platform</p>
                  <button className="col-3 border-0 mx-3" onClick={openSpotifyApp} style={{backgroundColor: 'transparent'}}><img className="w-100 h-100" src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"></img></button>
                  <button className="col-3 border-0 mx-3" onClick={openYouTubeApp} style={{backgroundColor: 'transparent'}}><img className="w-100 h-90" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png"></img></button>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
