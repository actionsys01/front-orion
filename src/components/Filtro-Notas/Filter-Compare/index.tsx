import { Button, Row, Text } from '@geist-ui/react';
import { Filter } from '@geist-ui/react-icons';
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useFiltro } from '@contexts/filtro';
import colunas from '@utils/painel-controle-filtro';
import compareColumns from '@utils/compare-select';
import MaskedInputDate from '@components/Masked-Input-Date';
import nfse_colunas from '@utils/controle-nfse-filtros';
import {
  BotaoIncluir,
  BotaoRemover,
  ContainerFiltro,
  InputCustomizado,
  CustomDateMask,
  Modal,
  ModalBackground,
  SelectCustomizado,
} from './style';
import { SelectCustom } from '../Select-Compare/styles';

interface FormData {
  filtros: [{ campo: string; valor: string; compare: string }];
}

interface IFilter {
  campo: string;
  valor: string;
  compare: string;
}
interface IProps {
  abaAtual: 'nfe' | 'cte' | 'nfse';
  data: IFilter[];
}

export default function Filtro({ abaAtual, data }: IProps) {
  const formRef = useRef<FormHandles>(null);
  const { cadastrarCte, cadastrarNfe, cadastrarNfse, scopeIgnitionCompare } =
    useFiltro();

  const [erro, setErro] = useState(false);
  const [filtros, setFiltros] = useState<string[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [getSelectedValue, setGetSelectedValue] = useState('');

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

  function remover(index: number) {
    //VERIFICAR
    // console.log('verificando remover filtro');
    const data = formRef.current?.getData() as FormData;

    const filtrosForm = data.filtros.slice();

    const totalFiltros = filtros.slice();

    filtrosForm.splice(index, 1);
    const filtro = scopeIgnitionCompare(filtrosForm);
    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setFiltros(totalFiltros);
  }

  const handleSubmit: SubmitHandler = (data: FormData) => {
    console.log('data', data.filtros);
    if (data.filtros === undefined) {
      abaAtual == 'nfe'
        ? cadastrarNfe([])
        : abaAtual == 'cte'
        ? cadastrarCte([])
        : cadastrarNfse([]);
      setErro(false);
      setModalVisivel(false);
      return;
    }

    const camposVazios = data.filtros.filter(item => !item.valor).length;

    if (camposVazios) {
      setErro(true);
      return;
    } else {
      const filtro = scopeIgnitionCompare(data.filtros);
      abaAtual == 'nfe'
        ? cadastrarNfe(filtro)
        : abaAtual == 'cte'
        ? cadastrarCte(filtro)
        : cadastrarNfse(filtro);
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
    abaAtual == 'nfe'
      ? cadastrarNfe([])
      : abaAtual == 'cte'
      ? cadastrarCte([])
      : cadastrarNfse([]);
    setErro(false);
    setModalVisivel(false);
  }

  const handleChange = e => {
    setGetSelectedValue(e?.value);
  };

  console.log('filtros', filtros);

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
                <SelectCustomizado
                  name="campo"
                  options={abaAtual != 'nfse' ? colunas : nfse_colunas}
                  onChange={handleChange}
                />
                <SelectCustom name="compare" options={compareColumns} />
                {getSelectedValue != 'dt_hr_emit' ? (
                  <InputCustomizado
                    name="valor"
                    placeholder="valor"
                    type="select"
                  />
                ) : (
                  <CustomDateMask name="valor" />
                )}
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
