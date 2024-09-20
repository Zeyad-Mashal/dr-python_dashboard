import React, { useState } from "react";
import "./Lectures.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Lectures = () => {
  const [subtitles, setSubtitles] = useState([{ title: "", videos: [] }]);

  const handleSubtitleChange = (index, title) => {
    const updatedSubtitles = subtitles.map((subtitle, i) =>
      i === index ? { ...subtitle, title } : subtitle
    );
    setSubtitles(updatedSubtitles);
  };

  const handleVideoInputChange = (index, videoInput) => {
    const updatedSubtitles = subtitles.map((subtitle, i) =>
      i === index ? { ...subtitle, videoInput } : subtitle
    );
    setSubtitles(updatedSubtitles);
  };

  const addVideoToSubtitle = (index) => {
    const updatedSubtitles = subtitles.map((subtitle, i) => {
      if (i === index && subtitle.videoInput) {
        return {
          ...subtitle,
          videos: [...subtitle.videos, subtitle.videoInput],
          videoInput: "",
        };
      }
      return subtitle;
    });
    setSubtitles(updatedSubtitles);
  };

  const addSubtitle = () => {
    setSubtitles([...subtitles, { title: "", videos: [] }]);
  };

  const removeVideo = (subtitleIndex, videoIndex) => {
    const updatedSubtitles = subtitles.map((subtitle, i) => {
      if (i === subtitleIndex) {
        return {
          ...subtitle,
          videos: subtitle.videos.filter((_, index) => index !== videoIndex),
        };
      }
      return subtitle;
    });
    setSubtitles(updatedSubtitles);
  };

  // Function to remove the entire subtitle and its videos
  const removeSubtitle = (index) => {
    setSubtitles(subtitles.filter((_, i) => i !== index));
  };

  const openAddlec = () => {
    document.querySelector(".add_lecture").style.display = "flex";
  };

  const closeAddlec = () => {
    document.querySelector(".add_lecture").style.display = "none";
  };

  return (
    <section className="lectures">
      <div className="lectures_container">
        <button onClick={openAddlec}>Add Lecture</button>
        <div className="add_lecture">
          <FontAwesomeIcon icon={faX} onClick={closeAddlec} />
          <input type="text" placeholder="Lecture Title" />
          {subtitles.map((subtitle, index) => (
            <div key={index} className="subtitle_section">
              <input
                type="text"
                placeholder={`Subtitle ${index + 1}`}
                value={subtitle.title}
                onChange={(e) => handleSubtitleChange(index, e.target.value)}
              />
              <div className="video_url_input">
                <button
                  className="remove_btn"
                  onClick={() => removeSubtitle(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <input
                  type="text"
                  placeholder="Video URL"
                  value={subtitle.videoInput || ""}
                  onChange={(e) =>
                    handleVideoInputChange(index, e.target.value)
                  }
                />
                <button onClick={() => addVideoToSubtitle(index)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="video_container">
                {subtitle.videos.map((video, videoIndex) => (
                  <div key={videoIndex}>
                    <a href={video} target="_blank" rel="noopener noreferrer">
                      {video}
                    </a>
                    <button onClick={() => removeVideo(index, videoIndex)}>
                      X
                    </button>
                  </div>
                ))}
              </div>

              {/* Remove Subtitle Button */}
              <div className="remove_subtitle"></div>

              {/* Show the + button only for the last subtitle to add the next one */}
              {index === subtitles.length - 1 && (
                <button className="add_subtitle" onClick={addSubtitle}>
                  اضف قسم أخر
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="lectures_list">
          <div className="lectures_item">
            <h3>Lecture 1</h3>
          </div>
          <div className="lectures_item">
            <h3>Lecture 2</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lectures;
