import { useEffect, useState } from "react";
import { Field, Label, Input } from "@headlessui/react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import api from "../api/api";
import { Loading } from "../components";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthorized, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      await checkAuth();

      navigate("/");
    } catch (error) {
      alert(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading size={40} />
  ) : (
    <div className="w-full flex items-center justify-center p-20">
      <Card className="max-w-[500px] flex flex-col">
        <h1 className="font-bold text-2xl mb-5">Login</h1>
        <form onSubmit={onSubmit}>
          <Field>
            <Label className="text-md font-medium text-gray-700">E-mail</Label>
            <Input
              required
              type="username"
              placeholder="Enter your e-mail"
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-lg border border-border bg-background text-md py-4 px-3 mt-2"
            />
          </Field>
          <Field className="mt-5">
            <Label className="text-md font-medium text-gray-700">
              Password
            </Label>
            <Input
              required
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-border bg-background text-md py-4 px-3 mt-2"
            />
          </Field>
          <div className="flex justify-between items-center text-sm mt-3">
            <p>forgot password?</p>
            <NavLink to="/signup">
              <p>Don't have an account?</p>
            </NavLink>
          </div>
          <Button className="w-full mt-8" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
