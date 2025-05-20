import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  ArrowDownCircle,
  ArrowUpCircle,
  FileText,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";

const Dashboard: React.FC = () => {
  const features = [
    {
      title: "Criar Conta",
      description:
        "Cadastre uma nova conta para uma pessoa existente, ou cadastre uma pessoa.",
      icon: <UserPlus className="h-8 w-8 text-blue-600" />,
      link: "/criar-conta",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Depositar",
      description: "Faça depósitos em contas bancárias existentes.",
      icon: <ArrowDownCircle className="h-8 w-8 text-emerald-600" />,
      link: "/operacoes",
      color: "bg-emerald-50 hover:bg-emerald-100",
    },
    {
      title: "Sacar",
      description: "Faça saques de contas bancárias existentes.",
      icon: <ArrowUpCircle className="h-8 w-8 text-amber-600" />,
      link: "/operacoes",
      color: "bg-amber-50 hover:bg-amber-100",
    },
    {
      title: "Extrato",
      description:
        "Tenha acesso ao extrato bancário completo de uma conta, incluindo filtros de data, e visualização de bloqueio de cada conta.",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      link: "/extrato",
      color: "bg-purple-50 hover:bg-purple-100",
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="mb-8">
        <h2 className="text-lg md:text-xl text-gray-700 mb-4">
          Bem-vindo ao Sistema Bancário do Banco Toscano
        </h2>
        <p className="text-gray-600">
          Aqui você consegue gerenciar contas bancárias, realizar operações
          financeiras e consultar extratos de forma rápida, simples e intuitiva.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} to={feature.link}>
            <Card
              className={`h-full transition-all duration-200 ${feature.color} border border-gray-200 hover:shadow-md cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
