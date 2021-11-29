import { Button, Row, Text } from "@geist-ui/react";
import { Filter } from "@geist-ui/react-icons";
import { FormHandles, Scope, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { useControlFilter } from "@contexts/ControlFilter";
import colunas from "@utils/filtros-controle";
import {
  BotaoIncluir,
  BotaoRemover,
  ContainerFiltro,
  InputCustomizado,
  Modal,
  ModalBackground,
  SelectCustomizado,
} from "@components/Filtro/styled";


interface FormFilterData {
    filtros: [{  campo: string; valor: string }];
}

interface IFiltro {
  campo : string
  valor: string
}
interface IProps {
  data: IFiltro[];
}

interface FilterProps {
  [key: string] : string;
}

export default function Filtro({ data }: IProps) {
  const formRef = useRef<FormHandles>(null);
  const {registerFilter, scopeIgnition } = useControlFilter();
  const [error, setError] = useState(false);
  const [controlFilters, setControlFilters] = useState<string[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);


  // PRIMEIRA

 
  useEffect(() => {
    data.map(() => {
      setControlFilters([...controlFilters, ""]);
    });
  }, []);

  //SEGUNDA


  useEffect(() => {
    console.log(`controlFilters`, controlFilters)
    console.log(`data`, data)
    if (controlFilters.length === data.length)
      formRef.current?.setData({ filtros: data });
  }, [controlFilters]);

// TERCEIRA

  function addFilter() {
    setControlFilters([...controlFilters, ""]);
  }

// QUARTA


  function removeFilter (index: number) {
    const data = formRef.current?.getData() as FormFilterData;

    let filtrosForm = data.filtros.slice();

    const totalFiltros = controlFilters.slice();

    filtrosForm.splice(index, 1);

    const filtro = scopeIgnition(filtrosForm);

    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setControlFilters(totalFiltros);
  }

  // QUINTA

  
  const filterSubmitHandler: SubmitHandler = (data: FormFilterData) => {
    // console.log(`data.filtros`, data.filtros)
    // console.log(`data debaixo de data.fitros`, data)
    if (data.filtros === undefined) {
      // console.log("aqui I")
        registerFilter([])
        setError(false);
        setVisibleModal(false);
      return;
    }
    const emptyFields = data.filtros.filter((item) => !item.valor).length;

    if (emptyFields) {
      // console.log("aqui II")
      setError(true);
      return;
    } else {
      // console.log("aqui III")
      const filtro = scopeIgnition(data.filtros);
      registerFilter(filtro);
    }
    setError(false);
    setVisibleModal(false);
  };

  // SEXTA

  async function closerModal() {
    const data = formRef.current?.getData() as FormFilterData;
    if (data?.filtros !== undefined) {
      const emptyFields = data?.filtros.filter((item) => !item.valor).length;
      if (emptyFields) {
        setError(true);
        return;
      }
    }
    registerFilter([]);
    setError(false);
    setVisibleModal(false);
  }

  return (
    <>
      <Button
        type="secondary-light"
        size="small"
        icon={<Filter />}
        onClick={() => setVisibleModal(true)}
      >
        Filtrar
      </Button>
      <Form ref={formRef} onSubmit={filterSubmitHandler}>
        <Modal visivel={visibleModal}>
          <Text h6>Filtrar</Text>
          {!controlFilters.length && (
            <Text small size={10}>
              Use o filtro para restringir seus dados
            </Text>
          )}

          <ContainerFiltro>
            {controlFilters.map((item, index) => (
              <Scope path={`filtros[${index}]`} key={index}>
                <SelectCustomizado name="campo" options={colunas} />
                <InputCustomizado name="valor" placeholder="valor" />
                <BotaoRemover size={15} onClick={() => removeFilter(index)} />
              </Scope>
            ))}
            <BotaoIncluir onClick={addFilter} type="button">
              <HiPlusCircle />
              <Text> Incluir linha</Text>
            </BotaoIncluir>
          </ContainerFiltro>

          {error && (
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
              onClick={closerModal}
              type="button"
              style={{ fontWeight: "normal" }}
            >
              <Text>Cancelar</Text>
            </BotaoIncluir>

            <BotaoIncluir
              onClick={closerModal}
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

      {visibleModal && <ModalBackground />}
    </>
  );
}
