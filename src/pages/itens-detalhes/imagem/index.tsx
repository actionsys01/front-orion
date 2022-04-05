import React, { useState, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { UploadCloud } from '@geist-ui/react-icons';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import {
  MainPage,
  AdvanceBtn,
  ImageBoxStyle,
  UploadBtn,
} from '@pages/cadastrar-itens/style';
import * as companyRequest from '@services/empresas';
import * as categoriesRequest from '@services/cadastros';
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';

interface IDetails {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  id: number;
}

const ImagemDetalhes = ({ register, setRegister, id }: IDetails) => {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState<any>();
  const [dataId, setDataId] = useState(0);
  const [logo, setLogo] = useState<File | undefined>();

  // async function getImage() {
  //   try {
  //     await request.
  //   } catch (error) {

  //   }
  // }

  async function uploadImage() {
    try {
      await request.UploadImage(Number(id), logo);
    setToast({
        text: 'Atualização concluída com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema tente novamente',
        type: 'warning',
      });
    }
  }

  return (
    <>
      <MainPage>
        <ImageBoxStyle>
          <img src={!showImage ? register?.url_foto : image} />
        </ImageBoxStyle>
      </MainPage>
      <UploadBtn style={{ marginTop: '14px', boxSizing: 'border-box' }}>
        <label htmlFor="logo">
          <div>
            Upload
            <input
              type="file"
              id="logo"
              disabled={router.query.action === 'visualizar'}
              accept="image/png, image/gif, image/jpeg"
              onChange={e => {
                setLogo(e.target.files[0]),
                  setImage(URL.createObjectURL(e.target.files[0])),
                  setShowImage(true);
              }}
            />
          </div>
        </label>
      </UploadBtn>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          display: router.query.action === 'visualizar' ? 'none' : '',
        }}
      >
        <AdvanceBtn onClick={() => uploadImage()}>Atualizar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default ImagemDetalhes;
