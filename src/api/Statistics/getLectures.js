const URL = "https://back.dr-python.center/dashboard/studentLectures/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getLectures = async (setError, setGetLectureLoading, setLectures, studentId, subjectId) => {
    setGetLectureLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {

            setLectures(result.lectures)
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
export default getLectures;