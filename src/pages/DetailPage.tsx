import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProducts from "../interfaces/IProducts";
import instance from "../axios";

export default function DetailPage() {
  const [detail, setDetail] = useState({} as IProducts);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products/" + id);
        setDetail(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  return (
    <>
      <div className="mt-28 max-w-screen-2xl container mx-auto xl:px-28 px-4">
        <div className="p-3 max-w-7xl m-auto">
          <h1 className="text-[28px] font-semibold">
            Sản phẩm: {detail.title}
          </h1>
          <div className="mt-6 sm:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 h-max">
              <div className="shadow-lg rounded-xl p-10">
                <img
                  src={detail.thumbnail}
                  className="w-full min-h-[200px] "
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-[20px]">{detail.title}</h1>
                <p className="my-3 text-gray-600 text-base leading-6 text-justify sm:text-left sm:mt-4">
                  {detail.description}
                </p>
                <p className="text-xl text-red-500 font-semibold sm:text-2xl">
                  ${detail.price}
                </p>
                <div className="mt-4">
                  <div className="text-left flex flex-col gap-2 w-full">
                    <label htmlFor="" className="font-semibold">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-full text-left my-4">
                    <button className="flex  justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6">
                      <span>Confirm Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
