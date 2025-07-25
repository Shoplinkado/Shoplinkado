import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-shopee-orange mb-4">
            Shoplinkado 🔗🛍️
          </div>
          <p className="text-gray-600 mb-4">
            Site gratuito com links oficiais da Shopee. Atualizado diariamente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:shoplinkadobr@gmail.com"
              className="flex items-center text-shopee-orange hover:text-shopee-orange-dark transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              shoplinkadobr@gmail.com
            </a>
            <div className="text-gray-400 hidden sm:block">•</div>
            <div className="text-gray-600 text-sm">
              © 2024 Shoplinkado - Todos os direitos reservados
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Este site contém links de afiliados. Podemos receber uma comissão por compras realizadas através destes links, sem custo adicional para você.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}