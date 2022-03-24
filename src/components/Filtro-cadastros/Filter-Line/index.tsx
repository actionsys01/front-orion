import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';

import { useFiltro } from '@contexts/filtro';
import { BotaoRemover } from '@styles/Filtro-Styles';
import { FormHandles } from '@unform/core';
import colunas_categorias from '@utils/filtros/colunas/colunas_categorias';

import {
  Container,
  SelectCustomizado,
  SelectCustom,
  CustomDateMask,
  InputCustomizado,
} from '../style';
import compareSimple from '@utils/filtros/compare/compare-simple';

interface FilterLineProps {
  index: number;
  // abaAtual: string;
  formRef: MutableRefObject<FormHandles>;
  setFiltros: Dispatch<SetStateAction<string[]>>;
  filtros: string[];
}

const FilterLine: React.FC<FilterLineProps> = ({
  index,
  // abaAtual,
  formRef,
  setFiltros,
  filtros,
}) => {
  const { scopeIgnitionCompare } = useFiltro();

  // const [getSelectedValue, setGetSelectedValue] = useState('');

  // const handleChange = e => {
  //   setGetSelectedValue(e?.value);
  // };

  function remover(index: number) {
    const data = formRef.current?.getData() as any;

    const filtrosForm = data.filtros.slice();

    const totalFiltros = filtros.slice();

    filtrosForm.splice(index, 1);
    const filtro = scopeIgnitionCompare(filtrosForm);
    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setFiltros(totalFiltros);
  }

  const pattern = { value: 'equal', label: 'Igual' };

  return (
    <Container path={`filtros[${index}]`} key={index}>
      <SelectCustomizado
        name="campo"
        options={colunas_categorias}
        // onChange={handleChange}
      />
      <SelectCustom
        name="compare"
        defaultValue={pattern}
        options={compareSimple}
      />
      <InputCustomizado name="valor" placeholder="valor" type="select" />
      <BotaoRemover size={15} onClick={() => remover(index)} />
    </Container>
  );
};

export default FilterLine;
