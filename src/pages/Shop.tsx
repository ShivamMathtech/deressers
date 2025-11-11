import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const Shop = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['all-products'],
    queryFn: () => getProducts(50),
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Shop All Dresses</h1>
        <p className="text-xl text-muted-foreground">
          Browse our complete collection of elegant dresses
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-destructive">Failed to load products. Please try again later.</p>
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <p className="text-xl text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground">
            Create your first product by describing it in the chat!
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;
