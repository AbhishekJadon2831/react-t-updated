
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './assets/componenets/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/Authcontext.jsx';
import { CartProvider } from './context/addtocard.jsx';
// import { Something } from "./context/addtocard.jsx"






createRoot(document.getElementById('root')).render(
  // <Something>
  <CartProvider>
  <ThemeProvider>
  
      <AuthProvider>
        <BrowserRouter>


          <Navbar />
          <App />


        </BrowserRouter>
      </AuthProvider>
    
  </ThemeProvider>
  </CartProvider>
 
)