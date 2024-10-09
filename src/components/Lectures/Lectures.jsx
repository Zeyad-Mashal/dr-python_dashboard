import React, { useEffect, useState } from "react";
import "./Lectures.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import AddLectureAPI from "../../api/lectures/AddLectureAPI";
import GetSubjectAPI from "../../api/lectures/GetAllLecturesAPI";
import UpdateLectureAPI from "../../api/lectures/UpdateLectureAPI";
import deleteLectureAPI from "../../api/lectures/deleteLectureAPI";
const Lectures = () => {
  useEffect(() => {
    getAllLecturesApi();
  }, []);
  const { subjectId } = useParams();
  const [subnames, setSubnames] = useState([{ name: "", videoUrl: [] }]);
  const [allLectures, setAllLectures] = useState([]);
  const [lectureName, setLectureName] = useState("");
  const [pdfFile, setPdfFile] = useState([]);
  const [pdfInput, setPdfInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lectureId, setLectureId] = useState("");
  const [getLectureLoading, setGetLectureLoading] = useState(false);
  const [views, setViews] = useState("");
  const handleSubnameChange = (index, name) => {
    const updatedSubnames = subnames.map((subname, i) =>
      i === index ? { ...subname, name } : subname
    );
    setSubnames(updatedSubnames);
  };

  const handleVideoInputChange = (index, videoInput) => {
    const updatedSubnames = subnames.map((subname, i) =>
      i === index ? { ...subname, videoInput } : subname
    );
    setSubnames(updatedSubnames);
  };

  const addVideoToSubname = (index) => {
    const updatedSubnames = subnames.map((subname, i) => {
      if (i === index && subname.videoInput) {
        return {
          ...subname,
          videoUrl: [...subname.videoUrl, subname.videoInput],
          videoInput: "",
        };
      }
      return subname;
    });
    setSubnames(updatedSubnames);
  };

  const addSubname = () => {
    setSubnames([...subnames, { name: "", videoUrl: [] }]);
  };

  const removeVideo = (subnameIndex, videoIndex) => {
    const updatedSubnames = subnames.map((subname, i) => {
      if (i === subnameIndex) {
        return {
          ...subname,
          videoUrl: subname.videoUrl.filter((_, index) => index !== videoIndex),
        };
      }
      return subname;
    });
    setSubnames(updatedSubnames);
  };

  // Function to remove the entire subname and its videoUrl
  const removeSubname = (index) => {
    setSubnames(subnames.filter((_, i) => i !== index));
  };

  const openAddlec = () => {
    setLectureName("");
    setSubnames([{ name: "", videoUrl: [] }]);
    setPdfFile([]);
    setError("");
    document.querySelector(".add_lecture").style.display = "flex";
  };

  const closeAddlec = () => {
    document.querySelector(".add_lecture").style.display = "none";
  };
  const openUpdatelec = (lectureId, lectureName, subnames, pdfFile, views) => {
    setLectureId(lectureId);
    setLectureName(lectureName);
    setSubnames(subnames);
    setPdfFile(pdfFile);
    setViews(views);
    document.querySelector(".update_lecture").style.display = "flex";
  };

  const closeUpdatelec = () => {
    document.querySelector(".update_lecture").style.display = "none";
  };
  const openDeletelec = (lectureId) => {
    setLectureId(lectureId);
    document.querySelector(".delete_lecture").style.display = "flex";
  };

  const closeDeletelec = () => {
    document.querySelector(".delete_lecture").style.display = "none";
  };

  const addPdf = () => {
    if (pdfInput) {
      setPdfFile([...pdfFile, pdfInput]);
      setPdfInput(""); // Clear the input after adding
    }
  };

  const removePdf = (index) => {
    const updatedPdfFiles = pdfFile.filter((_, i) => i !== index);
    setPdfFile(updatedPdfFiles);
  };

  const addLectureApi = () => {
    if (views === "" || lectureName === "") {
      setError("Please fill in all fields");
    } else {
      const data = {
        name: lectureName,
        parts: subnames,
        pdfFile,
        maxViews: views,
      };
      AddLectureAPI(data, setError, setLoading, setAllLectures, subjectId);
    }
  };
  const getAllLecturesApi = () => {
    GetSubjectAPI(setError, setGetLectureLoading, setAllLectures, subjectId);
  };
  const UpdateLectureApi = () => {
    if (views === "" || lectureName === "") {
      setError("Please fill in all fields");
    } else {
      const data = {
        name: lectureName,
        parts: subnames,
        pdfFile,
        maxViews: views,
      };
      UpdateLectureAPI(
        data,
        setError,
        setLoading,
        setAllLectures,
        subjectId,
        lectureId
      );
    }
  };
  const deleteLectureApi = () => {
    deleteLectureAPI(
      setError,
      setLoading,
      setAllLectures,
      subjectId,
      lectureId
    );
  };

  return (
    <section className="lectures">
      <div className="lectures_container">
        <button onClick={openAddlec}>Add Lecture</button>
        {/* add lecture */}
        <div className="add_lecture">
          <FontAwesomeIcon icon={faX} onClick={closeAddlec} />
          <input
            type="text"
            placeholder="Lecture name"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          />
          <input
            type="text"
            placeholder="max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          {subnames.map((subname, index) => (
            <div key={index} className="subname_section">
              <input
                type="text"
                placeholder={`Subname ${index + 1}`}
                value={subname.name}
                onChange={(e) => handleSubnameChange(index, e.target.value)}
              />
              <div className="video_url_input">
                <button
                  className="remove_btn"
                  onClick={() => removeSubname(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <input
                  type="text"
                  placeholder="Video URL"
                  value={subname.videoInput || ""}
                  onChange={(e) =>
                    handleVideoInputChange(index, e.target.value)
                  }
                />
                <button onClick={() => addVideoToSubname(index)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="video_container">
                {subname.videoUrl.map((video, videoIndex) => (
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

              {/* Remove Subname Button */}
              <div className="remove_subname"></div>

              {/* Show the + button only for the last subname to add the next one */}
              {index === subnames.length - 1 && (
                <button className="add_subname" onClick={addSubname}>
                  اضف قسم أخر
                </button>
              )}
            </div>
          ))}
          <div className="pdf_section">
            <h4>Add PDF URL</h4>
            <div className="pdfFiles_container">
              <input
                type="text"
                placeholder="PDF URL"
                value={pdfInput}
                onChange={(e) => setPdfInput(e.target.value)}
              />
              <button onClick={addPdf}>
                {" "}
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="pdfFiles_array">
              {pdfFile.map((pdf, index) => (
                <div key={index} className="pdf_item">
                  <a href={pdf} target="_blank" rel="noopener noreferrer">
                    {pdf}
                  </a>
                  <button onClick={() => removePdf(index)}>X</button>
                </div>
              ))}
            </div>
          </div>

          {error}
          <button onClick={addLectureApi} className="add_btn">
            {loading ? "loading..." : "Add Lecture"}
          </button>
        </div>
        {/* update lecture */}
        <div className="add_lecture update_lecture">
          <FontAwesomeIcon icon={faX} onClick={closeUpdatelec} />
          <input
            type="text"
            placeholder="Lecture name"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          />
          <input
            type="text"
            placeholder="max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          {subnames.map((subname, index) => (
            <div key={index} className="subname_section">
              <input
                type="text"
                placeholder={`Subname ${index + 1}`}
                value={subname.name}
                onChange={(e) => handleSubnameChange(index, e.target.value)}
              />
              <div className="video_url_input">
                <button
                  className="remove_btn"
                  onClick={() => removeSubname(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <input
                  type="text"
                  placeholder="Video URL"
                  value={subname.videoInput || ""}
                  onChange={(e) =>
                    handleVideoInputChange(index, e.target.value)
                  }
                />
                <button onClick={() => addVideoToSubname(index)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="video_container">
                {subname.videoUrl.map((video, videoIndex) => (
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

              {/* Remove Subname Button */}
              <div className="remove_subname"></div>

              {/* Show the + button only for the last subname to add the next one */}
              {index === subnames.length - 1 && (
                <button className="add_subname" onClick={addSubname}>
                  اضف قسم أخر
                </button>
              )}
            </div>
          ))}
          <div className="pdf_section">
            <h4>Add PDF URL</h4>
            <div className="pdfFiles_container">
              <input
                type="text"
                placeholder="PDF URL"
                value={pdfInput}
                onChange={(e) => setPdfInput(e.target.value)}
              />
              <button onClick={addPdf}>
                {" "}
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="pdfFiles_array">
              {pdfFile.map((pdf, index) => (
                <div key={index} className="pdf_item">
                  <a href={pdf} target="_blank" rel="noopener noreferrer">
                    {pdf}
                  </a>
                  <button onClick={() => removePdf(index)}>X</button>
                </div>
              ))}
            </div>
          </div>
          {error}
          <button onClick={UpdateLectureApi} className="add_btn">
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
        {/* delete lecture */}
        <div className="delete_lecture">
          <h3>Delete Lecture Name ?</h3>
          <div className="delete_lecture_btn">
            {error}
            <button onClick={deleteLectureApi}>
              {loading ? "Loading..." : "Delete"}
            </button>
            <button onClick={closeDeletelec}>Close</button>
          </div>
        </div>
        <div className="lectures_list">
          {getLectureLoading ? (
            <span class="loader"></span>
          ) : (
            allLectures.map((item) => {
              return (
                <div className="lectures_item">
                  <button
                    onClick={() =>
                      openUpdatelec(
                        item._id,
                        item.name,
                        item.parts,
                        item.pdfFile,
                        item.maxViews
                      )
                    }
                  >
                    update
                  </button>
                  <h3>{item.name}</h3>
                  <button onClick={() => openDeletelec(item._id)}>
                    delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Lectures;
