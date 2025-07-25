import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Category } from "@shared/schema";

export default function Home() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Shoplinkado 🔗🛍️
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Achadinhos virais da Shopee em um só lugar
        </p>
        <div className="bg-gradient-to-r from-[var(--shopee-orange)] to-[var(--shopee-orange-light)] rounded-2xl p-6 text-white">
          <p className="text-lg font-medium">
            ✨ Produtos selecionados • 🔥 Ofertas imperdíveis • 📱 Atualizado diariamente
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.slug}`}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-shopee-orange group block"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-center">
              {category.emoji}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-center">
              {category.description}
            </p>
            <div className="shopee-orange text-white px-4 py-2 rounded-lg font-medium group-hover:shopee-orange-dark transition-colors text-center">
              {category.slug === 'promocoes' ? 'Ver Ofertas' : 'Explorar'}
            </div>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🚀 Site em Construção
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Estamos selecionando os melhores produtos da Shopee para você. Em breve teremos produtos incríveis em todas as categorias!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-shopee-orange">5</div>
            <div className="text-sm text-gray-600">Categorias</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-shopee-orange">100%</div>
            <div className="text-sm text-gray-600">Gratuito</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-shopee-orange">24h</div>
            <div className="text-sm text-gray-600">Atualizações</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-shopee-orange">Oficial</div>
            <div className="text-sm text-gray-600">Links Shopee</div>
          </div>
        </div>
      </div>
    </main>
  );
}
