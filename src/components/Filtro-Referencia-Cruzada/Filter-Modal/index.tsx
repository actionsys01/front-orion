import { Button, Row, Text } from '@geist-ui/react';
import { Filter } from '@geist-ui/react-icons';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import {
  BotaoIncluir,
  ContainerFiltro,
  Modal,
  ModalBackground,
} from '../style';
import FilterLine from '../FilterLine';
import { useFiltro } from '@contexts/filtro-referencia-cruzada';

interface FormData {
  filtros: [{ campo: string; valor: string; compare: string }];
}

interface IFilter {
  campo: string;
  valor: string | number;
  compare: string;
}
interface IProps {
  // abaAtual: 'nfe' | 'cte' | 'nfse';
  data: IFilter[];
}

export default function Filtro({ data }: IProps) {
  const formRef = useRef<FormHandles>(null);

  const {
    cadastrarRefCruzada,
    scopeIgnition,
    scopeIgnitionCompare,
  } = useFiltro();

  const [erro, setErro] = useState(false);
  const [filtros, setFiltros] = useState<string[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    data.map(() => {
      setFiltros([...filtros, '']);
    });
  }, []);

  useEffect(() => {
    if (filtros.length === data.length)
      formRef.current?.setData({ filtros: data });
  }, [filtros]);

  function adicionar() {
    setFiltros([...filtros, '']);
  }

  const handleSubmit: SubmitHandler = (data: FormData) => {
    // console.log('data', data.filtros);
    if (data.filtros === undefined) {
      cadastrarRefCruzada([]);
      setErro(false);
      setModalVisivel(false);
      return;
    }

    const camposVazios = data.filtros.filter(item => !item.valor).length;

    if (camposVazios) {
      setErro(true);
      return;
    } else {
      const filtro = scopeIgnition(data.filtros)
      cadastrarRefCruzada(filtro)
    }

    setErro(false);
    setModalVisivel(false);
  };

  async function fecharModal() {
    const data = formRef.current?.getData() as FormData;
    if (data?.filtros !== undefined) {
      const camposVazios = data?.filtros.filter(item => !item.valor).length;
      if (camposVazios) {
        setErro(true);
        return;
      }
    }
    cadastrarRefCruzada([])
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
          {/* {!filtros.length && (
            <Text small size={10}>
              Use o filtro para restringir seus dados
            </Text>
          )} */}
          <ContainerFiltro>
            {filtros.map((item, index) => (
              <FilterLine
                index={index}
                formRef={formRef}
                // abaAtual={abaAtual}
                setFiltros={setFiltros}
                filtros={filtros}
                key={index}
                
              />
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
            style={{ marginTop: '1.2rem' }}
          >
            <BotaoIncluir
              onClick={fecharModal}
              type="button"
              style={{ fontWeight: 'normal' }}
            >
              <Text>Cancelar</Text>
            </BotaoIncluir>
            <BotaoIncluir
              onClick={fecharModal}
              type="button"
              style={{ fontWeight: 'normal' }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
