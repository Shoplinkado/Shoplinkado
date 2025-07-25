import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleShopeeClick = () => {
    window.open(product.shopeeUrl, '_blank');
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    
    const price = parseFloat(product.price.replace('R$ ', '').replace(',', '.'));
    const originalPrice = parseFloat(product.originalPrice.replace('R$ ', '').replace(',', '.'));
    
    return Math.round((1 - price / originalPrice) * 100);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {product.isFlash === 1 && (
        <Badge className="bg-red-500 text-white text-xs font-bold absolute z-10 m-3">
          ⚡ FLASH
        </Badge>
      )}
      
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400 text-sm">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.sold})</span>
        </div>
        
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-shopee-orange">
              {product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </div>
            )}
          </div>
          {product.originalPrice && (
            <Badge variant="destructive" className="text-xs">
              {calculateDiscount()}% OFF
            </Badge>
          )}
        </div>
        
        <Button
          onClick={handleShopeeClick}
          className="w-full shopee-orange text-white font-medium hover:shopee-orange-dark"
        >
          Ver na Shopee
        </Button>
      </div>
    </div>
  );
}
