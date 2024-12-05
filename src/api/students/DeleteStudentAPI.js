const URL = "https://dr-python-mvm9.onrender.com/student/delete/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const DeleteStudentAPI = async (setError, setLoading, setAllStudents, studentId, setTotalpage, currentPage) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${currentPage}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudents(result.students)
            setLoading(false)
            document.querySelector(".deleteStudent").style.display = "none";
            setTotalpage(result.totalPages)

        } else {
            if (response.status == 404) {
                setError(result.message);
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
export default DeleteStudentAPI;