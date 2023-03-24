import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import './App.css';
import './index.css';
import spotifyLogo from './spotify.png'; // import the image file
import youtubeLogo from './youtube.png'; // import the image file


function App() {
  const [data, setData] = useState('');

  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [url, setUrl] = useState('');
  const [trivia, setTrivia] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [music, setMusic] = useState('');

  const [spotifyID, setSpotify] = useState(''); 
  const [youtubeID, setYoutube] = useState(''); 

  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const styles = {
    backgroundColor: darkMode ? 'white' : '#212529',
    color: darkMode ? 'black' : 'white' ,
  };
  const shadows = {
    backgroundColor: darkMode ? 'white' : '#343a40' ,
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
          } else if (line.startsWith('Trivia:')) {
            setTrivia(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Lyrics Highlight:')) {
            setLyrics(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Music Highlight:')) {
            setMusic(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Spotify ID:')) {
            setSpotify(line.substring(line.indexOf(':') + 1));
          } else if (line.startsWith('Youtube ID:')) {
            setYoutube(line.substring(line.indexOf(':') + 1));
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







  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [streakCounter, setStreakCounter] = useState(0);
  
  useEffect(() => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date();
    if (lastLoginDate) {
      // First time user, set streak to 1
      setStreakCounter(1);
      setShowStreakPopup(true);
    } else {
      const lastLogin = new Date(lastLoginDate);
      if (
        lastLogin.getDate() !== today.getDate() ||
        lastLogin.getMonth() !== today.getMonth() ||
        lastLogin.getFullYear() !== today.getFullYear()
      ) {
        // User hasn't logged in today, so we need to reset the streak counter
        setStreakCounter(0);
      }
    }
  
    // Update the last login date
    localStorage.setItem('lastLoginDate', today.toString());
  }, []);
  
  useEffect(() => {
    if (streakCounter > 0) {
      setShowStreakPopup(true);
      setTimeout(() => setShowStreakPopup(false), 3000); // Close popup after 3 seconds
    }
  }, [streakCounter]);
  
  const handleLogin = () => {
    if (streakCounter === 0) {
      // User is logging in after a missed day, set streak to 1
      setStreakCounter(1);
      setShowStreakPopup(true);
    } else {
  
      setStreakCounter(streakCounter + 1);
    }
  };
    

  return (
    <Container fluid style={styles}>
      <div className="daily-streak-popup-container ">
        {showStreakPopup && <div className="fixed-top text-primary p-5 shadow bg-white rounded-3 text-center" style={{margin: "20vh"}}><h3>{streakCounter} Day Streak</h3><h6 className="text-black">Keep it up!</h6></div>}
      </div>

      <div className="border-lg d-flex pt-3 px-3 bg-dark fixed-top">
        <h2 className="text-white">beatwise</h2>
      </div>
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={8} lg={6}>
          <Card className="border-0 rounded-3" style={styles}>
            <Card.Body className="px-4 py-1 mt-3">
              <div className="row">
                <h3 className="col-9 mt-3 mb-2">Today's Beat</h3>
                <button className="col-2 rounded-2 border-0 mt-3 mb-2 pt-1 justify-content-center bg-primary" onClick={toggleDarkMode}><i className="material-icons" style={{ fontSize: '24px', color: 'white' }}>dark_mode</i></button>
              </div>
              <Card className="border-0 rounded-3 mb-3 shadow" style={shadows}>
                <Card.Body className="py-3">
                  <h5 className="">{songName}</h5>
                  <h6 style={paragraph}>{artist}</h6>
                  <div className="text-muted fs-1 justify-content-center align-items-center row">
                    <img className="rounded-2 p-0 col-8 mt-2 mb-3" src={url}></img>
                  </div>
                  <h6>
                    <span><Badge className="mx-1 bg-primary text-white p-2">{year}</Badge><Badge className="mx-1 bg-primary text-white p-2">{album}</Badge><Badge className="mx-1 bg-primary text-white p-2">{genre}</Badge></span>
                  </h6>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={shadows}>
                <Card.Body className="py-3">
                  <h5 className="">Trivia</h5>
                  <p style={paragraph}>{trivia}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={shadows}>
                <Card.Body className="py-3">
                  <h5 className="">Lyrics</h5>
                  <p style={paragraph}>{lyrics}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={shadows}>
                <Card.Body className="py-3">
                  <h5 className="">Music</h5>
                  <p style={paragraph}>{music}</p>
                </Card.Body>
              </Card>
              <Card className="border-0 rounded-3 shadow mb-3" style={shadows}>
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