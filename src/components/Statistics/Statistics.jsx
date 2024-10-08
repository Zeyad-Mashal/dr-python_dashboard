import React, { useEffect, useState } from "react";
import "./statistics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import getSubject from "../../api/Statistics/getSubject";
import getLectures from "../../api/Statistics/getLectures";
import getTrackingDetails from "../../api/Statistics/getTrackingDetails";
import UpdateViews from "../../api/Statistics/UpdateViews";
const Statistics = () => {
  useEffect(() => {
    getAllSubjects();
  }, []);
  const { studentId } = useParams();
  const [error, setError] = useState("");
  const [getLectureLoading, setGetLectureLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [details, setDetails] = useState([]);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [lectureTitle, setlectureTitle] = useState("");
  const [maxViews, setMaxViwes] = useState("");
  const [UpdateView, setUpdateView] = useState("");
  const [lecuteID, setLecuteId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const closeViews = () => {
    document.querySelector(".views_counter_popup").style.display = "none";
  };
  const openViews = (videoUrl) => {
    setVideoUrl(videoUrl);
    document.querySelector(".views_counter_popup").style.display = "flex";
  };
  const getAllSubjects = () => {
    getSubject(setError, setGetLectureLoading, setSubjects, studentId);
  };
  const getAllLectures = (e) => {
    const subjectName = e.target.value;
    setSubjectTitle(subjectName);
    if (subjectName === "Select Subject") {
      setError("Please Select an subject name!");
      return;
    }
    const subjectId = subjects.filter(
      (subject) => subject.name === subjectName
    )[0]._id;

    getLectures(
      setError,
      setGetLectureLoading,
      setLectures,
      studentId,
      subjectId
    );
  };
  const lectureDetails = (e) => {
    const lectureName = e.target.value;
    setlectureTitle(lectureName);
    if (lectureName === "Select Lecture") {
      setError("Please Select an lecture name!");
      return;
    }
    const lectureId = lectures.filter(
      (lecture) => lecture.name === lectureName
    )[0]._id;
    setLecuteId(lectureId);
    getTrackingDetails(
      setError,
      setGetLectureLoading,
      setDetails,
      studentId,
      lectureId,
      setMaxViwes
    );
  };
  const updateViewsAPI = () => {
    if (UpdateView === "") {
      setError("Please Enter the views!");
    } else {
      const data = {
        newWatchCount: UpdateView,
        videoUrl,
      };
      UpdateViews(
        data,
        setError,
        setLoading,
        studentId,
        lecuteID,
        setDetails,
        setMaxViwes
      );
    }
  };
  return (
    <section className="statistics">
      <h2>Student Statistics</h2>
      <div className="Statistics_cotanier">
        <div className="subject_list">
          <p>Select Subject</p>
          <select value={subjectTitle} onChange={getAllLectures}>
            <option value="Select Subject">Select Subject</option>

            {subjects?.map((subject) => {
              return <option value={subject.name}>{subject.name}</option>;
            })}
          </select>
        </div>
        <div className="lecture_list">
          <p>Select Lecture</p>
          <select value={lectureTitle} onChange={lectureDetails}>
            <option value="Select Lecture">Select Lecture</option>
            {lectures.map((lecture) => {
              return <option value={lecture.name}>{lecture.name}</option>;
            })}
          </select>
        </div>
        <div className="statistics_table">
          <h3> Statistical Information</h3>
          <table>
            <tr>
              <th>Video</th>
              <th>Video URL</th>
              <th>Views</th>
              <th>Update Views</th>
            </tr>
            {details?.map((item) => {
              return (
                <tr>
                  <td>
                    <iframe
                      src={item.videoUrl}
                      frameBorder="0"
                      width={100}
                      height={100}
                    ></iframe>
                  </td>
                  <td>{item.videoUrl}</td>
                  <td>
                    {" "}
                    {maxViews}/{item.watchCount}
                  </td>
                  <td className="views">
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => openViews(item.videoUrl)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="views_counter_popup">
          <FontAwesomeIcon icon={faX} onClick={closeViews} />
          <p>Views Counter</p>
          <input
            type="number"
            placeholder="How many Views You Want ?"
            value={UpdateView}
            onChange={(e) => setUpdateView(e.target.value)}
          />
          {error}
          <button onClick={updateViewsAPI}>
            {loading ? <span className="loader"></span> : "Set Views"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
