import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../utils/auth";
import List from "../components/Lists/List";

const ListPage = () => {
  const navigate = useNavigate();
  const { listNumber } = useParams<{ listNumber?: string }>();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const parsedListNumber = parseInt(listNumber || "");

  return (
    <div className="z-5 h-screen w-screen flex flex-col bg-gray-900">
      {!isNaN(parsedListNumber) && <List listId={parsedListNumber} />}
    </div>
  );
};

export default ListPage;
