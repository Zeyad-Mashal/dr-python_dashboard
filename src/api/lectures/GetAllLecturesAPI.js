const URL = "https://back.dr-python.center/lecture/get/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetSubjectAPI = async (setError, setLoading, setAllLectures, subjectId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllLectures(result.lectures)
            setLoading(false)
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
export default GetSubjectAPI;