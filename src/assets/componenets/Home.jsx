import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/addtocard";

function Api() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const { cart, addToCart } = useCart(); 

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product); 
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className={`min-h-screen p-6 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full max-w-md mx-auto block px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        <div className="text-center mb-6">
          <span className={`inline-block px-4 py-2 rounded-full ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md`}>
            Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <div className={`rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:bg-gray-50"
                }`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.discountPercentage > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{Math.round(item.discountPercentage)}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className={`text-sm mb-3 line-clamp-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-green-600">
                          ${item.price}
                        </span>
                        {item.discountPercentage > 0 && (
                          <span className={`text-sm line-through ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}>
                            ${Math.round(item.price / (1 - item.discountPercentage / 100))}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {item.category}
                      </span>

                      <span className={`text-xs ${
                        item.stock > 10 ? "text-green-600" : "text-red-600"
                      }`}>
                        {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      disabled={item.stock === 0}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        item.stock === 0
                          ? `cursor-not-allowed ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-500"
                                : "bg-gray-300 text-gray-500"
                            }`
                          : `bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5`
                      }`}
                    >
                      {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Api;
