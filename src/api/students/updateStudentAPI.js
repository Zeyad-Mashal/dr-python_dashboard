const URL = "https://dr-python-mvm9.onrender.com/student/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const updateStudentAPI = async (data, setError, setLoading, setAllStudents, studentId, currentPage, setUpdateSubject) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${currentPage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudents(result.students)
            setLoading(false)
            setUpdateSubject(false)
            document.querySelector(".updateStudent").style.display = "none";
        } else {
            if (response.status == 404) {
                setError(result.message);
                setLoading(false)
            } else if (response.status == 400) {
                setError(response.message);
                setLoading(false)
            } else {
                setError(response.message);
                setLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)

    }
}
export default updateStudentAPI;