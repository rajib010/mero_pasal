import { Button } from '../ui/button';
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '@/store/auth-slice';

function Logout() {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    return (
        <div>
            <Button onClick={()=>dispatch(logoutUser())}>
                {loading ? 'Logging Out' : 'Log Out'}
            </Button>
        </div>
    )
}

export default Logout