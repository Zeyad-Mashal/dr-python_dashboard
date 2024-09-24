const URL = "https://back.dr-python.center/subject/get";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetSubjectAPI = async (setError, setLoading, setAllSubjects) => {
    setLoading(true)
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllSubjects(result.subjects)
            setLoading(false)
        } else {
            if (response.status == 500) {
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