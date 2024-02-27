import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign, FaMoneyBillTrendUp } from "react-icons/fa6";

export default function Home() {
  const [isBlured, setIsBlured] = useState(true);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (typeof user !== "undefined") {
      if (user === null) {
        router.push("/auth/login");
      }
    }
  }, [user]);
  return (
    <main className="container mx-auto ">
      <div className="">
        <p className="text-center my-4 font-semibold">Balance</p>
        <div className="flex justify-center">
          <p
            onClick={() => setIsBlured(false)}
            className={`cursor-pointer flex justify-center items-center w-[200px] rounded-full bg-gray-400 ${
              isBlured ? "blur-text" : ""
            }`}>
            {user?.balance}
            <FaBangladeshiTakaSign />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 my-6">
        <div
          onClick={() => router.push(`/sendMoney/${user?._id}`)}
          className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Send Money</p>
        </div>
        <div className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Cash Out</p>
        </div>
        <div className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Cash In</p>
        </div>
        <div className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Balance</p>
        </div>
        <div className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Cash Request</p>
        </div>
        <div className="col-span-4 text-center cursor-pointer">
          <div className="flex justify-center mb-3">
            <FaMoneyBillTrendUp className="text-2xl text-orange-400" />
          </div>
          <p className="font-thin">Withdraw Request</p>
        </div>
      </div>
    </main>
  );
}
