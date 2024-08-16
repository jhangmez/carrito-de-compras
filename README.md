# Carrito de compras by [@jhangmez](https://github.com/jhangmez)

Hook de React para administrar un carrito de compras, optimizado para aplicaciones Next.js App router.
React hook for managing a shopping cart, optimized for Next.js App router applications.

## Installation

```bash
npm install carrito-de-compras
```

## Usage

1. Wrap your app with the `CarritoProvider`:

```jsx
import { CarritoProvider } from 'carrito-de-compras'

function App() {
  return (
    <CarritoProvider>
      {children} {/* Your app here */}
    </CarritoProvider>
  )
}
```

2. Use the `useCarrito` hook in your components:

```jsx
import { useCarrito } from 'carrito-react';

function MiComponente() {
  const { addItem, removeItem, getItemCount, getTotalPrice } = useCarrito();

  // Use the shopping cart features here
}

## API

- `addItem(id: number, quantity: number)`: Add an item to the cart
- `removeItem(id: number)`: Remove an item from the cart
- `updateQuantity(id: number, quantity: number)`: Update the quantity of an item
- `clearCart()`: Clear all items from the cart
- `getItems()`: Get all items in the cart
- `getItemCount()`: Get the total number of items in the cart
- `getTotalPrice(getPriceById: (id: number) => number)`: Calculate the total price of the cart

## Contribute

Contributions are welcome. Please open an issue or pull request for suggestions or improvements.

## License

MIT

---

## Carrito de compras by [@jhangmez](https://github.com/jhangmez)

<div style="display: flex; align-items: center; height: fit-content;">
  <img src="https://avatars.githubusercontent.com/u/60937214?v=4" width="40" style="margin-right: 10px;"/>
  <span>Hecho con ❤️ por Jhan Gómez P.</span>
</div>
```
