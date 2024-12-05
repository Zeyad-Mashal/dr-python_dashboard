const URL = "https://dr-python-mvm9.onrender.com/user/get?role=Coordinator&page=";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getAllCoordinatorAPI = async (setError, setGetCoordintaorLoading, setAllCoordinators, setTotalpage, setCurrentPage, newpage) => {
    setGetCoordintaorLoading(true)
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
            setAllCoordinators(result.users)
            setTotalpage(result.totalPages)
            setCurrentPage(result.page)
            setGetCoordintaorLoading(false)
        } else {
            if (response.status == 400) {
                setError(result.message);
                setGetCoordintaorLoading(false)
            } else {
                setError(response.message);
                setGetCoordintaorLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetCoordintaorLoading(false)

    }
}
export default getAllCoordinatorAPI;