const URL = "https://back.dr-python.center/subject/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const UpdateSubjectAPI = async (data, setError, setLoading, setAllSubjects, subjectId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}`, {
            method: 'PUT',
            headers: {
                "authorization": `drpz0${USER_TOKEN}`
            },
            body: data
        });

        const result = await response.json();

        if (response.ok) {
            setAllSubjects(result.allSubjects)
            setLoading(false)
            document.querySelector(".update_subject").style.display = "none";
        } else {
            if (response.status == 400) {
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
export default UpdateSubjectAPI;