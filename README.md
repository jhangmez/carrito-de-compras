# Carrito de compras by [@jhangmez](https://github.com/jhangmez)

Hook de React para administrar un carrito de compras, optimizado para aplicaciones Next.js App router.
React hook for managing a shopping cart, optimized for Next.js App router applications.

## Installation

```bash
npm install carrito-de-compras
```

## Usage

```typescript
import useShoppingCart from 'my-shopping-cart';

const MyComponent = () => {
  const { addItem, removeItem, getItems, getItemCount, isInitialized } = useShoppingCart();

  if (!isInitialized) {
    return Loading cart...;
  }

  const cartItems = getItems();
  const itemCount = getItemCount();

  // Use the cart functions here
};
```

## API

- `addItem(id: number, quantity: number)`: Add an item to the cart
- `removeItem(id: number)`: Remove an item from the cart
- `updateQuantity(id: number, quantity: number)`: Update the quantity of an item
- `clearCart()`: Clear all items from the cart
- `getItems()`: Get all items in the cart
- `getItemCount()`: Get the total number of items in the cart
- `getTotalPrice(getPriceById: (id: number) => number)`: Calculate the total price of the cart

## License

MIT

---

## Carrito de compras by [@jhangmez](https://github.com/jhangmez)

<div style="display: flex; align-items: center; height: fit-content;">
  <img src="https://avatars.githubusercontent.com/u/60937214?v=4" width="40" style="margin-right: 10px;"/>
  <span>Hecho con ❤️ por Jhan Gómez P.</span>
</div>
