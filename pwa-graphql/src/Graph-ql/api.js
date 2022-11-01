
export const fetchGraphQlApi = async (query,data) => {
    let auth = localStorage.getItem('token')
    let headers = {"Content-Type": "application/json"}
    if(auth){
        headers['Authorization'] = auth
    }
    return await fetch('http://localhost:4001/graphql',
        {
            method:'POST',
            headers: headers,
            body: JSON.stringify({
                query: query,
                variables: data
            })
        }
        )
}