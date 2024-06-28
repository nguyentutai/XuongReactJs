import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductProvider";
import { Link } from "react-router-dom";

function Home() {
  const { products, dispathProducts } = useContext(ProductContext);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        dispathProducts({
          type: "SET_PRODUCT",
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mt-[100px] container mx-auto">
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-3 mt-10">
          <div className="py-6 rounded-md shadow hidden md:block">
            <h2 className="text-xl ms-5 font-semibold mb-5">Category</h2>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Áo Polo</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Áo Thun</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Áo Tay Dài</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Áo Nữ</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Áo Nam</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Quần Jean</span>
            </Link>
            <Link
              to={""}
              className="flex items-center gap-3 mt-3 mx-5 hover:bg-[#d6d6d6] cursor-pointer p-3 transition-all rounded"
            >
              <span className="text-black font-normal">Quần Âu</span>
            </Link>
          </div>
        </div>
        <div className="col-span-9 m-0">
          <div className="flex flex-wrap justify-around w-[100%]">
            {products?.map((product) => (
              <div
                key={product.id}
                className="w-[30%] rounded shadow p-4 mt-10"
              >
                <img
                  className="max-w-[100%] mx-auto rounded-md h-[250px]"
                  src={product.thumbnail}
                  alt=""
                />
                <p className="my-2 ms-2 text-red-500 font-semibold">
                  ${product.price}
                </p>
                <p className="mb-4 ms-2">{product.title}</p>
                <div className="flex gap-2 items-center justify-around mt-3">
                  <button className="bg-red-500 text-white font-semibold rounded p-3 py-1">
                    Thêm giỏ hàng
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-500 text-white font-semibold rounded text-center p-3 py-1"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
