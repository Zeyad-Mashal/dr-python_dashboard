const URL = "https://dr-python-mvm9.onrender.com/lecture/add/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const AddLectureAPI = async (data, setError, setLoading, setAllLectures, subjectId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}`, {
            method: 'POST',
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
            document.querySelector(".add_lecture").style.display = "none";
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
export default AddLectureAPI;