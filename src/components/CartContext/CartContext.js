import { createContext, useState } from "react";

export const contexto = createContext();
const { Provider } = contexto;

const MiCustomProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  //Función para verificar si ya está el item en el carrito, si está le sumo la cantidad ingresada al existente
  const addItem = (item, cantidad) => {
    if (isInCart(item.id)) {
      const newCart = [...carrito];
      for (let e of newCart) {
        if (e.item.id === item.id) {
          //item.cantidad = item.cantidad + cantidad;
          e.cantidad = e.cantidad + cantidad;
        }
      }
      setCarrito(newCart);
    } else {
      setCarrito([
        ...carrito,
        {
          item: item,
          cantidad: cantidad,
        },
      ]);
    }
  };
  //Función que me indica si el item está en el carrito
  const isInCart = (id) => {
    return carrito.find((e) => e.item.id === id);
  };

  const removeItem = (itemID) => {
    const newCart = [...carrito].filter((e) => e.item.id !== itemID);
    setCarrito(newCart);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = (carrito) => {
    let cantidad = 0;
    carrito.forEach((element) => (cantidad = cantidad + element.cantidad));
    return cantidad;
  };

  const precioTotal = () => {
    let total = 0;
    carrito.forEach((element) => {
      total = total + element.cantidad * element.item.precio;
    });
    return total;
  };
  return (
    <Provider
      value={{
        carrito,
        addItem,
        removeItem,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </Provider>
  );
};

export default MiCustomProvider;
