const URL = "https://dr-python-mvm9.onrender.com/user/search?role=Student&q=";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const StudentSearchAPI = async (setError, setSearchLoading, setAllStudents, searchedKey) => {
    setSearchLoading(true)
    try {
        const response = await fetch(`${URL}${searchedKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudents(result.users)
            setSearchLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message);
                setSearchLoading(false)
            } else {
                setError(response.message);
                setSearchLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setSearchLoading(false)

    }
}
export default StudentSearchAPI;