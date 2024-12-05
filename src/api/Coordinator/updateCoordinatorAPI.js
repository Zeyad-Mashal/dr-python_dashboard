const URL = "https://dr-python-mvm9.onrender.com/coordinator/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const updateCoordinatorAPI = async (data, setError, setLoading, setAllCoordinators, coordinatorId, currentPage) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${coordinatorId}/${currentPage}`, {
            method: 'PUT',
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
export default updateCoordinatorAPI;