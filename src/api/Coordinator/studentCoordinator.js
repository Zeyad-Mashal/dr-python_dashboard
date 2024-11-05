const URL = "https://back.dr-python.center/coordinator/studentCount/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const studentCoordinator = async (setError, setGetCoordintaorLoading, setAllStudentCoordinator, coordinatorId, setCounter) => {
    setGetCoordintaorLoading(true)
    try {
        const response = await fetch(`${URL}${coordinatorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudentCoordinator(result.students)
            setCounter(result.count)
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
export default studentCoordinator;