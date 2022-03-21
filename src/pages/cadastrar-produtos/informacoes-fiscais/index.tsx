import React, { Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';
import * as request from '@services/produtos';
import { BottomConfirmBtn } from '@styles/buttons';
import { MainPage, AdvanceBtn, UMStyles } from '../../produtos/style';
import { IProdutos } from '@services/produtos/types';
import { ArrowLeftCircle } from '@geist-ui/react-icons';
import { IPageBack } from '../utils';

interface ICadastroProdutos {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  requestId: number;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
  setIsPageBack: Dispatch<SetStateAction<IPageBack>>;
}

const InformacoesFiscais = ({
  register,
  setRegister,
  requestId,
  setTab,
  isPageBack,
  setIsPageBack,
}: ICadastroProdutos) => {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

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
        id: requestId,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        ...register,
      });
      setTab('Imagem');
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
      <h4>Etapa 3/5 - Informações Fiscais</h4>
      <ArrowLeftCircle
        // eslint-disable-next-line prettier/prettier
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTab('PesosMedidas'),
            setIsPageBack({ ...isPageBack, page_2: true });
        }}
      />
      <MainPage>
        <UMStyles>
          <div>
            <label htmlFor="ncm">NCM</label>
            <input type="text" id="ncm" onChange={inputHandler} />
          </div>
          <div>
            <label htmlFor="fci">FCI</label>
            <input type="text" id="fci" onChange={inputHandler} />
          </div>
          <div>
            <label htmlFor="finalidade_compra">Finalidade da Compra</label>
            <select
              style={{ margin: '0', width: '220px' }}
              id="finalidade_compra"
            ></select>
          </div>
        </UMStyles>
      </MainPage>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: '50%',
        }}
      >
        <AdvanceBtn
          onClick={
            !isPageBack.page_3 ? () => updateProduct() : () => setTab('Imagem')
          }
        >
          Avançar
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default InformacoesFiscais;
