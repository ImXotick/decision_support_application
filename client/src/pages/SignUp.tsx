import { useState } from "react";
import { Field, Label, Input } from "@headlessui/react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import api from "../api/api";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/api/user/signup/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/login");
    } catch (error) {
      alert(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex items-center justify-center p-20">
      <Card className="max-w-[500px] flex flex-col">
        <h1 className="font-bold text-2xl mb-5">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <Field>
            <Label className="text-md font-medium text-gray-700">
              Username
            </Label>
            <Input
              required
              type="username"
              placeholder="Enter your username"
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
              className="block w-full rounded-lg  border border-border bg-background text-md py-4 px-3 mt-2"
            />
          </Field>
          <Field className="mt-2">
            <Input
              required
              type="password"
              placeholder="Repeat your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-lg  border border-border bg-background text-md py-4 px-3 mt-2"
            />
          </Field>
          <div className="flex justify-end mt-3">
            <NavLink to="/login">
              <p>Already have an account?</p>
            </NavLink>
          </div>
          <Button className="w-full mt-8">Sign Up</Button>
          {loading && <p>Loading...</p>}
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
