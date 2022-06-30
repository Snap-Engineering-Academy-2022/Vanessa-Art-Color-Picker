import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArtworkCard from "./ArtworkCard";
import { useState, useEffect } from "react";
import "./App.css";
import TitleBar from "./TitleBar";

function App() {
  // Hooks
  const [artData, setArtData] = useState([]);
  const [nextPageURL, setNextPageURL] = useState(
    "https://api.artic.edu/api/v1/artworks?limit=10&fields=id,image_id,title,artist_title,artist_display,date_display,color,thumbnail,has_not_been_viewed_much,place_of_origin,medium_display,dimensions,credit_line,is_on_view"
  );

  const [imgURLRoot, setImgURLRoot] = useState("");

  // Function to check if artData is empty
  function isArtDataEmpty() {
    return artData.length === 0;
  }

  // run isFetching once & only if artData is empty
  useEffect(() => {
    if (isArtDataEmpty()) fetchAllPgs();
  }, []);

  function fetchAllPgs() {
    const artDataHelper = new Set();

    function fetchOnePg(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Add artwork on current page to artDataHelper
          for (let i = 0; i < data.data.length; ++i) {
            // only if the image has a thumbnail and color data
            if (data.data[i].image_id && data.data[i].color)
              artDataHelper.add(data.data[i]);
          }

          // Set total number of results pages
          const totalPages = data.pagination.total_pages;

          // Set URL for next page of results (randomly selected)
          setNextPageURL(randomPageLink(randomPage()));

          // Function to return a random page number between 2 and totalPages
          function randomPage() {
            return Math.floor((Math.random() * totalPages) + 2)
          }

          // Function to return a random page link
          function randomPageLink(page) {
            return `https://api.artic.edu/api/v1/artworks?limit=10&fields=id,image_id,title,artist_title,artist_display,date_display,color,thumbnail,has_not_been_viewed_much,place_of_origin,medium_display,dimensions,credit_line,is_on_view&page=${page}`;
          }

          // Set image URL root
          setImgURLRoot(data.config.iiif_url);


        });
    }

    // Fetch X pages of data
    // for (let i = 0; i < 400; ++i) fetchOnePg(nextPageURL);

    // Fetch data until artDataHelper has 3000 items in it
    while (artDataHelper.size < 3000) fetchOnePg(nextPageURL);

    console.log("artDataHelper", artDataHelper);

    // Set artData with artDataHelper data
    setArtData(Array.from(artDataHelper));
  }

  console.log("artData", artData);

  // function to get the image url for each artwork
  function getImgURL(artwork) {
    return `${imgURLRoot}/${artwork.image_id}/full/843,/0/default.jpg`;
  }

  // function to return scaled image height for each artwork (lesser of 250px or 10% of actual image size)
  function getImgHeight(artwork) {
    if (artwork.thumbnail.height > 2500) return "250";
    else return String(artwork.thumbnail.height * 0.1);
  }

  // Get a subset of artData based on color 
  const artDataColorSubset = [];
  function getArtDataColorSubset(artData, color) {
    for (let i = 0; i < artData.length; ++i) {
      // if artwork is within a certain percentage of color object
      if (
        artData[i].color.h > color.h * 0.99 &&
        artData[i].color.h < color.h * 1.01
        // artData[i].color.s > color.s * 0.95 &&
        // artData[i].color.s < color.s * 1.05
        // && artData[i].color.l > color.l * 0.95 &&
        // artData[i].color.l < color.l * 1.05
      )
        artDataColorSubset.push(artData[i]);
    }
  }

  getArtDataColorSubset(artData, { h: 53, s: 99, l: 49 });
  console.log("artDataColorSubset", artDataColorSubset);

  return (
    <div className="app-container">
      <TitleBar />
      <div className="artwork-grid-container">
        <div className="artwork-grid">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={6}
              justifyContent="center"
              alignItems="center"
            >
              {artDataColorSubset.map((artwork, index) => (
                <Grid item key={index}>
                  <ArtworkCard
                    height={getImgHeight(artwork)}
                    image_url={getImgURL(artwork)}
                    alt_text={artwork.thumbnail.alt_text}
                    title={artwork.title}
                    date_display={artwork.date_display}
                    artist_title={artwork.artist_title}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
