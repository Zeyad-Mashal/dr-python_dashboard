const URL = "https://back.dr-python.center/coordinator/get";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetCoordinatorsAPI = async (setError, setGetLoading, setAllCoordinators) => {
    setGetLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllCoordinators(result.coordinators)
            setGetLoading(false)
        } else {
            if (response.status == 500) {
                setError(result.message);
                setGetLoading(false)
            } else {
                setError(response.message);
                setGetLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetLoading(false)

    }
}
export default GetCoordinatorsAPI;