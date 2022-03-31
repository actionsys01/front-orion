import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useFiltro } from '@contexts/filtro';
import { BotaoRemover } from '@styles/Filtro-Styles';
import { FormHandles } from '@unform/core';
import colunas_itens from '@utils/filtros/colunas/colunas_itens';

import {
  Container,
  SelectCustomizado,
  SelectCustom,
  InputCustomizado,
  SelectStatusStyle,
} from '../style';
import {
  compareDouble,
  compareString,
  compareEqual,
  medidas_peso,
  origem,
  fornecedor,
} from '@utils/filtros';

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

  useEffect(() => {
    console.log('getSelectedValue', getSelectedValue);
  }, [getSelectedValue]);

  return (
    <Container path={`filtros[${index}]`} key={index}>
      <SelectCustomizado
        name="campo"
        options={colunas_itens}
        onChange={handleChange}
      />
      <SelectCustom
        name="compare"
        defaultValue={pattern}
        options={
          getSelectedValue === 'desc_produto' ||
          getSelectedValue === 'cod_produto' ||
          getSelectedValue === 'ean'
            ? compareString
            : getSelectedValue === 'peso' ||
              getSelectedValue === 'volume' ||
              getSelectedValue === 'classe_contabil' ||
              getSelectedValue === 'origem'
            ? compareDouble
            : compareEqual
        }
      />
      {getSelectedValue === 'origem' ||
      getSelectedValue === 'classe_contabil' ||
      getSelectedValue === 'um_primaria' ||
      getSelectedValue === 'um_secundaria' ||
      getSelectedValue === 'um_compras' ? (
        <SelectStatusStyle
          name="valor"
          options={
            getSelectedValue === 'origem'
              ? medidas_peso
              : getSelectedValue === 'classe_contabil'
              ? fornecedor
              : medidas_peso
          }
        />
      ) : (
        <InputCustomizado name="valor" placeholder="valor" type="select" />
      )}
      <BotaoRemover size={15} onClick={() => remover(index)} />
    </Container>
  );
};

export default FilterLine;
