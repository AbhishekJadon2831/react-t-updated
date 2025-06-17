import { useCart } from "../../context/addtocard";
import { useTheme } from "../../context/ThemeContext";

function Cart() {
  const { cart, removeFromCart } = useCart(); 
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg mt-12">No items in cart.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className={`flex gap-4 items-center p-4 rounded-xl shadow-md ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm mb-1">{item.description}</p>
                <div className="text-sm text-gray-500">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="font-semibold text-green-600">
                  ${item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
