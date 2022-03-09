import React, { useState, useEffect } from 'react';
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
} from '../style';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { BottomConfirmBtn } from '@styles/buttons';
import BotaoVoltar from '@components/BotaoVoltar';

export default function DadosGeraisProdutos() {
  const router = useRouter();
  const [register, setRegister] = useState({
    empacotado: false,
    controle_rastro: false,
  });

  console.log('router.query 2/5', router.query);

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  useEffect(() => {
    console.log('register', register);
  }, [register]);

  return (
    <>
      <Head>
        <title>Orion | Dados Gerais - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 1/5 - Dados Gerais</h4>
      <MainPage>
        <PageStyles>
          <label htmlFor="desc_produto">Descrição</label>
          <InputDescripton id="desc_produto" onChange={inputHandler} />
          <TripleInputLineStyle>
            <div>
              <div>
                <label htmlFor="cod_produto">Código do Produto</label>
                <InputTriple id="cod_produto" onChange={inputHandler} />
              </div>
              <div>
                <label htmlFor="sku">SKU</label>
                <InputTriple id="sku" onChange={inputHandler} />
              </div>
              <div>
                <label htmlFor="ean">EAN</label>
                <InputTriple id="ean" onChange={inputHandler} />
              </div>
            </div>
          </TripleInputLineStyle>
          <TextAreaStyles>
            <span>Informações Adicionais</span>
            <textarea
              name=""
              id="inform_adicionais"
              cols={30}
              rows={10}
              onChange={inputHandler}
            ></textarea>
          </TextAreaStyles>
          <RastroCheckBoxStyle>
            <label htmlFor="controle_rastro">Controle de Rastro</label>
            <Checkbox
              id="controle_rastro"
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
                defaultValue=""
                onChange={inputHandler}
              >
                <option defaultValue=""></option>
                <option value="Fornecedor Nacional">Fornecedor Nacional</option>
                <option value="Fornecedor Extrangeiro">
                  Fornecedor Extrangeiro
                </option>
                <option value="Intercompanhia">Intercompanhia</option>
              </select>
            </div>
            <div>
              <label htmlFor="origem">Origem</label>
              <select id="origem" defaultValue="" onChange={inputHandler}>
                <option defaultValue=""></option>
                <option value="Nacional">Nacional</option>
                <option value="Importado">Importado</option>
                <option value="Mercado Nacional">
                  Comprado no mercado Nacional
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="lote">Lote</label>
              <input type="text" id="lote" onChange={inputHandler} />
            </div>
          </SelectLineStyles>
        </PageStyles>
        <BoxStyle>
          <div>
            <FormControl>
              <RadioGroup
                row
                aria-label="control"
                name="row-radio"
                // value={register}
                onChange={inputHandler}
              >
                <FormControlLabel
                  value="Comprado"
                  control={<Radio id="comprado_produzido" />}
                  label="Comprado"
                />
                <FormControlLabel
                  value="Produzido"
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
              onChange={() =>
                setRegister({ ...register, empacotado: !register.empacotado })
              }
            />
          </div>
        </BoxStyle>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn
          onClick={() =>
            router.push({
              pathname: '/produtos/pesos-medidas',
              query: register,
            })
          }
        >
          Avançar
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
}

DadosGeraisProdutos.auth = true;
