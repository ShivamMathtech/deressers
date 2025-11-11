import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(8),
  });

  return (
    <div>
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
          <p className="text-xl text-muted-foreground">
            Handpicked styles for the discerning woman
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  View All Collection
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 space-y-4">
            <p className="text-xl text-muted-foreground">No products found</p>
            <p className="text-sm text-muted-foreground">
              Create your first product by describing it in the chat!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
