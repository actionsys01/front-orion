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
import * as request from '@services/produtos';
import { IProdutos } from '@services/produtos/types';
export default function DadosGeraisProdutos() {
  const router = useRouter();
  const [session] = useSession();
  const [, setToast] = useToasts();
  const [register, setRegister] = useState({
    empacotado: false,
    controle_rastro: false,
    sku: 0,
  } as IProdutos);

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  async function createProduct() {
    if (
      !register.desc_produto ||
      !register.cod_produto ||
      !register.sku ||
      !register.comprado_produzido
    ) {
      setToast({
        text: 'Favor preencher os campos obrigatórios.',
        type: 'warning',
      });
      return;
    }
    try {
      const response = await request.CreateProduct({
        id_empresa: Number(session?.usuario.empresa.id),
        sku: Number(register.sku),
        user_insert: Number(session?.usuario.id),
        // cod_produto: register.cod_produto,
        ...register,
      });
      // console.log('response', response.data.id, response.data.sku);
      router.push({
        pathname: '/produtos/pesos-medidas',
        query: { id: response.data.id, sku: response.data.sku },
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
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
                <InputTriple
                  id="sku"
                  onChange={e =>
                    setRegister({ ...register, sku: Number(e.target.value) })
                  }
                />
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
                <option value="BR">Nacional</option>
                <option value="Imp">Importado</option>
                <option value="Nac">Comprado no mercado Nacional</option>
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
                  value="C"
                  control={<Radio id="comprado_produzido" />}
                  label="Comprado"
                />
                <FormControlLabel
                  value="P"
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
        <AdvanceBtn onClick={() => createProduct()}>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
}

DadosGeraisProdutos.auth = true;
