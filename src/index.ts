import { useState, useEffect, useCallback, useMemo } from 'react'

interface CartItem {
  id: number
  quantity: number
}

interface UseShoppingCartOptions {
  storageKey?: string
}

const useShoppingCart = (options: UseShoppingCartOptions = {}) => {
  const { storageKey = 'carrito-de-compras' } = options

  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Cargar items del localStorage al iniciar
    if (typeof window !== 'undefined' && !isInitialized) {
      const savedItems = localStorage.getItem(storageKey)
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
      setIsInitialized(true)
    }
  }, [storageKey, isInitialized])

  useEffect(() => {
    // Guardar items en localStorage cuando cambien
    if (typeof window !== 'undefined' && isInitialized) {
      localStorage.setItem(storageKey, JSON.stringify(items))
    }
  }, [items, storageKey, isInitialized])

  const addItem = useCallback((id: number, quantity: number) => {
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
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey)
    }
  }, [storageKey])

  const getItems = useCallback(() => items, [items])

  const getItemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  const getTotalPrice = useCallback(
    (getPriceById: (id: number) => number) =>
      items.reduce(
        (total, item) => total + item.quantity * getPriceById(item.id),
        0
      ),
    [items]
  )

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItems,
    getItemCount,
    getTotalPrice,
    isInitialized
  }
}

export default useShoppingCart
