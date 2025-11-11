import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) return;
    
    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${node.title} has been added to your cart`,
      position: 'top-center',
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;

  return (
    <Link 
      to={`/product/${node.handle}`} 
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
    >
      <div className="aspect-[3/4] overflow-hidden bg-secondary/20">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-lg line-clamp-2">{node.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">{currency} ${price.toFixed(2)}</span>
          <Button 
            size="icon" 
            variant="outline"
            onClick={handleAddToCart}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
