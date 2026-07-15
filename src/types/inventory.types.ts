export interface StockAdjustment {
  productId: string;
  type: 'RESTOCK' | 'SALE' | 'DAMAGE' | 'MANUAL';
  quantity: number; // positive = add stock, negative = remove
  note?: string;
  createdAt: string;
}

export interface LowStockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  threshold: number; // alert fires when stock <= threshold
}
