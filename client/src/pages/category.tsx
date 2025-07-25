import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { type Category, type Product } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";

type FilterType = "todos" | "mais-vendidos" | "menor-preco" | "avaliacao";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", slug],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/categories", slug, "products"],
    enabled: !!slug,
  });

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    
    switch (activeFilter) {
      case "mais-vendidos":
        return [...products].sort((a, b) => {
          const soldA = parseInt(a.sold.replace(/\D/g, '')) || 0;
          const soldB = parseInt(b.sold.replace(/\D/g, '')) || 0;
          return soldB - soldA;
        });
      
      case "menor-preco":
        return [...products].sort((a, b) => {
          const priceA = parseFloat(a.price.replace('R$ ', '').replace(',', '.'));
          const priceB = parseFloat(b.price.replace('R$ ', '').replace(',', '.'));
          return priceA - priceB;
        });
      
      case "avaliacao":
        return [...products].sort((a, b) => b.rating - a.rating);
      
      default:
        return products;
    }
  }, [products, activeFilter]);

  if (categoryLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Categoria não encontrada</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-shopee-orange hover:text-shopee-orange-dark transition-colors">
              Shoplinkado 🔗🛍️
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {category.emoji} {category.name}
          </h1>
          <p className="text-lg text-gray-600">
            {category.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => setActiveFilter("todos")}
            className={activeFilter === "todos" ? "shopee-orange text-white hover:shopee-orange-dark" : ""}
            variant={activeFilter === "todos" ? "default" : "outline"}
          >
            Todos
          </Button>
          <Button 
            onClick={() => setActiveFilter("mais-vendidos")}
            className={activeFilter === "mais-vendidos" ? "shopee-orange text-white hover:shopee-orange-dark" : ""}
            variant={activeFilter === "mais-vendidos" ? "default" : "outline"}
          >
            Mais Vendidos
          </Button>
          <Button 
            onClick={() => setActiveFilter("menor-preco")}
            className={activeFilter === "menor-preco" ? "shopee-orange text-white hover:shopee-orange-dark" : ""}
            variant={activeFilter === "menor-preco" ? "default" : "outline"}
          >
            Menor Preço
          </Button>
          <Button 
            onClick={() => setActiveFilter("avaliacao")}
            className={activeFilter === "avaliacao" ? "shopee-orange text-white hover:shopee-orange-dark" : ""}
            variant={activeFilter === "avaliacao" ? "default" : "outline"}
          >
            Avaliação
          </Button>
        </div>

        {/* Products Grid */}
        {sortedProducts && sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carregar Mais Produtos
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{category.emoji}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Em breve teremos produtos incríveis aqui!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Estamos preparando uma seleção especial de produtos da categoria {category.name} para você.
            </p>
            <div className="bg-gradient-to-r from-[var(--shopee-orange)] to-[var(--shopee-orange-light)] rounded-2xl p-6 text-white max-w-md mx-auto">
              <p className="font-medium">
                📧 Quer ser avisado quando chegarem novos produtos?
              </p>
              <p className="text-sm mt-2 opacity-90">
                Entre em contato: shoplinkadobr@gmail.com
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
