import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  MainPage,
  InputDescripton,
  PageStyles,
  InputTriple,
  TripleInputLineStyle,
  BoxStyle,
  TextAreaStyles,
  RastroCheckBoxStyle,
  SelectLineStyles,
  AdvanceBtn,
} from '@pages/itens/style';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { BottomConfirmBtn } from '@styles/buttons';
import BotaoVoltar from '@components/BotaoVoltar';
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';

interface IDetails {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
}

const DadosGeraisDetalhes = ({ register, setRegister }: IDetails) => {
  const router = useRouter();
  const [session] = useSession();
  const [, setToast] = useToasts();

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  async function updateProduct() {
    try {
      await request.UpdateProduct({
        id_empresa: Number(session?.usuario.empresa.id),
        sku: Number(register.sku),
        user_update: Number(session?.usuario.id),
        // cod_produto: register.cod_produto,
        ...register,
      });
      // console.log('response', response.data.id, response.data.sku);
      setToast({
        text: 'Atualização concluída com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  return (
    <>
      <MainPage>
        <PageStyles>
          <label htmlFor="desc_produto">Descrição</label>
          <InputDescripton
            id="desc_produto"
            value={register?.desc_produto}
            readOnly={router.query.action === 'visualizar'}
            onChange={inputHandler}
          />
          <TripleInputLineStyle>
            <div>
              <div>
                <label htmlFor="cod_produto">Código do Produto</label>
                <InputTriple
                  id="cod_produto"
                  readOnly={router.query.action === 'visualizar'}
                  value={register?.cod_produto}
                  onChange={inputHandler}
                />
              </div>
              <div>
                <label htmlFor="sku">SKU</label>
                <InputTriple
                  readOnly={router.query.action === 'visualizar'}
                  id="sku"
                  value={register?.sku}
                  onChange={e =>
                    setRegister({ ...register, sku: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label htmlFor="ean">EAN</label>
                <InputTriple
                  readOnly={router.query.action === 'visualizar'}
                  id="ean"
                  value={register?.ean}
                  onChange={inputHandler}
                />
              </div>
            </div>
          </TripleInputLineStyle>
          <TextAreaStyles>
            <span>Informações Adicionais</span>
            <textarea
              name=""
              id="inform_adicionais"
              readOnly={router.query.action === 'visualizar'}
              cols={30}
              rows={10}
              value={register?.inform_adicionais}
              onChange={inputHandler}
            ></textarea>
          </TextAreaStyles>
          <RastroCheckBoxStyle>
            <label htmlFor="controle_rastro">Controle de Rastro</label>
            <Checkbox
              disabled={router.query.action === 'visualizar'}
              id="controle_rastro"
              checked={register?.controle_rastro == true}
              onChange={() =>
                setRegister({
                  ...register,
                  controle_rastro: !register.controle_rastro,
                })
              }
            />
          </RastroCheckBoxStyle>
          <SelectLineStyles>
            <div>
              <label htmlFor="classe_contabil">Classe Contábil</label>
              <select
                id="classe_contabil"
                disabled={router.query.action === 'visualizar'}
                // value={register.classe_contabil}
                defaultValue={register?.classe_contabil}
                onChange={inputHandler}
              >
                <option defaultValue="">{register?.classe_contabil}</option>
                {register?.classe_contabil != 'Fornecedor Nacional' && (
                  <option value="Fornecedor Nacional">
                    Fornecedor Nacional
                  </option>
                )}
                {register?.classe_contabil != 'Fornecedor Extrangeiro' && (
                  <option value="Fornecedor Extrangeiro">
                    Fornecedor Extrangeiro
                  </option>
                )}
                {register?.classe_contabil != 'Intercompanhia' && (
                  <option value="Intercompanhia">Intercompanhia</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="origem">Origem</label>
              <select
                disabled={router.query.action === 'visualizar'}
                id="origem"
                defaultValue={register?.origem}
                onChange={inputHandler}
              >
                <option defaultValue="">
                  {register?.origem === 'BR'
                    ? 'Nacional'
                    : register?.origem === 'Imp'
                    ? 'Importado'
                    : register?.origem === 'Imp'
                    ? 'Comprado no Mercado Nacional'
                    : ''}
                </option>
                {register?.origem != 'BR' && (
                  <option value="BR">Nacional</option>
                )}
                {register?.origem != 'Imp' && (
                  <option value="Imp">Importado</option>
                )}
                {register?.origem != 'Nac' && (
                  <option value="Nac">Comprado no Mercado Nacional</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="lote">Lote</label>
              <input
                type="text"
                readOnly={router.query.action === 'visualizar'}
                id="lote"
                value={register?.lote}
                onChange={inputHandler}
              />
            </div>
          </SelectLineStyles>
        </PageStyles>
        <BoxStyle>
          <div>
            <FormControl disabled={router.query.action === 'visualizar'}>
              <RadioGroup
                row
                aria-label="control"
                name="row-radio"
                // value={register.comprado_produzido}
                onChange={inputHandler}
              >
                <FormControlLabel
                  value="C"
                  checked={register?.comprado_produzido === 'C'}
                  control={<Radio id="comprado_produzido" />}
                  label="Comprado"
                />
                <FormControlLabel
                  value="P"
                  checked={register?.comprado_produzido === 'P'}
                  control={<Radio id="comprado_produzido" />}
                  label="Produzido"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="checkbox-line">
            <label htmlFor="empacotado">Item Empacotado</label>
            <Checkbox
              id="empacotado"
              disabled={router.query.action === 'visualizar'}
              checked={register?.empacotado === true}
              onChange={() =>
                setRegister({ ...register, empacotado: !register.empacotado })
              }
            />
          </div>
        </BoxStyle>
      </MainPage>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          display: router.query.action === 'visualizar' ? 'none' : '',
        }}
      >
        <AdvanceBtn onClick={() => updateProduct()}>Atualizar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default DadosGeraisDetalhes;
