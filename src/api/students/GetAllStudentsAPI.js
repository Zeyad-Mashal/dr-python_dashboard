const URL = "https://dr-python-mvm9.onrender.com/user/get?role=Student&page=";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetAllStudentsAPI = async (setError, setGetStudent, setAllStudents, setTotalpage, setCurrentPage, newpage) => {
    setGetStudent(true)
    try {
        const response = await fetch(`${URL}${newpage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudents(result.users)
            setTotalpage(result.totalPages)
            setCurrentPage(result.page)
            setGetStudent(false)
        } else {
            if (response.status == 400) {
                setError(result.message);
                setGetStudent(false)
            } else {
                setError(response.message);
                setGetStudent(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetStudent(false)

    }
}
export default GetAllStudentsAPI;