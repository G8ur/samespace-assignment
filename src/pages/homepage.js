// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ListItem from "../components/list"
// import Frame from '../assets/Frame.svg';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
// import logo from '../assets/Logo.svg';
// import profile from '../assets/Profile.svg';

// const API_URL = 'https://cms.samespace.com/items';

// const fetchSongs = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     console.log('API Response:', response.data);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching songs:', error);
//     throw error;
//   }
// };

// const TABS = {
//   for_you: 'for_you',
//   top_tracks: 'top_tracks',
// };

// const Homepage = () => {
//   const [songsData, setSongsData] = useState();
//   const [loading, setLoading] = useState(true);
//   const [selectedSong, setSelectedSong] = useState({});
//   const [activeTab, setActiveTab] = useState(TABS.for_you);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const [showList, setShowList] = useState(true);

//   useEffect(() => {
//     const getSongsData = async () => {
//       try {
//         const songs = await fetchSongs();
//         console.log('Fetched Songs Data:', songs);
//         setSongsData(songs);
//         setFilteredData(songs);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching songs data:', error);
//         setLoading(false);
//       }
//     };

//     getSongsData();
//     setActiveTab(TABS.for_you);
//   }, []);

//   useEffect(() => {
//     if (activeTab === TABS.top_tracks) {
//       const topTracks = songsData.filter((item) => item.top_track === true);
//       setFilteredData(topTracks);
//     } else if (activeTab === TABS.for_you) {
//       setFilteredData(songsData);
//     }
//   }, [activeTab, songsData]);

//   useEffect(() => {
//     console.log('Selected Song:', selectedSong);
//     console.log(`Image URL: https://cms.samespace.com/assets/${selectedSong.cover?.id}`);
//   }, [selectedSong]);

//   function handleNext(data) {
//     const id = data.id;
//     filteredData.forEach((item, index) => {
//       if (item.id === id) {
//         setSelectedSong(filteredData[(index + 1) % filteredData.length]);
//       }
//     });
//   }

//   function handlePrev(data) {
//     const id = data.id;
//     filteredData.forEach((item, index) => {
//       if (item.id === id) {
//         setSelectedSong(filteredData[(index - 1 + filteredData.length) % filteredData.length]);
//       }
//     });
//   }

//   function handleSearch(value) {
//     setSearchValue(value.toLowerCase());
//   }

//   return (
//     <div
//       className="homepage"
//       style={{
//         background: `linear-gradient(108deg, ${selectedSong.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
//       }}
//     >
//       <div className="sidebar">
//         <div>
//           <img src={logo} alt="logo" />
//         </div>
//         <div>
//           <img src={profile} alt="profile" />
//         </div>
//       </div>
//       <div className="show_list" onClick={() => setShowList(!showList)}>
//         {!showList ? 'Show List' : 'Hide List'}
//       </div>
//       <div className={showList ? 'middle' : 'middle display_none'}>
//         <div className="topbar">
//           <div
//             onClick={() => setActiveTab(TABS.for_you)}
//             className={`for_you ${activeTab === TABS.for_you ? '' : 'not_selected'}`}
//           >
//             For You
//           </div>
//           <div
//             onClick={() => setActiveTab(TABS.top_tracks)}
//             className={`top_tracks ${activeTab === TABS.top_tracks ? '' : 'not_selected'}`}
//           >
//             Top Tracks
//           </div>
//         </div>
//         <div className="search_bar">
//           <input
//             placeholder="Search Song, Artist"
//             onChange={(event) => handleSearch(event.target.value)}
//           />
//           <img src={Frame} alt="search" />
//         </div>
//         <div className="list_item_container">
//           {filteredData
//             ?.filter(
//               (data) =>
//                 data.name.toLowerCase().includes(searchValue) ||
//                 data.artist.toLowerCase().includes(searchValue)
//             )
//             .map((item, index) => (
//               <ListItem
//                 key={index}
//                 icon={item.cover?.id } // Pass the cover id or a default value
//                 artist={item.artist}
//                 name={item.name}
//                 data={item}
//                 selectedSong={selectedSong}
//                 setSelectedSong={(value) => setSelectedSong(value)}
//               />
//             ))}
//         </div>
//       </div>
//       {selectedSong && Object.keys(selectedSong).length > 0 && (
//         <div className={showList ? 'media-player display_none' : 'media-player'}>
//           <div className="played_songs_details">
//             <div className="song_played">{selectedSong.name}</div>
//             <div className="artist_played">{selectedSong.artist}</div>
//           </div>
//           <div className="cover_art_container">
//             <img
//               src={`https://cms.samespace.com/assets/${selectedSong.cover }`}
//               alt={selectedSong.name}
//               className="cover_art"
              
