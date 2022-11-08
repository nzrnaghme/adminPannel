
const ProtectedRoute = ({
    isAllowed,
    dataUser,
    redirectPath = paths.LOGIN,
    children,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    if (dataUser) {
        return children ? children : <StudentPanel />;
    }
}

export default ProtectedRoute;