// import { SetCookies } from "@/components/shared/Cookies/Cookies";
import Input from "@/components/shared/Input/Input";
import Image from "next/image";
// import { setUser } from "@/redux/slice/userSlice/userSlice";
// import axios from "axios";
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
  const [userImage, setUserImage] = useState<string | null>(null);
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
    // setLoading(true);
    // if (data) {
    //   axios
    //     .post("/api/auth/register", {
    //       name: data.name,
    //       email: data.email,
    //       password: data.password,
    //     })
    //     .then((res) => {
    //       if (res.data.user) {
    //         SetCookies("user", res.data.user);
    //         dispatch(setUser(res.data.user));
    //         setLoading(false);
    //         router.push("/");
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       toast.error(`${err.response.data.message}`);
    //     });
    // }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <div className="flex justify-between items-center">
          <p>Create your Mobile Finance Account</p>
          <p>
            Already member?{" "}
            <Link href="/auth/login" className="text-secondary">
              Login
            </Link>{" "}
            here
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
              required: { value: true, message: "Mobile numeber is required" },
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
            <option value="">Agent</option>
            <option value="">User</option>
          </select>
          {errors?.role?.message && (
            <p className="text-red mt-1.5">{errors?.role?.message}</p>
          )}
          <label>
            <div className=" p-4 transition bg-white border border-[#E2E2E2] rounded-md appearance-none cursor-pointer my-4">
              <div className="py-4">
                {userImage ? (
                  <Image
                    width={300}
                    height={300}
                    src={userImage}
                    alt=""
                    className="w-full mx-auto"
                  />
                ) : (
                  <Image
                    width={300}
                    height={300}
                    src="/images/sample-nid.webp"
                    alt="profile"
                  />
                )}
              </div>

              <p className="text-[#7F7F7F] text-sm">
                Please upload only formats as jpg, jpeg, png.
              </p>
              <input
                type="file"
                className="hidden"
                {...register("nid", {
                  onChange: (e) => {
                    const url: string = URL.createObjectURL(e.target.files[0]);
                    setUserImage(url);
                    // setValue("nid", e.target.files[0]);
                  },
                })}
              />
              <p className="text-red mt-1.5">{errors?.nid?.message}</p>
            </div>
          </label>

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
