const URL = "https://dr-python-mvm9.onrender.com/subject/get";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const GetSubjectAPI = async (setError, setGetLoading, setAllSubjects) => {
    setGetLoading(true)
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
            setGetLoading(false)
        } else {
            if (response.status == 500) {
                setError(result.message);
                setGetLoading(false)
            } else {
                setError(response.message);
                setGetLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setGetLoading(false)

    }
}
export default GetSubjectAPI;