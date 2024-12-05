const URL = "https://dr-python-mvm9.onrender.com/lecture/get/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetSubjectAPI = async (setError, setGetLectureLoading, setAllLectures, subjectId) => {
    setGetLectureLoading(true)
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
            setGetLectureLoading(false)
        } else {
            if (response.status == 404) {
                setError(result.message);
                setGetLectureLoading(false)
            } else {
                setError(response.message);
                setGetLectureLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetLectureLoading(false)

    }
}
export default GetSubjectAPI;