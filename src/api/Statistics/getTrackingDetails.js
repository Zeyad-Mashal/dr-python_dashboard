const URL = "https://dr-python-mvm9.onrender.com/watchTracking/get/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const getTrackingDetails = async (setError, setGetLectureLoading, setDetails, studentId, lectureId, setMaxViwes) => {
    setGetLectureLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${lectureId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setMaxViwes(result.trackingRecords.lectureId.maxViews)
            setDetails(result.trackingRecords.videoWatchCounts)
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
export default getTrackingDetails;