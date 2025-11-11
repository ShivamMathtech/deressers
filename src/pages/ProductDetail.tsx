import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive">Product not found</p>
      </div>
    );
  }

  const variants = product.variants.edges;
  const currentVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;
  
  if (!selectedVariantId && currentVariant) {
    setSelectedVariantId(currentVariant.id);
  }

  const handleAddToCart = () => {
    if (!currentVariant) return;
    
    const cartItem = {
      product: { node: product },
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity: 1,
      selectedOptions: currentVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart`,
      position: 'top-center',
    });
  };

  const imageUrl = product.images.edges[0]?.node.url;
  const price = currentVariant ? parseFloat(currentVariant.price.amount) : 0;
  const currency = currentVariant?.price.currencyCode || 'USD';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary/20">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-3xl font-semibold text-primary">
              {currency} ${price.toFixed(2)}
            </p>
          </div>
          
          {product.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}
          
          {variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Size</label>
              <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  {variants.map((variant) => (
                    <SelectItem key={variant.node.id} value={variant.node.id}>
                      {variant.node.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button 
            size="lg" 
            className="w-full text-lg"
            onClick={handleAddToCart}
            disabled={!currentVariant?.availableForSale}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {currentVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
