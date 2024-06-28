import { Link } from "react-router-dom";
import styles from "./listpro.module.scss";
import IProducts from "../../../interfaces/IProducts";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../contexts/ProductProvider";

const ListProduct = () => {
  const { products, dispathProducts } = useContext(ProductContext);
  const [fillterPro, setFilterPro] = useState<IProducts[]>([]);
  const [value, setValue] = useState("");

  const [arrange, setArrange] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        dispathProducts({
          type: "SET_PRODUCT",
          payload: data,
        });
        setFilterPro(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deletePro(id: string) {
    fetch("http://localhost:3000/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispathProducts({
        type: "DELETE_PRODUCT",
        payload: id,
      });
    });
  }
  useEffect(() => {
    let filterProduct = [...products];
    if (value) {
      filterProduct = filterProduct.filter((pro: IProducts) =>
        pro.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (arrange === "ascending") {
      filterProduct.sort((a: IProducts, b: IProducts) => a.price - b.price);
    }
    if (arrange === "descending") {
      filterProduct.sort((a: IProducts, b: IProducts) => b.price - a.price);
    }

    setFilterPro(filterProduct);
  }, [value, arrange, products]);
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <div className="bg-blue-700 w-44 text-center py-[9px] rounded mb-1">
          <Link className={styles.addpro} to={"product-form"}>
            Thêm sản phẩm
          </Link>
        </div>
        <div>
          <select
            name=""
            value={arrange}
            onChange={(e) => setArrange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id=""
          >
            <option value="">Sắp xếp</option>
            <option value="ascending">Giá tăng dần</option>
            <option value="descending">Giá giảm dần</option>
          </select>
        </div>
        <div>
          <input
            type="search"
            className="block p-2 text-sm w-[300px] text-gray-900 border outline-none focus:border-gray-300 border-gray-300 rounded-lg bg-gray-50"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tìm kiếm sản phẩm ..."
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {fillterPro.length > 0 ? (
              fillterPro.map((product: IProducts, index: number) => (
                <tr key={index} className={styles.table_header}>
                  <td className="px-6 py-4">{index}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.title}
                  </th>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">
                    <img src={product.thumbnail} alt="" />
                  </td>
                  <td className="px-6 py-4 flex mt-[30px]">
                    <Link
                      to={`product-form/${product.id}`}
                      className="bg-blue-600 px-2 py-1 ms-2 rounded text-white no-underline"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-600 px-2 py-1 ms-2 rounded text-white"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          deletePro(product.id! as string);
                        }
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-red-500">
                  Không có sản phẩm bạn cần tìm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
