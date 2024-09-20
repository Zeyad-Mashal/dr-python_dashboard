import React, { useState } from "react";
import "./Coordinator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const Coordinator = () => {
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
          <input type="text" placeholder="بحث بالاسم او الرقم" />
          <button onClick={() => setAddSubject(true)}>Coordinator</button>
        </div>
        {openDetails ? (
          <div className="student_details">
            <FontAwesomeIcon icon={faX} onClick={() => setOpenDetails(false)} />
            <h3>Coordinator Details</h3>
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

        {addSubject ? (
          <div className="addStudents">
            <FontAwesomeIcon icon={faX} onClick={() => setAddSubject(false)} />
            <h3>Coordinator</h3>
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
                  <option value="">Select Some Courses</option>
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
            <button>Update</button>
          </div>
        ) : (
          ""
        )}

        {updateSubject ? (
          <div className="addStudents">
            <FontAwesomeIcon
              icon={faX}
              onClick={() => setUpdateSubject(false)}
            />
            <h3>Coordinator Update</h3>
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
                  <option value="">Select a Courses</option>
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
            <button>Update</button>
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
          </table>
        </div>
      </div>
    </section>
  );
};

export default Coordinator;
