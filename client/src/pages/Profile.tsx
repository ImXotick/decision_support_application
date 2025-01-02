import { useState, useEffect } from "react";
import { getUserDetails } from "../api/apis";
import { IUser } from "../types";
import { Loading } from "../components";
import Card from "../components/ui/card";

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = await getUserDetails();
      setUser(user);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <Loading size={30} />
  ) : (
    <div className="w-full flex items-center justify-center p-20">
      <Card className="max-w-[500px] flex flex-col">
        <h1 className="font-bold text-lg pb-5">
          Hello, {user?.username || ""}
        </h1>
        <h1 className="font-bold text-lg">Nothing to see here yet! :)</h1>
      </Card>
    </div>
  );
};

export default Profile;
