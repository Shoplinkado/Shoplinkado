import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  password: z.string().min(1, "Digite a senha"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return apiRequest("/api/admin/login", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Login realizado!",
        description: "Redirecionando para o painel admin...",
      });
      setTimeout(() => {
        setLocation("/admin");
      }, 500);
    },
    onError: () => {
      toast({
        title: "Senha incorreta",
        description: "Verifique a senha e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
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

      <main className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-shopee-orange rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Acesso Administrativo</CardTitle>
            <CardDescription>
              Digite a senha para acessar o painel de produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="password">Senha de Administrador</Label>
                <Input
                  type="password"
                  {...form.register("password")}
                  placeholder="Digite sua senha"
                  className="text-center"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full shopee-orange text-white hover:shopee-orange-dark"
              >
                {loginMutation.isPending ? "Verificando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Não tem acesso? Entre em contato: shoplinkadobr@gmail.com
          </p>
        </div>
      </main>
    </>
  );
}