import React, { useState } from "react";
import { obterExtrato } from "../services/api";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import type { Extrato, Transacao } from "../types";
import { useToast } from "../context/ToastContext";
import { ArrowDownCircle, ArrowUpCircle, Calendar } from "lucide-react";

const Statement: React.FC = () => {
  const [accountId, setAccountId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statement, setStatement] = useState<Extrato | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountId(e.target.value.replace(/\D/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId) {
      addToast("warning", "Informe o número da conta.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await obterExtrato(
        parseInt(accountId, 10),
        startDate,
        endDate
      );
      setStatement(data);
    } catch {
      addToast("error", "Erro ao carregar extrato. Verifique a conta.");
      setStatement(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleString("pt-BR");
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Layout title="Extrato">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Número da Conta"
              value={accountId}
              onChange={handleAccountChange}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Data Início"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                label="Data Fim"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              Consultar
            </Button>
          </form>
        </Card>

        {statement && (
          <div className="space-y-6">
            <Card className="bg-blue-50 border border-blue-200">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase">
                    Saldo
                  </h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(statement.saldo)}
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      statement.flagAtivo ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {statement.flagAtivo ? "Conta Ativa" : "Conta Bloqueada"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase">
                    Conta
                  </h4>
                  <p className="text-lg font-medium text-gray-900">
                    #{accountId}
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Histórico de Transações
              </h3>
              {statement.transacoes.length === 0 ? (
                <Card>
                  <p className="text-center text-gray-500 py-4">
                    Nenhuma transação encontrada.
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {statement.transacoes.map((t: Transacao) => (
                    <Card
                      key={t.idTransacao}
                      className={`border-l-4 ${
                        t.valor > 0
                          ? "border-l-emerald-500"
                          : "border-l-amber-500"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {t.valor > 0 ? (
                            <ArrowDownCircle className="h-6 w-6 text-emerald-500 mr-3" />
                          ) : (
                            <ArrowUpCircle className="h-6 w-6 text-amber-500 mr-3" />
                          )}
                          <div>
                            <p className="font-medium">
                              {t.valor > 0 ? "Depósito" : "Saque"}
                            </p>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(t.dataTransacao)}
                            </span>
                          </div>
                        </div>
                        <p
                          className={`font-semibold ${
                            t.valor > 0 ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {(t.valor > 0 ? "+" : "-") +
                            formatCurrency(Math.abs(t.valor))}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Statement;
