export default function Logout({loggedInStatus}){
    function handleOnSumbit(){
         localStorage.clear();
         loggedInStatus(false);
    }
    return (
        <> 
            <p>You are logged in</p>
            <button onClick={handleOnSumbit}>Logout</button>
        </>
    )
}