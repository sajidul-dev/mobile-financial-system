import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdPolicy, MdPrivacyTip } from "react-icons/md";

type Inputs = {
  amount: string;
  phone: number;
};

const SendMoney = () => {
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const router = useRouter();
  const userId = router.query.id;
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios
      .post("/api/sendMoney/sendMoney", {
        sender: user?.phone,
        reciever: data.phone,
        amount: data.amount,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    // let user;
    // if (loginType == "email") {
    //   user = {
    //     email: data.email,
    //     pin: data.pin,
    //   };
    // } else {
    //   user = {
    //     phone: data.phone,
    //     pin: data.pin,
    //   };
    // }
    // if (data) {
    //   axios
    //     .post("/api/auth/login", user)
    //     .then((res) => {
    //       if (res.data.user) {
    //         localStorage.setItem("user", JSON.stringify(res.data.user));
    //         dispatch(setUser(res.data.user));
    //         setLoading(false);
    //         router.push("/");
    //       } else if (res.data.shop) {
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
  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div className="container mx-auto my-6">
      <p className="text-2xl text-center my-4">Send Money</p>
      <div className="flex gap-6">
        <div>
          <div className="flex mr-2">
            <MdPrivacyTip className="text-2xl" />
            <p>Terms and Condition-</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center mr-2">
              <MdPolicy className="text-2xl" />
              <p className="font-thin">
                The minimum amount allowed for sending money is 50 taka.
              </p>
            </div>
            <div className="flex items-center mr-2">
              <MdPolicy className="text-2xl" />
              <p className="font-thin">
                For transactions over 100 taka, a send-money fee of 5 taka will
                be charged per transaction.
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[700px] mx-auto">
          <Input
            register={register("phone", {
              required: { value: true, message: "Phone number is required" },
            })}
            type={"number"}
            placeholder="Enter recipient's phone number"
            className="mt-4 w-full"
            label="Recipient's phone number"
            error={errors.phone?.message}
          />
          <Input
            register={register("amount", {
              required: { value: true, message: "Amount is required" },
              onChange: (e) => {
                setError("amount", { message: "" });
                setUpdatedAmount(Number(e.target.value));

                if (user && e.target.value > user?.balance) {
                  return setError("amount", {
                    message: "Insufficient Balance",
                  });
                }
                if (e.target.value > 100) {
                  setUpdatedAmount(Number(e.target.value) + 5);
                } else {
                  setUpdatedAmount(Number(e.target.value));
                }
              },
            })}
            type="number"
            placeholder="Enter amount"
            className="my-4 w-full"
            label="Amount"
            error={errors.amount?.message}
          />
          <div className="flex justify-between my-4">
            <div>
              <p>Amount</p>
              <div className="flex items-center">
                <FaBangladeshiTakaSign />
                {updatedAmount > 100 ? updatedAmount - 5 : updatedAmount}
              </div>
            </div>
            <div>
              <p>Charge</p>
              <div className="flex items-center">
                <FaBangladeshiTakaSign />
                {updatedAmount > 100 ? 5 : 0}
              </div>
            </div>
            <div>
              <p>Total</p>
              <div className="flex items-center">
                <FaBangladeshiTakaSign />
                {updatedAmount}
              </div>
            </div>
            <div>
              <p>Available</p>
              <div className="flex items-center">
                <FaBangladeshiTakaSign />
                {Number(user?.balance) - Number(updatedAmount)}
              </div>
            </div>
          </div>
          <Input
            type="submit"
            value="Click here to sent money"
            className="cursor-pointer font-semibold w-full bg-green-500 hover:bg-opacity-70 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
