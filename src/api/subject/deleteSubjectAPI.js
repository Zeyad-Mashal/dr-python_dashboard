const URL = "https://dr-python-mvm9.onrender.com/subject/remove/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const DeleteSubjectAPI = async (setError, setLoading, setAllSubjects, subjectId) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${subjectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            setAllSubjects(result.allSubjects)
            setLoading(false)
            document.querySelector(".delete_subject").style.display = "none";
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
export default DeleteSubjectAPI;