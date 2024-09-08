import React, { useState } from "react";
import "./Lectures.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const Lectures = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [videoInput, setVideoInput] = useState("");
  const [pdfInput, setPdfInput] = useState("");

  const addVideoUrl = () => {
    if (videoInput) {
      setVideoUrls([...videoUrls, videoInput]);
      setVideoInput(""); // Clear the input after adding
    }
  };

  const addPdfUrl = () => {
    if (pdfInput) {
      setPdfUrls([...pdfUrls, pdfInput]);
      setPdfInput(""); // Clear the input after adding
    }
  };

  const removeVideoUrl = (indexToRemove) => {
    setVideoUrls(videoUrls.filter((_, index) => index !== indexToRemove));
  };

  const removePdfUrl = (indexToRemove) => {
    setPdfUrls(pdfUrls.filter((_, index) => index !== indexToRemove));
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
          <div className="url_container">
            <div className="video_url">
              <div className="video_url_input">
                <input
                  type="text"
                  placeholder="Video URL"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                />
                <button onClick={addVideoUrl}>+</button>
              </div>
              <div className="video_container">
                {videoUrls.map((url, index) => (
                  <div key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    <button onClick={() => removeVideoUrl(index)}>X</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="pdf_url">
              <div className="pdf_url_input">
                <input
                  type="text"
                  placeholder="PDF URL"
                  value={pdfInput}
                  onChange={(e) => setPdfInput(e.target.value)}
                />
                <button onClick={addPdfUrl}>+</button>
              </div>
              <div className="pdf_container">
                {pdfUrls.map((url, index) => (
                  <div key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    <button onClick={() => removePdfUrl(index)}>X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="add_btn">إضافة</button>
        </div>
        <div className="lectures_list">
          <div className="lectures_item">
            <h3>Lecture 1</h3>
          </div>
          <div className="lectures_item">
            <h3>Lecture 1</h3>
          </div>
          <div className="lectures_item">
            <h3>Lecture 1</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Lectures;
