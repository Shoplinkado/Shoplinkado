import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { ArrowLeft, Plus } from "lucide-react";
import { type Category, type Product, insertProductSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const productFormSchema = insertProductSchema.extend({
  rating: z.number().min(0).max(5),
  isFlash: z.boolean(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function Admin() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      image: "",
      price: "",
      originalPrice: "",
      rating: 5,
      sold: "0 vendidos",
      categoryId: "",
      shopeeUrl: "",
      isFlash: false,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const productData = {
        ...data,
        isFlash: data.isFlash ? 1 : 0,
      };
      return apiRequest("/api/products", "POST", productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      form.reset();
      setShowForm(false);
      toast({
        title: "Produto adicionado!",
        description: "O produto foi adicionado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    createProductMutation.mutate(data);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-shopee-orange">
              Admin - Shoplinkado 🔗🛍️
            </h1>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h2>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="shopee-orange text-white hover:shopee-orange-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
          
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Novo Produto</CardTitle>
                <CardDescription>
                  Adicione um novo produto da Shopee com link de afiliado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        {...form.register("name")}
                        placeholder="Ex: Vestido Floral Elegante"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="categoryId">Categoria</Label>
                      <Select onValueChange={(value) => form.setValue("categoryId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.emoji} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      {...form.register("image")}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Preço Atual</Label>
                      <Input
                        {...form.register("price")}
                        placeholder="R$ 89,90"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="originalPrice">Preço Original (opcional)</Label>
                      <Input
                        {...form.register("originalPrice")}
                        placeholder="R$ 149,90"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rating">Avaliação (0-5)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...form.register("rating", { valueAsNumber: true })}
                        placeholder="4.8"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sold">Quantidade Vendida</Label>
                      <Input
                        {...form.register("sold")}
                        placeholder="2.1k vendidos"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...form.register("isFlash")}
                        className="rounded"
                      />
                      <Label htmlFor="isFlash">Promoção Flash</Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shopeeUrl">Link da Shopee</Label>
                    <Input
                      {...form.register("shopeeUrl")}
                      placeholder="https://shopee.com.br/produto"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={createProductMutation.isPending}
                      className="shopee-orange text-white hover:shopee-orange-dark"
                    >
                      {createProductMutation.isPending ? "Salvando..." : "Salvar Produto"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lista de produtos existentes */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Produtos Cadastrados ({products?.length || 0})
          </h3>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-shopee-orange font-bold">{product.price}</p>
                    <p className="text-xs text-gray-500">{product.sold}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum produto cadastrado ainda. Adicione o primeiro produto!
            </div>
          )}
        </div>
      </main>
    </>
  );
}