import React, { useState } from "react";
import image from "../../images/logo.png";
import "./Subjects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
const Subjects = () => {
  const [prevImage, setPrevImage] = useState("");
  const [imageURL, setImageURL] = useState("");
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
  return (
    <section className="subjects">
      <div className="subjects_container">
        <button onClick={openAddSubject}>Add Subjects</button>
        <div className="add_subject">
          <FontAwesomeIcon icon={faX} onClick={closeAddSubject} />
          <input type="text" placeholder="Enter Subject Name" />
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
          <button>إضافة</button>
        </div>
        <div className="subjects_list">
          <div className="subjects_item">
            <h3>Mathematics</h3>
            <img src={image} alt="" />
          </div>
          <div className="subjects_item">
            <h3>Mathematics</h3>
            <img src={image} alt="" />
          </div>
          <div className="subjects_item">
            <h3>Mathematics</h3>
            <img src={image} alt="" />
          </div>
          <div className="subjects_item">
            <h3>Mathematics</h3>
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Subjects;
