const URL = "https://back.dr-python.center/lecture/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const deleteLectureAPI = async (setError, setLoading, setAllLectures, subjectId, lectureId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${lectureId}/${subjectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllLectures(result.lectures)
            setLoading(false)
            document.querySelector(".delete_lecture").style.display = "none";
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
export default deleteLectureAPI;