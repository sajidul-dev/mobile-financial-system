// import { SetCookies } from "@/components/shared/Cookies/Cookies";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
// import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type Inputs = {
  name: string;
  email: string;
  password: string;
  pin: number;
  phone: number;
  nid: File;
  role: string;
};

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    if (data) {
      axios
        .post("/api/auth/register", {
          name: data.name,
          email: data.email,
          pin: data.pin,
          phone: data.phone,
          role: data.role,
          nid: data.nid,
        })
        .then((res) => {
          if (res.data.user) {
            // SetCookies("user", res.data.user);
            // dispatch(setUser(res.data.user));
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
    return <Loading />;
  }

  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <div className="flex justify-between items-center">
          <p>Create your Mobile Finance Account</p>
          <p>
            Already member?{" "}
            <Link href="/auth/login" className="text-secondary">
              Login here
            </Link>{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("name", {
              required: { value: true, message: "Name is required" },
            })}
            type="text"
            placeholder="Enter your name"
            className="mt-4 w-full"
            error={errors?.name?.message}
          />
          <Input
            register={register("email", {
              required: { value: true, message: "Email is required" },
            })}
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full"
            error={errors?.email?.message}
          />
          <Input
            type="number"
            placeholder="Enter your mobile number"
            register={register("phone", {
              required: { value: true, message: "Mobile number is required" },
            })}
            className="my-4 w-full"
            error={errors?.phone?.message}
          />
          <Input
            type="number"
            placeholder="Enter your nid number"
            register={register("nid", {
              required: { value: true, message: "NID number is required" },
            })}
            className="my-4 w-full"
            error={errors?.phone?.message}
          />
          <Input
            type="password"
            placeholder="Enter your 5 digit pin"
            register={register("pin", {
              required: {
                value: true,
                message: "Pin is required",
              },
              minLength: 5,
              maxLength: 5,
              pattern: /^[0-9]+(\.[0-9]+)?$/,
            })}
            className="my-4 w-full"
            error={errors?.pin?.message}
          />
          <select
            {...register("role", {
              required: { value: true, message: "Role is required" },
            })}
            className="block w-full my-4 px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400">
            <option value="agent">Agent</option>
            <option value="user">User</option>
          </select>
          {errors?.role?.message && (
            <p className="text-red mt-1.5">{errors?.role?.message}</p>
          )}

          <Input
            type="submit"
            value="Sign up"
            className="cursor-pointer font-semibold w-full bg-green-500 hover:bg-opacity-70 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
