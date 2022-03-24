import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';
import { FormHandles } from '@unform/core';
import { useControlFilter } from '@contexts/ControlFilter';
import colunas from '@utils/filtros/colunas/filtros-controle';
import { BotaoRemover, InputCustomizado } from '@styles/Filtro-Styles';
import { FormFilterData } from '../FilterModal';
import { Container, CustomSelect, CustomDateMask } from '../style';

interface FilterLineProps {
  index: number;
  formRef: MutableRefObject<FormHandles>;
  setControlFilters: Dispatch<SetStateAction<string[]>>;
  controlFilters: string[];
}

const FilterLine = ({
  index,
  formRef,
  controlFilters,
  setControlFilters,
}: FilterLineProps) => {
  const { scopeIgnition } = useControlFilter();
  const [getSelectedValue, setGetSelectedValue] = useState('');

  const handleChange = e => {
    setGetSelectedValue(e?.value);
  };

  function removeFilter(index: number) {
    const data = formRef.current?.getData() as FormFilterData;

    const filtrosForm = data.filtros.slice();

    const totalFiltros = controlFilters.slice();

    filtrosForm.splice(index, 1);

    const filtro = scopeIgnition(filtrosForm);

    formRef.current?.setData({ filtros: filtro });

    totalFiltros.splice(index, 1);
    setControlFilters(totalFiltros);
  }

  return (
    <>
      <Container path={`filtros[${index}]`} key={index}>
        <CustomSelect name="campo" options={colunas} onChange={handleChange} />
        {getSelectedValue === 'data_saida' ||
        getSelectedValue === 'data_entrada' ? (
          <CustomDateMask name="valor" />
        ) : (
          <InputCustomizado name="valor" placeholder="valor" />
        )}
        <BotaoRemover size={15} onClick={() => removeFilter(index)} />
      </Container>
    </>
  );
};

export default FilterLine;
