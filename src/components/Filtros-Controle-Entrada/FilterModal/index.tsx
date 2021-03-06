/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Row, Text } from '@geist-ui/react';
import { Filter } from '@geist-ui/react-icons';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useControlFilter } from '@contexts/ControlFilter';
import {
  BotaoIncluir,
  ContainerFiltro,
  Modal,
  ModalBackground,
} from '@styles/Filtro-Styles';
import FilterLine from '../FilterLine';

export interface FormFilterData {
  filtros: [{ campo: string; valor: string }];
}

interface IFiltro {
  campo: string;
  valor: string;
}
interface IProps {
  data: IFiltro[];
}

interface FilterProps {
  [key: string]: string;
}

export default function Filtro({ data }: IProps) {
  const formRef = useRef<FormHandles>(null);
  const { registerFilter, scopeIgnition } = useControlFilter();
  const [error, setError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [controlFilters, setControlFilters] = useState<string[]>([]);

  useEffect(() => {
    data.map(() => {
      setControlFilters([...controlFilters, '']);
    });
  }, []);

  useEffect(() => {
    // console.log(`controlFilters`, controlFilters)
    // console.log(`data`, data)
    if (controlFilters.length === data.length)
      formRef.current?.setData({ filtros: data });
  }, [controlFilters]);

  function addFilter() {
    setControlFilters([...controlFilters, '']);
  }

  const filterSubmitHandler: SubmitHandler = (data: FormFilterData) => {
    if (data.filtros === undefined) {
      registerFilter([]);
      setError(false);
      setVisibleModal(false);
      return;
    }
    const emptyFields = data.filtros.filter(item => !item.valor).length;

    if (emptyFields) {
      setError(true);
      return;
    } else {
      const filtro = scopeIgnition(data.filtros);
      registerFilter(filtro);
    }
    setError(false);
    setVisibleModal(false);
  };

  async function closerModal() {
    const data = formRef.current?.getData() as FormFilterData;
    if (data?.filtros !== undefined) {
      const emptyFields = data?.filtros.filter(item => !item.valor).length;
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
          {/* {!controlFilters.length && (
            <Text small size={10}>
              Use o filtro para restringir seus dados
            </Text>
          )} */}
          <ContainerFiltro>
            {controlFilters.map((item, index) => (
              <FilterLine
                index={index}
                formRef={formRef}
                key={index}
                controlFilters={controlFilters}
                setControlFilters={setControlFilters}
              />
            ))}
            <BotaoIncluir onClick={addFilter} type="button">
              <HiPlusCircle />
              <Text> Incluir linha</Text>
            </BotaoIncluir>
          </ContainerFiltro>

          {error && (
            <Text small size={10} type="error">
              Para prosseguir n??o deixe os campos vazios.
            </Text>
          )}
          <Row
            align="middle"
            justify="space-between"
            style={{ marginTop: '1.2rem' }}
          >
            <BotaoIncluir
              onClick={closerModal}
              type="button"
              style={{ fontWeight: 'normal' }}
            >
              <Text>Cancelar</Text>
            </BotaoIncluir>

            <BotaoIncluir
              onClick={closerModal}
              type="button"
              style={{ fontWeight: 'normal' }}
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
