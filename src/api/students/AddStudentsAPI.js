const URL = "https://back.dr-python.center/student/register?page=";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const AddStudentsAPI = async (data, setError, setLoading, setAllStudents, clearAll, currentPage, setTotalpage) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${currentPage}`, {
            method: 'POST',
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
            clearAll();
            setTotalpage(result.totalPages)
            document.querySelector(".addStudents").style.display = "none";
        } else {
            if (response.status == 400) {
                setError(result.message);
                setLoading(false)
            } else if (response.status == 500) {
                setError(response.message);
                setLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)
    }
}
export default AddStudentsAPI;