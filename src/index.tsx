import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CarritoItem {
  id: number
  quantity: number
}

interface CarritoContextType {
  items: CarritoItem[]
  addItem: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getItems: () => CarritoItem[]
  getItemCount: () => number
  getTotalPrice: (getPriceById: (id: number) => number) => number
  isInitialized: boolean
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CarritoItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedItems =
      typeof window !== 'undefined'
        ? localStorage.getItem('carrito-de-compras')
        : null
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addItem = (id: number, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { id, quantity }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getItems = () => items

  const getItemCount = () =>
    items.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = (getPriceById: (id: number) => number) =>
    items.reduce(
      (total, item) => total + item.quantity * getPriceById(item.id),
      0
    )

  return (
    <CarritoContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItems,
        getItemCount,
        getTotalPrice,
        isInitialized
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider')
  }
  return context
}
