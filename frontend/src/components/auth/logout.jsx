import { Button } from '../ui/button';
import React from 'react'
import useLogout from '@/hooks/use-logout'

function Logout() {

    const {loading, logoutUser} = useLogout();
    return (
        <div>
            <Button onClick={logoutUser}>
                {loading?'Logging Out':'Log Out'}
            </Button>
        </div>
    )
}

export default Logout