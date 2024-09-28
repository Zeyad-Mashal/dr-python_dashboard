import React, { useEffect, useState } from "react";
import "./Coordinator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faUserPen,
  faTrash,
  faBan,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import GetSubjectAPI from "../../api/subject/getAllSubjectsAPI";
import AddCoordinatorAPI from "../../api/Coordinator/AddCoordinatorAPI";
import getAllCoordinatorAPI from "../../api/Coordinator/getAllCoordinatorAPI";
import updateCoordinatorAPI from "../../api/Coordinator/updateCoordinatorAPI";
import CoordinatorSearchAPI from "../../api/Coordinator/CoordinatorSearchAPI";
import BlockCoordinatorAPI from "../../api/Coordinator/BlockCoordinatorAPI";
import DeleteCoodinatorAPI from "../../api/Coordinator/DeleteCoodinatorAPI";
const Coordinator = () => {
  useEffect(() => {
    getAllSubject();
    getAllCoordinatorsApi();
  }, []);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [addSubject, setAddSubject] = useState(false);
  const [updateSubject, setUpdateSubject] = useState(false);
  const [allCoordinators, setAllCoordinators] = useState([]);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [subjectsId, setSubjectsId] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalpage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [getCoordintaorLoading, setGetCoordintaorLoading] = useState(false);
  const [newpage, setNewpage] = useState(1);
  const [coordinatorId, setCoordinatorId] = useState("");
  const [searchedKey, setSearchedKey] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const addCoordinator = () => {
    document.querySelector(".addStudents").style.display = "flex";
  };

  const closeAddCoordinator = () => {
    document.querySelector(".addStudents").style.display = "none";
  };
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

  const handleRemoveSubject = (subjectName) => {
    const subjectId = allSubjects.filter((e) => e.name === subjectName)[0]._id;
    setSubjectsId(subjectsId.filter((subject) => subject !== subjectId));
    setSubjects(subjects.filter((subject) => subject !== subjectName));
  };
  const getAllSubject = () => {
    GetSubjectAPI(setError, setLoading, setAllSubjects);
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
  const handleAddCoordinator = () => {
    if (userName === "" || phone === "" || email === "" || password === "") {
      setError("Please fill all fields");
    } else {
      const data = {
        name: userName,
        email,
        password,
        phone,
        subjects: subjectsId,
      };
      AddCoordinatorAPI(
        data,
        setError,
        setLoading,
        setAllCoordinators,
        clearAll,
        currentPage,
        setTotalpage
      );
    }
  };
  const getAllCoordinatorsApi = () => {
    getAllCoordinatorAPI(
      setError,
      setGetCoordintaorLoading,
      setAllCoordinators,
      setTotalpage,
      setCurrentPage,
      newpage
    );
  };
  const openDelete = (coordinatorId) => {
    setCoordinatorId(coordinatorId);
    document.querySelector(".deleteStudent").style.display = "flex";
  };
  const closeDelete = () => {
    document.querySelector(".deleteStudent").style.display = "none";
  };
  const deleteCoordinator = () => {
    DeleteCoodinatorAPI(
      setError,
      setLoading,
      setAllCoordinators,
      coordinatorId,
      setTotalpage,
      currentPage
    );
  };
  const openBlock = (coordinatorId) => {
    setCoordinatorId(coordinatorId);
    document.querySelector(".blockStudent").style.display = "flex";
  };
  const closeBlock = () => {
    document.querySelector(".blockStudent").style.display = "none";
  };
  const openLogOut = (coordinatorId) => {
    setCoordinatorId(coordinatorId);
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
    coordinatorId
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
    setCoordinatorId(coordinatorId);
    document.querySelector(".updateStudent").style.display = "flex";
  };
  const closeUpdate = () => {
    document.querySelector(".updateStudent").style.display = "none";
  };
  const updateCoordinatorApi = () => {
    if (userName === "" || email === "" || password === "" || phone === "") {
      setError("Please Full All Inputs");
    } else {
      const data = {
        name: userName,
        email,
        password,
        phone,
        subjects: subjectsId,
      };
      updateCoordinatorAPI(
        data,
        setError,
        setLoading,
        setAllCoordinators,
        coordinatorId,
        currentPage
      );
    }
  };
  const SearchForCoordinators = (e) => {
    if (e.target.value === "") {
      getAllCoordinatorsApi();
      setSearchedKey(e.target.value);
    } else {
      setSearchedKey(e.target.value);
      CoordinatorSearchAPI(
        setError,
        setSearchLoading,
        setAllCoordinators,
        e.target.value
      );
    }
  };
  const previous = () => {
    if (currentPage != 1) {
      const newpage = parseInt(currentPage) - 1;
      getAllCoordinatorAPI(
        setError,
        setLoading,
        setAllCoordinators,
        setTotalpage,
        setCurrentPage,
        newpage
      );
    }
  };

  const next = () => {
    if (currentPage != totalPage) {
      const newpage = parseInt(currentPage) + 1;
      getAllCoordinatorAPI(
        setError,
        setLoading,
        setAllCoordinators,
        setTotalpage,
        setCurrentPage,
        newpage
      );
    }
  };
  const blockCoordinator = () => {
    BlockCoordinatorAPI(
      setError,
      setLoading,
      setAllCoordinators,
      coordinatorId,
      currentPage
    );
  };
  return (
    <section className="students">
      <div className="students_container">
        <div className="search_input">
          <input
            type="text"
            placeholder="بحث بالاسم او الرقم"
            value={searchedKey}
            onChange={SearchForCoordinators}
          />
          <button onClick={addCoordinator}>Coordinator</button>
        </div>

        <div className="addStudents">
          <FontAwesomeIcon icon={faX} onClick={closeAddCoordinator} />
          <h3>Coordinator</h3>
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
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Some Courses</option>
                {allSubjects.map((item) => {
                  return (
                    <option key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  );
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
          <button onClick={handleAddCoordinator}>
            {loading ? "loading..." : "Add"}
          </button>
        </div>

        {/* delete student */}
        <div className="deleteStudent">
          <h3>هل تريد حذف الطالب ؟</h3>
          {error}
          <div className="deleteStudent_btns">
            <button onClick={closeDelete}>Close</button>
            <button onClick={deleteCoordinator}>
              {loading ? "Loading..." : "Delete"}
            </button>
          </div>
        </div>

        {/* block student */}
        <div className="blockStudent">
          <h3>هل تريد حظر الطالب مؤقتاً؟</h3>
          <div className="blockStudent_btns">
            <button onClick={closeBlock}>Close</button>
            <button onClick={blockCoordinator}>Ok</button>
          </div>
        </div>

        {/* LogOut student */}
        <div className="logoutStudent">
          <h3>هل تريد تسجيل خروج هذا الطالب ؟</h3>
          <div className="logoutStudent_btns">
            <button onClick={closeLogOut}>Close</button>
            <button>Log Out</button>
          </div>
        </div>

        <div className="addStudents updateStudent">
          <FontAwesomeIcon icon={faX} onClick={closeUpdate} />
          <h3>Coordinator Update</h3>
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
          {error}
          <button onClick={updateCoordinatorApi}>
            {loading ? "Loading..." : "Update"}
          </button>
        </div>

        <div className="allStudents">
          {getCoordintaorLoading ? (
            "Loading ..."
          ) : (
            <table>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>

              {allCoordinators?.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
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
                            item._id
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

export default Coordinator;
