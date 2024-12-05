const URL = "https://dr-python-mvm9.onrender.com/user/login";
const LoginAPI = async (data, setError) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("USER_TOKEN", result.token)
            window.location.reload()

        } else {
            if (response.status == 400) {
                setError(result.message);
            } else if (response.status == 403) {
                setError(result.message);
            } else {
                setError(result.message);
            }
        }
    } catch (error) {
        setError('An error occurred');
    }
}
export default LoginAPI;