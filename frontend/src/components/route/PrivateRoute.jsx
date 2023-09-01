import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth); // get user data from state

    return (
        userInfo ? <Outlet /> : <Navigate to='/login' replace />
    )
}

export default PrivateRoute