import React from 'react';
import { Scope } from '@unform/core';
import {
  BotaoRemover,
  CustomDateMask,
  SelectCustomizado,
} from '../../Filter-Compare/style';
import colunas from '@utils/painel-controle-filtro';
import compareColumns from '@utils/compare-select';
import { SelectCustom } from '../../Select-Compare/styles';
import nfse_colunas from '@utils/controle-nfse-filtros';

interface IScope {
  index: number;
  abaAtual: string;
  handleChange: () => void;
  remover: (index: number) => void;
}

const DateScope = ({ index, abaAtual, handleChange, remover }: IScope) => {
  return (
    <>
      <Scope path={`filtros[${index}]`} key={index}>
        <SelectCustomizado
          name="campo"
          options={abaAtual != 'nfse' ? colunas : nfse_colunas}
          onChange={handleChange}
        />
        <SelectCustom name="compare" options={compareColumns} />
        <CustomDateMask name="valor" />
        )
        <BotaoRemover size={15} onClick={() => remover(index)} />
      </Scope>
    </>
  );
};

export default DateScope;
