import { Button, Row, Text } from "@geist-ui/react";
import { Filter } from "@geist-ui/react-icons";
import { FormHandles, Scope, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { useFiltro } from "@contexts/filtro";
import colunas from "@utils/painel-controle-filtro";
import {
  BotaoIncluir,
  BotaoRemover,
  ContainerFiltro,
  InputCustomizado,
  Modal,
  ModalBackground,
  SelectCustomizado,
} from "./styled";

interface FormData {
  filtros: [{ campo: string; valor: string }];
}

interface IFiltro {
  campo: { label: string; value: string } | undefined;
  valor: string;
}
interface IProps {
  abaAtual: "nfe" | "cte" | "nfse";
  data: IFiltro[];
}

export default function Filtro({ abaAtual, data }: IProps) {
  const formRef = useRef<FormHandles>(null);
  const { cadastrarCte, cadastrarNfe, inicializarScope } = useFiltro();
  const [erro, setErro] = useState(false);
  const [filtros, setFiltros] = useState<string[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    data.map(() => {
      setFiltros([...filtros, ""]);
    });
  }, []);

  useEffect(() => {
    if (filtros.length === data.length)
      formRef.current?.setData({ filtros: data });
  }, [filtros]);

  function adicionar() {
    setFiltros([...filtros, ""]);
  }

  function remover(index: number) {
    const data = formRef.current?.getData() as FormData;

    let filtrosForm = data.filtros.slice();

    const totalFiltros = filtros.slice();

    filtrosForm.splice(index, 1);

    const filtro = inicializarScope(filtrosForm);

    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setFiltros(totalFiltros);
  }

  const handleSubmit: SubmitHandler = (data: FormData) => {
    if (data.filtros === undefined) {
      abaAtual == "nfe" ? cadastrarNfe([]) : cadastrarCte([]);
      setErro(false);
      setModalVisivel(false);
      return;
    }

    const camposVazios = data.filtros.filter((item) => !item.valor).length;

    if (camposVazios) {
      setErro(true);
      return;
    } else {
      const filtro = inicializarScope(data.filtros);
      abaAtual == "nfe" ? cadastrarNfe(filtro) : cadastrarCte(filtro);
    }

    setErro(false);
    setModalVisivel(false);
  };

  async function fecharModal() {
    const data = formRef.current?.getData() as FormData;
    if (data?.filtros !== undefined) {
      const camposVazios = data?.filtros.filter((item) => !item.valor).length;
      if (camposVazios) {
        setErro(true);
        return;
      }
    }
    abaAtual == "nfe" ? cadastrarNfe([]) : cadastrarCte([]);
    setErro(false);
    setModalVisivel(false);
  }

  return (
    <>
      <Button
        type="secondary-light"
        size="small"
        icon={<Filter />}
        onClick={() => setModalVisivel(true)}
      >
        Filtrar
      </Button>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Modal visivel={modalVisivel}>
          <Text h6>Filtrar</Text>
          {!filtros.length && (
            <Text small size={10}>
              Use o filtro para restringir seus dados
            </Text>
          )}

          <ContainerFiltro>
            {filtros.map((item, index) => (
              <Scope path={`filtros[${index}]`} key={index}>
                <SelectCustomizado name="campo" options={colunas} />
                <InputCustomizado name="valor" placeholder="valor" />
                <BotaoRemover size={15} onClick={() => remover(index)} />
              </Scope>
            ))}
            <BotaoIncluir onClick={adicionar} type="button">
              <HiPlusCircle />
              <Text> Incluir linha</Text>
            </BotaoIncluir>
          </ContainerFiltro>

          {erro && (
            <Text small size={10} type="error">
              Para prosseguir não deixe os campos vazios.
            </Text>
          )}
          <Row
            align="middle"
            justify="space-between"
            style={{ marginTop: "1.2rem" }}
          >
            <BotaoIncluir
              onClick={fecharModal}
              type="button"
              style={{ fontWeight: "normal" }}
            >
              <Text>Cancelar</Text>
            </BotaoIncluir>

            <BotaoIncluir
              onClick={fecharModal}
              type="button"
              style={{ fontWeight: "normal" }}
              // @ts-ignore: Object is possibly 'null'.
              onClick={() => formRef?.current.submitForm()}
            >
              <Text>Confirmar</Text>
            </BotaoIncluir>
          </Row>
        </Modal>
      </Form>

      {modalVisivel && <ModalBackground />}
    </>
  );
}
