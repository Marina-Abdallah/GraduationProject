import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import { toast } from "sonner";

function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthToken } = useAppContext();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    const roles = searchParams.get("roles");

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setAuthToken(token);
      toast.success("Login successful!");

      if (roles && roles.includes("Admin")) {
        navigate("/AdminDashboardPage");
      } else {
        navigate("/MyJobApplication");
      }
    } else {
      toast.error("Google login failed");
      navigate("/UserLogin");
    }
  }, [searchParams, navigate, setAuthToken]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#13206d' }}>
      <h2>Logging you in...</h2>
    </div>
  );
}

export default GoogleCallback;
