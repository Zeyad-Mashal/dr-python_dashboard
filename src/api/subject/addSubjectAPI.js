const URL = "https://dr-python-mvm9.onrender.com/subject/add";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const AddSubjectAPI = async (data, setError, setLoading, setAllSubjects) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                "authorization": `drpz0${USER_TOKEN}`
            },
            body: data
        });

        const result = await response.json();

        if (response.ok) {
            setAllSubjects(result.allSubjects)
            setLoading(false)
            document.querySelector(".add_subject").style.display = "none";
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
export default AddSubjectAPI;