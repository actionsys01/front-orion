import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';

import { useFiltro } from '@contexts/filtro-referencia-cruzada';
import { BotaoRemover } from '@styles/Filtro-Styles';
import { FormHandles } from '@unform/core';
import colunas from '@utils/filtros/colunas/controle-refCruzada-filtros'
import { statusOptions } from '@utils/filtros/colunas/status-filtro';
import {
  compareDouble,
  compareString,
  compareEqual,
  medidas_peso,
  origem,
  fornecedor,
} from '@utils/filtros';

import compareColumns from '@utils/filtros/compare/compare-select';

import {
  Container,
  SelectCustomizado,
  SelectCustom,
  CustomDateMask,
  InputCustomizado,
  SelectStatusStyle,
} from '../style';
import { colunas_itens } from '@utils/filtros';

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
  const { scopeIgnitionCompare } = useFiltro();

  const [getSelectedValue, setGetSelectedValue] = useState('');

  const handleChange = e => {
    setGetSelectedValue(e?.value);
  };

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
        options={colunas}
        onChange={handleChange}
      />
      <SelectCustom
        name="compare"
        defaultValue={pattern}
        options={
          getSelectedValue === 'codigo_fornecedor' ||
          getSelectedValue === 'item_fornecedor' ||
          getSelectedValue === 'um_fornecedor' ||
          getSelectedValue === 'item_cliente' ||
          getSelectedValue === 'um_cliente' 
            ? compareString
            : compareColumns
        }
      />

        <InputCustomizado name="valor" placeholder="valor" type="select" />

      <BotaoRemover size={15} onClick={() => remover(index)} />
    </Container>
  );
};

export default FilterLine;
