import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';
import { IPageBack } from '../utils';

interface ICadastroProdutos {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  requestId: number;
  setRequestId: Dispatch<SetStateAction<number>>;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
}

const DadosGeraisProdutos = ({
  register,
  setRegister,
  requestId,
  setRequestId,
  setTab,
  isPageBack,
}: ICadastroProdutos) => {
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
        ...register,
      });
      setRequestId(Number(response.data.id));
      setTab('PesosMedidas');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  async function updateProduct() {
    try {
      await request.UpdateProduct({
        id: requestId,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        ...register,
      });
      setTab('PesosMedidas');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    console.log('register', register)
  }, [register])


  return (
    <>
      <Head>
        <title>Orion | Dados Gerais - Produtos</title>
      </Head>
      <h4>Etapa 1/5 - Dados Gerais</h4>
      <MainPage>
        <PageStyles>
          <label htmlFor="desc_produto">Descrição</label>
          <InputDescripton
            id="desc_produto"
            value={register?.desc_produto}
            onChange={inputHandler}
          />
          <TripleInputLineStyle>
            <div>
              <div>
                <label htmlFor="cod_produto">Código do Produto</label>
                <InputTriple
                  id="cod_produto"
                  value={register?.cod_produto}
                  onChange={inputHandler}
                />
              </div>
              <div>
                <label htmlFor="sku">SKU</label>
                <InputTriple
                  id="sku"
                  type="number"
                  value={register?.sku != 0 ? register?.sku : null}
                  onChange={e =>
                    setRegister({ ...register, sku: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label htmlFor="ean">EAN</label>
                <InputTriple
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
              value={register?.inform_adicionais}
              cols={30}
              rows={10}
              onChange={inputHandler}
            ></textarea>
          </TextAreaStyles>
          <RastroCheckBoxStyle>
            <label htmlFor="controle_rastro">Controle de Rastro</label>
            <Checkbox
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
                defaultValue=""
                onChange={inputHandler}
              >
                <option value={register?.classe_contabil}>
                  {register?.classe_contabil}
                </option>
                <option value="Fornecedor Nacional">Fornecedor Nacional</option>
                <option value="Fornecedor Extrangeiro">
                  Fornecedor Extrangeiro
                </option>
                <option value="Intercompanhia">Intercompanhia</option>
              </select>
            </div>
            <div>
              <label htmlFor="origem">Origem</label>
              <select
                id="origem"
                value={register?.origem}
                onChange={inputHandler}
              >
                <option value={register?.origem}>{register?.origem}</option>
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
            <div>
              <label htmlFor="empacotado">Item Empacotado</label>
              <Checkbox
                id="empacotado"
                checked={register?.empacotado === true}
                onChange={() =>
                  setRegister({ ...register, empacotado: !register.empacotado })
                }
              />
            </div>
            <div>
              <label htmlFor="empacotado" style={{ marginRight: '54px' }}>
                Estoque
              </label>
              <Checkbox
                id="empacotado"
                checked={register?.estoque === true}
                onChange={() =>
                  setRegister({ ...register, estoque: !register.estoque })
                }
              />
            </div>
          </div>
        </BoxStyle>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn
          onClick={
            !isPageBack.page_1 ? () => createProduct() : () => updateProduct()
          }
        >
          Avançar
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default DadosGeraisProdutos;
