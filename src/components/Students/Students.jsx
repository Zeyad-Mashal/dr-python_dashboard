import React, { useEffect, useState } from "react";
import "./Students.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faUserPen,
  faTrash,
  faBan,
  faRightFromBracket,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import GetSubjectAPI from "../../api/subject/getAllSubjectsAPI";
import AddStudentsAPI from "../../api/students/AddStudentsAPI";
import GetAllStudentsAPI from "../../api/students/GetAllStudentsAPI";
import updateStudentAPI from "../../api/students/updateStudentAPI";
import BlockStudentAPI from "../../api/students/BlockStudentAPI";
import LogOutStudentAPI from "../../api/students/LogOutStudentAPI";
import StudentSearchAPI from "../../api/students/StudentSearchAPI";
import DeleteStudentAPI from "../../api/students/DeleteStudentAPI";
import GetCoordinatorsAPI from "../../api/students/GetCoordinatorsAPI";
import { Link } from "react-router-dom";
const Students = () => {
  useEffect(() => {
    getAllSubject();
    getAllStudents();
    getAllCoordinators();
  }, []);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectsId, setSubjectsId] = useState([]);
  const [addSubject, setAddSubject] = useState(false);
  const [updateSubject, setUpdateSubject] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPage, setTotalpage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [newpage, setNewpage] = useState(1);
  const [studentId, setStudentId] = useState("");
  const [searchedKey, setSearchedKey] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [getStudent, setGetStudent] = useState(false);
  const [allCoordinators, setAllCoordinators] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const handleAddSubject = () => {
    const subjectId = allSubjects.filter((e) => e.name === selectedSubject)[0]
      ._id;
    if (subjectId) {
      setSubjectsId([...subjectsId, subjectId]);
    }
    if (selectedSubject && !subjects.includes(selectedSubject)) {
      setSubjects([...subjects, selectedSubject]);
    } else {
      setError("Subject already added");
    }
  };
  const handleAddCoordinator = (e) => {
    const CoordinatorName = e.target.value;
    if (CoordinatorName === "Coordinator") {
      setCoordinatorName("Coordinator");
      return;
    }
    const coordinatorId = allCoordinators.filter(
      (e) => e.name === CoordinatorName
    )[0]._id;
    if (coordinatorId) {
      setCoordinatorId(coordinatorId);
    }
    if (CoordinatorName) {
      setCoordinatorName(CoordinatorName);
    } else {
      setError("Subject already added");
    }
  };

  const handleRemoveSubject = (subjectName) => {
    const subjectId = allSubjects.filter((e) => e.name === subjectName)[0]._id;
    setSubjectsId(subjectsId.filter((subject) => subject !== subjectId));
    setSubjects(subjects.filter((subject) => subject !== subjectName));
  };

  const getAllSubject = () => {
    GetSubjectAPI(setError, setLoading, setAllSubjects);
  };
  const addStudentAPI = () => {
    if (userName === "" || email === "" || password === "" || phone === "") {
      setError("Please Full All Inputs");
    } else {
      const data = {
        name: userName,
        email,
        password,
        phone,
        subjects: subjectsId,
        coordinatorId,
      };
      AddStudentsAPI(
        data,
        setError,
        setLoading,
        setAllStudents,
        clearAll,
        currentPage,
        setTotalpage
      );
    }
  };
  const getAllStudents = () => {
    GetAllStudentsAPI(
      setError,
      setGetStudent,
      setAllStudents,
      setTotalpage,
      setCurrentPage,
      newpage
    );
  };
  const updateStudent = () => {
    if (userName === "" || email === "" || password === "" || phone === "") {
      setError("Please Full All Inputs");
    } else {
      const data = {
        name: userName,
        email,
        password,
        phone,
        subjects: subjectsId,
        coordinatorId:
          coordinatorName != "Coordinator" ? coordinatorId : undefined,
      };
      updateStudentAPI(
        data,
        setError,
        setLoading,
        setAllStudents,
        studentId,
        currentPage,
        setUpdateSubject
      );
    }
  };

  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      GetAllStudentsAPI(
        setError,
        setLoading,
        setAllStudents,
        setTotalpage,
        setCurrentPage,
        newpage
      );
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      GetAllStudentsAPI(
        setError,
        setLoading,
        setAllStudents,
        setTotalpage,
        setCurrentPage,
        newpage
      );
    }
  };
  const clearAll = () => {
    setSubjectsId([]);
    setUserName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setSelectedSubject("");
    setSubjects([]);
  };
  const openDelete = (studentId) => {
    setStudentId(studentId);
    document.querySelector(".deleteStudent").style.display = "flex";
  };
  const closeDelete = () => {
    document.querySelector(".deleteStudent").style.display = "none";
  };
  const openBlock = (studentId) => {
    setStudentId(studentId);
    document.querySelector(".blockStudent").style.display = "flex";
  };
  const closeBlock = () => {
    document.querySelector(".blockStudent").style.display = "none";
  };
  const openLogOut = (studentId) => {
    setStudentId(studentId);
    document.querySelector(".logoutStudent").style.display = "flex";
  };
  const closeLogOut = () => {
    document.querySelector(".logoutStudent").style.display = "none";
  };
  const openUpdate = (
    userName,
    phone,
    email,
    password,
    subjects,
    studentId,
    coordinatorName
  ) => {
    const subjectsName = [];
    const subjectsIdArray = [];
    subjects.forEach((subject) => {
      subjectsName.push(subject.name);
      subjectsIdArray.push(subject._id);
    });

    setUserName(userName);
    setPhone(phone);
    setEmail(email);
    setPassword(password);
    setSubjects(subjectsName);
    setSubjectsId(subjectsIdArray);
    setStudentId(studentId);
    if (coordinatorName == undefined) {
      setCoordinatorName("Coordinator");
    } else {
      setCoordinatorName(coordinatorName);
    }
    document.querySelector(".updateStudent").style.display = "flex";
  };
  const closeUpdate = () => {
    document.querySelector(".updateStudent").style.display = "none";
  };
  const BlockStudent = () => {
    BlockStudentAPI(
      setError,
      setLoading,
      setAllStudents,
      studentId,
      currentPage
    );
  };
  const logOut = () => {
    LogOutStudentAPI(
      setError,
      setLoading,
      setAllStudents,
      studentId,
      currentPage
    );
  };
  const searchedStudents = (e) => {
    if (e.target.value === "") {
      getAllStudents();
      setSearchedKey(e.target.value);
    } else {
      setSearchedKey(e.target.value);
      StudentSearchAPI(
        setError,
        setSearchLoading,
        setAllStudents,
        e.target.value
      );
    }
  };
  const DeleteStudent = () => {
    DeleteStudentAPI(
      setError,
      setLoading,
      setAllStudents,
      studentId,
      setTotalpage,
      currentPage
    );
  };
  const openAddStudent = () => {
    setSubjectsId([]);
    setUserName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setSelectedSubject("");
    setSubjects([]);
    document.querySelector(".addStudents").style.display = "flex";
  };
  const closeAddStudent = () => {
    document.querySelector(".addStudents").style.display = "none";
  };
  const getAllCoordinators = () => {
    GetCoordinatorsAPI(setError, setGetLoading, setAllCoordinators);
  };
  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&";
    let newPassword = "";
    for (let i = 0; i < 5; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(newPassword); // Set the generated password
  };

  return (
    <section className="students">
      <div className="students_container">
        <div className="search_input">
          <input
            type="text"
            placeholder="بحث بأسم و رقم الطالب"
            value={searchedKey}
            onChange={searchedStudents}
          />
          <button onClick={openAddStudent}>Add Student</button>
        </div>

        {/* delete student */}
        <div className="deleteStudent">
          <h3>هل تريد حذف الطالب ؟</h3>
          {error}
          <div className="deleteStudent_btns">
            <button onClick={closeDelete}>Close</button>
            <button onClick={DeleteStudent}>
              {loading ? "Loading..." : "Delete"}
            </button>
          </div>
        </div>

        {/* block student */}
        <div className="blockStudent">
          <h3>هل تريد حظر الطالب مؤقتاً؟</h3>
          <div className="blockStudent_btns">
            <button onClick={closeBlock}>Close</button>
            <button onClick={BlockStudent}>Ok</button>
          </div>
        </div>

        {/* LogOut student */}
        <div className="logoutStudent">
          <h3>هل تريد تسجيل خروج هذا الطالب ؟</h3>
          <div className="logoutStudent_btns">
            <button onClick={closeLogOut}>Close</button>
            <button onClick={logOut}>Log Out</button>
          </div>
        </div>

        {/* {addSubject ? ( */}
        <div className="addStudents">
          <FontAwesomeIcon icon={faX} onClick={closeAddStudent} />
          <h3>أضافة طالب</h3>
          <div className="addStudent_list">
            <div className="inputs_top">
              <input
                type="text"
                placeholder="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="inputs_bottom">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={generatePassword} className="generatePassword">
                Generate
              </button>
            </div>

            <div className="addSubjects_array">
              <select value={coordinatorName} onChange={handleAddCoordinator}>
                <option value="Coordinator">Coordinator</option>
                {allCoordinators.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                {allSubjects.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
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
          {error}
          <button onClick={addStudentAPI}>
            {loading ? "Loading..." : "Add"}
          </button>
        </div>

        <div className="addStudents updateStudent">
          <FontAwesomeIcon icon={faX} onClick={closeUpdate} />
          <h3>تعديل طالب</h3>
          <div className="addStudent_list">
            <div className="inputs_top">
              <input
                type="text"
                placeholder="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="inputs_bottom">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="addSubjects_array">
              <select value={coordinatorName} onChange={handleAddCoordinator}>
                <option value="Coordinator">Coordinator</option>
                {allCoordinators.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                {allSubjects.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
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
          {error}
          <button onClick={updateStudent}>
            {loading ? "Loading..." : "Update"}
          </button>
        </div>

        <div className="allStudents">
          {searchLoading ? (
            <div className="loader_div">
              <span class="loader"></span>
            </div>
          ) : getStudent ? (
            <div className="loader_div">
              <span class="loader"></span>
            </div>
          ) : (
            <table>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
                <th>Statistics</th>
              </tr>
              {allStudents.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>*******</td>
                    <td className="student_info">
                      <FontAwesomeIcon
                        icon={faUserPen}
                        onClick={() =>
                          openUpdate(
                            item.name,
                            item.phone,
                            item.email,
                            item.password,
                            item.subjects,
                            item._id,
                            item?.coordinator?.name
                          )
                        }
                        className="updateStudent"
                      />

                      <FontAwesomeIcon
                        icon={faBan}
                        onClick={() => openBlock(item._id)}
                        className={item.isBlocked ? "activeBlock" : ""}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => openDelete(item._id)}
                        className="deleteStudentBtn"
                      />
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        onClick={() => openLogOut(item._id)}
                      />
                    </td>
                    <td>
                      <Link to={`/statistics/${item._id}`}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div className="pagination">
          <button onClick={next}>Next</button>
          <span>{currentPage}</span>
          <button onClick={previous}>Previous</button>
        </div>
      </div>
    </section>
  );
};
export default Students;
