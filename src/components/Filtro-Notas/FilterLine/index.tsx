import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';

import { useFiltro } from '@contexts/filtro';
import { BotaoRemover } from '@styles/Filtro-Styles';
import { FormHandles } from '@unform/core';
import compareColumns from '@utils/compare-select';
import nfse_colunas from '@utils/controle-nfse-filtros';
import colunas from '@utils/painel-controle-filtro';
import { statusOptions } from '@utils/status-filtro';

import {
  Container,
  SelectCustomizado,
  SelectCustom,
  CustomDateMask,
  InputCustomizado,
  SelectStatusStyle,
} from '../Filter-Compare/style';

interface FilterLineProps {
  index: number;
  abaAtual: string;
  formRef: MutableRefObject<FormHandles>;
  setFiltros: Dispatch<SetStateAction<string[]>>;
  filtros: string[];
}

const FilterLine: React.FC<FilterLineProps> = ({
  index,
  abaAtual,
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

  return (
    <Container path={`filtros[${index}]`} key={index}>
      <SelectCustomizado
        name="campo"
        options={abaAtual !== 'nfse' ? colunas : nfse_colunas}
        onChange={handleChange}
      />
      <SelectCustom name="compare" options={compareColumns} />
      {getSelectedValue === 'dt_hr_emit' ? (
        <CustomDateMask name="valor" />
      ) : getSelectedValue === 'sefaz_status' ? (
        <SelectStatusStyle name="valor" options={statusOptions} />
      ) : (
        <InputCustomizado name="valor" placeholder="valor" type="select" />
      )}
      <BotaoRemover size={15} onClick={() => remover(index)} />
    </Container>
  );
};

export default FilterLine;
