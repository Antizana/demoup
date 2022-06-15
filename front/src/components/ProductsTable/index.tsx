import { useState, useEffect, memo } from "react";

const ProductsTable = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentProducts, setCurrentProducts] = useState({} as Products);

  // const { REACT_APP_SERVER_URL } = process.env;
  const REACT_APP_SERVER_URL = "";
  const baseURL = REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

  const fetchProducts = () => {
    fetch(`${baseURL}/products`)
      .then((response) => {
        return response.json();
      })
      .then((data: Products[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    setCurrentProducts({} as Products);
  }, []);

  const setActiveProducts = (customer: Products, index: number) => {
    setCurrentProducts(customer);
    setCurrentIndex(index);
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-lg-4 w-25 p-3">
          <h3>products</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">I18N Name</th>
                    <th scope="col">Model Number</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr
                        className={
                          index === currentIndex ? "table-primary " : ""
                        }
                        onClick={() => setActiveProducts(product, index)}
                        key={product.product_id}
                      >
                        <td className="col-md-1">{product.product_id}</td>
                        <td className="col-md-2">{product.name}</td>
                        <td className="col-md-2">{product.I18N_Name}</td>
                        <td className="col-md-2">{product.Model_Number}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsTable);
