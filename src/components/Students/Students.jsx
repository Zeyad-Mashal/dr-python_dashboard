import React, { useState } from "react";
import "./Students.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const Students = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [addSubject, setAddSubject] = useState(false);
  const [updateSubject, setUpdateSubject] = useState(false);
  const handleAddSubject = () => {
    if (selectedSubject && !subjects.includes(selectedSubject)) {
      setSubjects([...subjects, selectedSubject]);
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToRemove));
  };
  return (
    <section className="students">
      <div className="students_container">
        <div className="search_input">
          <input type="text" placeholder="بحث بأسم و رقم الطالب" />
          {/* <button onClick={() => setAddSubject(true)}>إضافة طالب</button> */}
        </div>
        {openDetails ? (
          <div className="student_details">
            <FontAwesomeIcon icon={faX} onClick={() => setOpenDetails(false)} />
            <h3>بيانات الطالب</h3>
            <div className="details_top">
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
            </div>
            <div className="details_bottom">
              <p>example1@gmail.com</p>
              <p>zyad5080@</p>
            </div>
            <div className="all_subjects">
              <select>
                <option value="programming">programming</option>
                <option value="programming">programming</option>
                <option value="programming">programming</option>
              </select>
            </div>
            <div className="student_btns">
              <button>Delete</button>
              <button onClick={() => setUpdateSubject(true)}>Update</button>
              <button>Block</button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* {addSubject ? ( */}
        <div className="addStudents">
          <FontAwesomeIcon icon={faX} onClick={() => setAddSubject(false)} />
          <h3>أضافة طالب</h3>
          <div className="addStudent_list">
            <div className="inputs_top">
              <input type="text" placeholder="userName" />
              <input type="text" placeholder="Phone" />
            </div>
            <div className="inputs_bottom">
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Password" />
            </div>
            <div className="addSubjects_array">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                <option value="programming">Programming</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
              </select>
              <button onClick={handleAddSubject}>+</button>
            </div>
            <div className="array_container">
              {subjects.map((subject, index) => (
                <>
                  <p key={index}>{subject}</p>
                  <button onClick={() => handleRemoveSubject(subject)}>
                    X
                  </button>
                </>
              ))}
            </div>
          </div>
          <button>إضافة</button>
        </div>
        {/* ) : (
          ""
        )} */}

        {updateSubject ? (
          <div className="addStudents">
            <FontAwesomeIcon
              icon={faX}
              onClick={() => setUpdateSubject(false)}
            />
            <h3>تعديل بيانات الطالب</h3>
            <div className="addStudent_list">
              <div className="inputs_top">
                <input type="text" placeholder="userName" />
                <input type="text" placeholder="Phone" />
              </div>
              <div className="inputs_bottom">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
              </div>
              <div className="addSubjects_array">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Select a subject</option>
                  <option value="programming">Programming</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                </select>
                <button onClick={handleAddSubject}>+</button>
              </div>
              <div className="array_container">
                {subjects.map((subject, index) => (
                  <>
                    <p key={index}>{subject}</p>
                    <button onClick={() => handleRemoveSubject(subject)}>
                      X
                    </button>
                  </>
                ))}
              </div>
            </div>
            <button>إضافة</button>
          </div>
        ) : (
          ""
        )}

        <div className="allStudents">
          <table>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
            <tr onClick={() => setOpenDetails(!openDetails)}>
              <td>Zeyad Mashaal</td>
              <td>01205222331</td>
              <td>example1@gmail.com</td>
              <td>aaa001</td>
            </tr>
          </table>
          {/* <div className="adllStudents_list">
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
            <div
              className="allStudents_item"
              onClick={() => setOpenDetails(true)}
            >
              <p>Zeyad Ahmed</p>
              <p>01205222331</p>
              <p>example1@gmail.com</p>
              <p>more</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};
export default Students;
