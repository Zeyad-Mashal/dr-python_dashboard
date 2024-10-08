const URL = "https://back.dr-python.center/dashboard/studentSubjects/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getSubject = async (setError, setGetLectureLoading, setSubjects, studentId) => {
    setGetLectureLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {

            setSubjects(result.subjects)
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
export default getSubject;