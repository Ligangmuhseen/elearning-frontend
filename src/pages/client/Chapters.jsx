import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import Login from "../all/Login";
import Register from "./Register";
import titleimg from "../../clientassets/images/backgrounds/page-title.jpg";
import $ from "jquery";
import Player from "@vimeo/player";
import "./Chapter.css";
import API_BASE_URL from "../../components/apiConfig";
import { useAuth } from "../../components/context/AuthContext";

// Extract video ID from Vimeo URL
const extractVideoId = (url) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

const Chapters = () => {
  const { course_id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Fetch chapters and videos for the course
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/elearn/courses/${course_id}/chapters-videos/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setChapters(response.data.chapters);
        setLoading(false);

        // Set the first video as active initially
        if (
          response.data.chapters.length > 0 &&
          response.data.chapters[0].videos.length > 0
        ) {
          setActiveVideo(response.data.chapters[0].videos[0]);
        }
      } catch (error) {
        console.error("Error fetching chapters and videos", error);
      }
    };
    fetchChapters();

    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });
  }, [course_id, token]);

  // Initialize Vimeo Player when the active video changes
  useEffect(() => {
    const initializePlayer = () => {
      if (activeVideo && activeVideo.video_url) {
        const videoId = extractVideoId(activeVideo.video_url);
        if (videoId) {
          const player = new Player("vimeo-player", { id: videoId });

          player
            .ready()
            .then(() => {
              console.log("Player is ready");
            })
            .catch((error) => {
              console.error("Error initializing player:", error);
            });

          // Clean up the player on component unmount
          return () => {
            player.destroy();
          };
        } else {
          console.error("Invalid video ID");
        }
      }
    };

    // Initialize player
    initializePlayer();
  }, [activeVideo]);

  // Update active chapter and video when a new video is selected
  const handleVideoClick = (video, chapterIndex) => {
    setActiveChapter(chapterIndex);
    setActiveVideo(video);
  };

  // Mark a video as watched by updating the is_completed field in the backend
  const markVideoAsWatched = async (videoId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/elearn/video/${videoId}/complete/`,
        {},  // Send an empty object as the request body
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Update the is_completed status in the state after marking the video as watched
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        videos: chapter.videos.map((video) =>
          video.video_id === videoId ? { ...video, is_completed: true } : video
        ),
      }));
      setChapters(updatedChapters);
    } catch (error) {
      console.error("Error marking video as watched", error);
    }
  };

  if (loading) {
    return <p>Loading chapters...</p>;
  }

  return (
    <>
      <Header />
      <Login />
      <Register />

      {/* Page title */}
      <section
        className="page-title-section overlay"
        data-background={titleimg}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8"></div>
          </div>
        </div>
      </section>

      <section className="section chapters-section">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar for Chapters */}
            <div
              className="col-lg-3 mb-2"
              style={{ maxHeight: "550px", overflowY: "auto" }}
            >
              <ul className="nav flex-column nav-tabs chapter-tabs">
                {chapters.map((chapter, index) => (
                  <li key={index} className="nav-item">
                    <a
                      className={`nav-link ${
                        activeChapter === index ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveChapter(index);
                        if (chapter.videos.length > 0) {
                          setActiveVideo(chapter.videos[0]);
                        } else {
                          setActiveVideo(null); // Clear the active video if no videos are available
                        }
                      }}
                    >
                      {chapter.title}
                    </a>
                    <ul className="nav flex-column video-list">
                      {chapter.videos.length > 0 ? (
                        chapter.videos.map((video, videoIndex) => (
                          <li key={videoIndex} className="nav-item">
                            <span
                              className="video-item"
                              onClick={() => handleVideoClick(video, index)}
                            >
                              {video.title}{" "}
                              <b
                                className={`${
                                  video.is_completed ? "watched" : "not-watched"
                                }`}
                              >
                                {video.is_completed
                                  ? "(Watched)"
                                  : "(Not Watched)"}
                              </b>
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="nav-item">
                          <span className="video-item">
                            No videos available
                          </span>
                        </li>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Area for Video and Description */}
            <div className="col-lg-9">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <h3>{chapters[activeChapter]?.title}</h3>
                  <p>{chapters[activeChapter]?.description}</p>

                  {/* Vimeo Video Player */}
                  {activeVideo ? (
                    <>
                      <div className="embed-container">
                        <div id="vimeo-player"></div>
                      </div>

                      {/* Video Description */}
                      <div className="video-description">
                        <p style={{marginTop:"30px"}}>
                          <span>Video Description:</span>
                        </p>
                        <var>{activeVideo?.description}</var>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-danger">
                      <p style={{ fontSize: "13pt" }}>
                        No video selected or available.
                      </p>
                    </div>
                  )}

                  {/* Mark as Watched Button */}
                  {activeVideo && !activeVideo.is_completed && (
                    <div className="mark-watched-btn mt-5">
                      <button
                        onClick={() => markVideoAsWatched(activeVideo.video_id)}
                        className="btn btn-primary"
                      >
                        Mark as Watched
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Chapters;