//             />
//           </div>
//           <AudioPlayer
//             autoPlay
//             src={selectedSong.url}
//             showDownloadProgress={false}
//             showSkipControls={true}
//             showJumpControls={false}
//             onClickNext={(e) => handleNext(selectedSong)}
//             onClickPrevious={(e) => handlePrev(selectedSong)}
//             onEnded={() => handleNext(selectedSong)}
//             // other props here
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Homepage;



// using graphql query in axios


import React, { useEffect, useState } from "react";
import ListItem from "../components/list";
import Frame from "../assets/Frame.svg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import logo from "../assets/Logo.svg";
import profile from "../assets/Profile.svg";
import axios from "axios"; // Import Axios
// import ListItem from "../components/list";

const TABS = {
  for_you: "for_you",
  top_tracks: "top_tracks",
};

const Homepage = () => {
  const [songsData, setSongsData] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});
  const [activeTab, setActiveTab] = useState(TABS.for_you);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [activeTab, songsData]);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://cms.samespace.com/graphql', {
        query: `
          query {
            songs {
              id
              name
              artist
              url
              cover {
                id
              }
              top_track
              accent
            }
          }
        `
      });

      setSongsData(response.data.data.songs);
      setFilteredData(response.data.data.songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const filterSongs = () => {
    if (activeTab === TABS.top_tracks) {
      const topTracks = songsData.filter(song => song.top_track === true);
      setFilteredData(topTracks);
    } else {
      setFilteredData(songsData);
    }
  };

  const handleNext = (data) => {
    const currentIndex = filteredData.findIndex(song => song.id === data.id);
    const nextIndex = (currentIndex + 1) % filteredData.length;
    setSelectedSong(filteredData[nextIndex]);
  };

  const handlePrev = (data) => {
    const currentIndex = filteredData.findIndex(song => song.id === data.id);
    const prevIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
    setSelectedSong(filteredData[prevIndex]);
  };

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
  };

  return (
    <div
      className="homepage"
      style={{
        background: `linear-gradient(108deg, ${selectedSong.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
      }}
    >
      <div className="sidebar">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <img src={profile} alt="profile" />
        </div>
      </div>
      <div className="show_list" onClick={() => setShowList(!showList)}>
        {!showList ? "Show List" : "Hide List"}
      </div>
      <div className={showList ? "middle" : "middle display_none"}>
        <div className="topbar">
          <div
            onClick={() => setActiveTab(TABS.for_you)}
            className={`for_you ${activeTab === TABS.for_you ? "" : "not_selected"}`}
          >
            For You
          </div>
          <div
            onClick={() => setActiveTab(TABS.top_tracks)}
            className={`top_tracks ${activeTab === TABS.top_tracks ? "" : "not_selected"}`}
          >
            Top Tracks
          </div>
        </div>
        <div className="search_bar">
          <input
            placeholder="Search Song, Artist"
            onChange={(event) => handleSearch(event.target.value)}
          />
          <img src={Frame} alt="search" />
        </div>
        <div className="list_item_container">
          {filteredData
            ?.filter(
              (data) =>
                data.name.toLowerCase().includes(searchValue) ||
                data.artist.toLowerCase().includes(searchValue)
            )
            .map((item, index) => (
              <ListItem
                key={index}
                icon={item.cover?.id}
                artist={item.artist}
                name={item.name}
                data={item}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
              />
            ))}
        </div>
      </div>
      {selectedSong && Object.keys(selectedSong).length > 0 && (
        <div className={showList ? "media-player display_none" : "media-player"}>
          <div className="played_songs_details">
            <div className="song_played">{selectedSong.name}</div>
            <div className="artist_played">{selectedSong.artist}</div>
          </div>
          <div className="cover_art_container">
            <img
              src={`https://cms.samespace.com/assets/${selectedSong.cover?.id}`}
              alt="Cover Art"
              className="cover_art"
            />
          </div>
          <AudioPlayer
            autoPlay
            src={selectedSong.url}
            showDownloadProgress={false}
            showSkipControls={true}
            showJumpControls={false}
            onClickNext={() => handleNext(selectedSong)}
            onClickPrevious={() => handlePrev(selectedSong)}
            onEnded={() => handleNext(selectedSong)}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;


