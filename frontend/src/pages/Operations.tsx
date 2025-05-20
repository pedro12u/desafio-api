import React, { useState } from "react";
import { depositar, sacar, bloquear } from "../services/api";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

type OperationType = "deposit" | "withdraw" | "block";

const Operations: React.FC = () => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [operationType, setOperationType] = useState<OperationType>("deposit");
  const { addToast } = useToast();

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountId(e.target.value.replace(/\D/g, ""));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) return;
    setAmount(value);
  };

  const validateForm = (): boolean => {
    if (
      !accountId ||
      (operationType !== "block" && (!amount || parseFloat(amount) <= 0))
    ) {
      addToast("warning", "Informe os dados corretamente.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      if (operationType === "block") {
        await bloquear(Number(accountId));
        addToast("success", "Conta bloqueada com sucesso.");
      } else {
        const account =
          operationType === "deposit"
            ? await depositar(Number(accountId), parseFloat(amount))
            : await sacar(Number(accountId), parseFloat(amount));

        addToast(
          "success",
          `${
            operationType === "deposit" ? "Depósito" : "Saque"
          } realizado! Saldo: R$ ${account.saldo.toFixed(2)}`
        );
        setAmount("");
      }

      setAccountId("");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erro na operação.";
      addToast("error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Operações">
      <div className="max-w-md mx-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={
                    operationType === "deposit" ? "primary" : "secondary"
                  }
                  onClick={() => setOperationType("deposit")}
                  className="flex-1"
                >
                  Depósito
                </Button>
                <Button
                  type="button"
                  variant={
                    operationType === "withdraw" ? "primary" : "secondary"
                  }
                  onClick={() => setOperationType("withdraw")}
                  className="flex-1"
                >
                  Saque
                </Button>
                <Button
                  type="button"
                  variant={operationType === "block" ? "primary" : "secondary"}
                  onClick={() => setOperationType("block")}
                  className="flex-1"
                >
                  Bloquear
                </Button>
              </div>

              <Input
                label="Número da Conta"
                value={accountId}
                onChange={handleAccountChange}
                required
              />

              {operationType !== "block" && (
                <Input
                  label="Valor"
                  value={amount}
                  onChange={handleAmountChange}
                  type="text"
                  inputMode="decimal"
                  required
                />
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
                variant={
                  operationType === "deposit"
                    ? "success"
                    : operationType === "withdraw"
                    ? "warning"
                    : "danger"
                }
              >
                {operationType === "deposit"
                  ? "Realizar Depósito"
                  : operationType === "withdraw"
                  ? "Realizar Saque"
                  : "Bloquear Conta"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Operations;
