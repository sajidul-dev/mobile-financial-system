// import { SetCookies } from "@/components/shared/Cookies/Cookies";
// import Input from "@/components/shared/Input/Input";
// import Loading from "@/components/shared/Loading/Loading";
// import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
// import { setUser } from "@/redux/slice/userSlice/userSlice";
// import axios from "axios";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email?: string;
  pin: string;
  phone?: number;
};

const Login = () => {
  const [loginType, setLoginType] = useState("email");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    let user;
    if (loginType == "email") {
      user = {
        email: data.email,
        pin: data.pin,
      };
    } else {
      user = {
        phone: data.phone,
        pin: data.pin,
      };
    }
    if (data) {
      axios
        .post("/api/auth/login", user)
        .then((res) => {
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(setUser(res.data.user));
            setLoading(false);
            router.push("/");
          } else if (res.data.shop) {
            setLoading(false);
            router.push("/");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.response.data.message}`);
        });
    }
  };
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <div className="flex justify-between items-center">
          <p>Welcome to Mobile Finance! Please login.</p>
          <p>
            New member?{" "}
            <Link href="/auth/register" className="text-secondary">
              Register here
            </Link>{" "}
          </p>
        </div>
        <div className="flex w-full my-3">
          <p
            onClick={() => setLoginType("email")}
            className={`w-1/2 p-4 border-2 shadow-lg rounded-lg cursor-pointer ${
              loginType == "email" ? "bg-green-500" : ""
            }`}>
            Login with email
          </p>
          <p
            onClick={() => setLoginType("phone")}
            className={`w-1/2 p-4 border-2 shadow-lg rounded-lg cursor-pointer ${
              loginType == "phone" ? "bg-green-500" : ""
            }`}>
            Login with phone
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register(loginType === "email" ? "email" : "phone")}
            type={loginType === "email" ? "email" : "number"}
            placeholder={
              loginType === "email"
                ? "Enter your email"
                : "Enter your phone number"
            }
            className="mt-4 w-full"
          />
          <Input
            register={register("pin")}
            type="password"
            placeholder="Enter your password"
            className="my-4 w-full"
          />
          <Input
            type="submit"
            value="Log in"
            className="cursor-pointer font-semibold w-full bg-green-500 hover:bg-opacity-70 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
