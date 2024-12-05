const URL = "https://dr-python-mvm9.onrender.com/lecture/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const UpdateLectureAPI = async (data, setError, setLoading, setAllLectures, subjectId, lectureId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${lectureId}/${subjectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            setAllLectures(result.lectures)
            setLoading(false)
            document.querySelector(".update_lecture").style.display = "none";
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
export default UpdateLectureAPI;