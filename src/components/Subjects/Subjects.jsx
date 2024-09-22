import React, { useEffect, useState } from "react";
import image from "../../images/logo.png";
import "./Subjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import AddSubjectAPI from "../../api/subject/addSubjectAPI";
import GetSubjectAPI from "../../api/subject/getAllSubjectsAPI";
import UpdateSubjectAPI from "../../api/subject/updateSubjectAPI";
import DeleteSubjectAPI from "../../api/subject/deleteSubjectAPI";
import { Link } from "react-router-dom";
const Subjects = () => {
  useEffect(() => {
    getAllSubjectsApi();
  }, []);
  const [prevImage, setPrevImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };
  const openAddSubject = () => {
    document.querySelector(".add_subject").style.display = "flex";
  };
  const closeAddSubject = () => {
    document.querySelector(".add_subject").style.display = "none";
  };
  const openUpdateSubject = (subjectId, subject, prevImage) => {
    setSubjectId(subjectId);
    setSubject(subject);
    setPrevImage(prevImage);
    document.querySelector(".update_subject").style.display = "flex";
  };
  const closeUpdateSubject = () => {
    document.querySelector(".update_subject").style.display = "none";
  };
  const addSubjectApi = () => {
    if (prevImage === "" || subject === "") {
      setError("Please fill all fields");
    } else {
      const data = new FormData();
      data.append("name", subject);
      data.append("image", imageURL);
      AddSubjectAPI(data, setError, setLoading, setAllSubjects);
    }
  };
  const getAllSubjectsApi = () => {
    GetSubjectAPI(setError, setLoading, setAllSubjects);
  };
  const closeDeleteSubject = () => {
    document.querySelector(".delete_subject").style.display = "none";
  };
  const openDeleteSubject = (subjectId) => {
    setSubjectId(subjectId);
    document.querySelector(".delete_subject").style.display = "flex";
  };
  const updateSubjectApi = () => {
    if (prevImage === "" || subject === "") {
      setError("Please fill all fields");
    } else {
      const data = new FormData();
      data.append("name", subject);
      data.append("image", imageURL);
      UpdateSubjectAPI(data, setError, setLoading, setAllSubjects, subjectId);
    }
  };
  const deleteSubjectApi = () => {
    DeleteSubjectAPI(setError, setLoading, setAllSubjects, subjectId);
  };
  return (
    <section className="subjects">
      <div className="subjects_container">
        <button onClick={openAddSubject}>Add Subjects</button>
        <div className="add_subject">
          <FontAwesomeIcon icon={faX} onClick={closeAddSubject} />
          <input
            type="text"
            placeholder="Enter Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="add_images">
            {prevImage ? (
              <img src={prevImage} />
            ) : (
              <label>
                <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic">
                  <FontAwesomeIcon icon={faCamera} />
                  <p>اختر صورة جديدة</p>
                </div>
                <input
                  className="select-input"
                  type="file"
                  name="images"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={selectImage}
                />
              </label>
            )}
          </div>
          {error}
          <button onClick={addSubjectApi}>{loading ? "..." : "إضافة"}</button>
        </div>
        <div className="add_subject update_subject">
          <FontAwesomeIcon icon={faX} onClick={closeUpdateSubject} />
          <input
            type="text"
            placeholder="Enter Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="add_images">
            {prevImage ? <img src={prevImage} /> : null}
            <label>
              <p>اختر صورة جديدة</p>
              <input
                className="select-input"
                type="file"
                name="images"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={selectImage}
              />
            </label>
          </div>
          {error}
          <button onClick={updateSubjectApi}>
            {loading ? "..." : "تعديل"}
          </button>
        </div>
        <div className="delete_subject">
          <h3>Delete Subject</h3>
          <div className="delete_btn">
            <button onClick={deleteSubjectApi}>
              {loading ? "..." : "Delete"}
            </button>
            <button onClick={closeDeleteSubject}>Close</button>
          </div>
        </div>
        <div className="subjects_list">
          {loading
            ? "..."
            : allSubjects?.map((item) => {
                return (
                  <Link to={`/lectures/${item._id}`}>
                    <div className="subjects_item" key={item._id}>
                      <h3>{item.name}</h3>
                      <img src={item.image} />
                      <div className="subject_btn">
                        <button
                          onClick={() =>
                            openUpdateSubject(item._id, item.name, item.image)
                          }
                        >
                          Update
                        </button>
                        <button onClick={() => openDeleteSubject(item._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
};
export default Subjects;
