import { useAuthStore } from "../../store/useAuthStore";

function UserDashboard() {
  const { logout } = useAuthStore();
  return (

    <div className="z-10">
    Dashboard
    <button onClick={logout}>logout</button>  
    </div>
  );
}
export default UserDashboard