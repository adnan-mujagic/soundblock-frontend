import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthenticatedRoute(token) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log(
        "Tried to access authenticated route without token, redirecting to landing page"
      );
      navigate("/");
    }
  }, []);
}
