import React, { useState, useEffect } from "react";
import { fetchPessoas, criarConta, criarPessoa } from "../services/api";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { Pessoa } from "../types";
import { useToast } from "../context/ToastContext";

const CreateAccount: React.FC = () => {
  const [people, setPeople] = useState<Pessoa[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPeople, setIsLoadingPeople] = useState<boolean>(true);
  const { addToast } = useToast();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await fetchPessoas();
        setPeople(data);
      } catch (error) {
        console.error("CA-01: fail to fetch people:", error);
        addToast("error", "Não foi possível carregar a lista de pessoas.");
      } finally {
        setIsLoadingPeople(false);
      }
    };

    loadPeople();
  }, [addToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      let idPessoa = selectedPersonId;

      if (!idPessoa) {
        if (!nome || !cpf || !dataNascimento) {
          addToast("warning", "Preencha todos os dados para criar a pessoa.");
          setIsLoading(false);
          return;
        }

        const pessoaCriada = await criarPessoa({ nome, cpf, dataNascimento });
        idPessoa = pessoaCriada.idPessoa.toString();
      }

      const conta = await criarConta(Number(idPessoa));
      addToast(
        "success",
        `Conta criada com sucesso! Número da conta: ${conta.idConta}`
      );

      setSelectedPersonId("");
      setNome("");
      setCpf("");
      setDataNascimento("");
    } catch (error) {
      console.error("CA-02: Erro ao criar conta:", error);
      addToast("error", "Erro ao criar conta. Verifique os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Criar Conta">
      <div className="max-w-md mx-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Criar nova conta bancária
              </h3>

              <p className="text-sm text-gray-600">
                Você pode selecionar uma pessoa existente ou cadastrar uma nova.
              </p>

              <div>
                <Select
                  label="Selecionar Pessoa (opcional)"
                  options={people.map((p) => ({
                    value: p.idPessoa,
                    label: p.nome,
                  }))}
                  value={selectedPersonId}
                  onChange={setSelectedPersonId}
                  disabled={isLoadingPeople}
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Ou cadastre uma nova pessoa:
                </p>
                <Input
                  label="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  label="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
                <Input
                  label="Data de Nascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoadingPeople}
                  className="w-full"
                >
                  Criar Conta
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateAccount;
