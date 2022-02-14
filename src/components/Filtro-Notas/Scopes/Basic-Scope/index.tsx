import React from 'react';
import { Scope } from '@unform/core';
import {
  BotaoRemover,
  InputCustomizado,
  SelectCustomizado,
} from '../../Filter-Compare/style';
import colunas from '@utils/painel-controle-filtro';
import compareColumns from '@utils/compare-select';
import { SelectCustom } from '../../Filtro-Components/Select-Compare/styles';
import nfse_colunas from '@utils/controle-nfse-filtros';

interface IScope {
  index: number;
  abaAtual: string;
  handleChange: (e) => void;
  remover: (index: number) => void;
}

const BasicScope = ({ index, abaAtual, handleChange, remover }: IScope) => {
  return (
    <>
      <Scope path={`filtros[${index}]`} key={index}>
        <SelectCustomizado
          name="campo"
          options={abaAtual != 'nfse' ? colunas : nfse_colunas}
          onChange={handleChange}
        />
        <SelectCustom name="compare" options={compareColumns} />
        <InputCustomizado name="valor" placeholder="valor" type="select" />
        <BotaoRemover size={15} onClick={() => remover(index)} />
      </Scope>
    </>
  );
};

export default BasicScope;
