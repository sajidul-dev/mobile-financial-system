import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="container mx-auto grid grid-cols-12 gap-6 my-6">
      <div className="col-span-4 text-center cursor-pointer">
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
    </main>
  );
}
