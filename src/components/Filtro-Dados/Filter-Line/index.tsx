import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';

import { useFiltro } from '@contexts/filtro-dados';
import { BotaoRemover } from '@styles/Filtro-Styles';
import { FormHandles } from '@unform/core';

import {
  Container,
  SelectCustomizado,
  SelectCustom,
  CustomDateMask,
  InputCustomizado,
} from '../style';
import { compareDouble, compareEqual } from '@utils/filtros';

interface FilterLineProps {
  index: number;
  formRef: MutableRefObject<FormHandles>;
  setFiltros: Dispatch<SetStateAction<string[]>>;
  filtros: string[];
}

const FilterLine: React.FC<FilterLineProps> = ({
  index,
  formRef,
  setFiltros,
  filtros,
}) => {
  const { colunas_dados, scopeIgnition } = useFiltro();

  const [getSelectedValue, setGetSelectedValue] = useState('');

  const handleChange = e => {
    setGetSelectedValue(e?.value);
  };

  function remover(index: number) {
    const data = formRef.current?.getData() as any;

    const filtrosForm = data.filtros.slice();

    const totalFiltros = filtros.slice();

    filtrosForm.splice(index, 1);
    const filtro = scopeIgnition(filtrosForm);
    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setFiltros(totalFiltros);
  }

  const pattern = { value: 'equal', label: 'Igual' };

  return (
    <Container path={`filtros[${index}]`} key={index}>
      <SelectCustomizado
        name="campo"
        options={colunas_dados}
        onChange={handleChange}
      />
      <SelectCustom
        name="compare"
        defaultValue={pattern}
        options={
          getSelectedValue === 'chave_1' ||
          getSelectedValue === 'chave_2' ||
          getSelectedValue === 'chave_3' ||
          getSelectedValue === 'chave_4' ||
          getSelectedValue === 'chave_5' ||
          getSelectedValue === 'chave_6' ||
          getSelectedValue === 'chave_7' ||
          getSelectedValue === 'valor_string_1' ||
          getSelectedValue === 'valor_string_2' ||
          getSelectedValue === 'valor_string_3' ||
          getSelectedValue === 'valor_string_4' ||
          getSelectedValue === 'valor_string_5' ||
          getSelectedValue === 'valor_string_6' ||
          getSelectedValue === 'valor_string_7' ||
          getSelectedValue === 'valor_string_8' ||
          getSelectedValue === 'valor_string_9' ||
          getSelectedValue === 'valor_string_10'
            ? compareDouble
            : compareEqual
        }
      />
      <InputCustomizado name="valor" placeholder="valor" type="select" />
      <BotaoRemover size={15} onClick={() => remover(index)} />
    </Container>
  );
};

export default FilterLine;
