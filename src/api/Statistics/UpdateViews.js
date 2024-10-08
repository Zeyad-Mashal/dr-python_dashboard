const URL = "https://back.dr-python.center/watchTracking/update/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const UpdateViews = async (data, setError, setLoading, studentId, lectureId, setDetails, setMaxViwes) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${lectureId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            setMaxViwes(result.trackingRecords.lectureId.maxViews)
            setDetails(result.trackingRecords.videoWatchCounts)
            setLoading(false)
            document.querySelector(".views_counter_popup").style.display = "none";
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
export default UpdateViews;