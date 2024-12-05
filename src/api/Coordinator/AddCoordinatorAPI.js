const URL = "https://dr-python-mvm9.onrender.com/coordinator/add?page=";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const AddCoordinatorAPI = async (data, setError, setLoading, setAllCoordinators, clearAll, currentPage, setTotalpage) => {
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
            setAllCoordinators(result.coordinators)
            setLoading(false)
            clearAll();
            setTotalpage(result.totalPages)
            document.querySelector(".addStudents").style.display = "none"
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
export default AddCoordinatorAPI;