import React, { useState, Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import { UploadCloud } from '@geist-ui/react-icons';
import Loader from '@components/Loader';
import { IPageBack } from '../utils';
import { ArrowLeftCircle } from '@geist-ui/react-icons';
import { BottomConfirmBtn } from '@styles/buttons';
import {
  MainPage,
  AdvanceBtn,
  ImageBoxStyle,
  UploadBtn,
} from '../../produtos/style';

import * as request from '@services/produtos';

interface ICadastroProdutos {
  requestId: number;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
  setIsPageBack: Dispatch<SetStateAction<IPageBack>>;
}

const ImagemProduto = ({
  requestId,
  setTab,
  isPageBack,
  setIsPageBack,
}: ICadastroProdutos) => {
  const [, setToast] = useToasts();
  const router = useRouter();

  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState<any>();
  const [logo, setLogo] = useState<File | undefined>();

  async function uploadImage() {
    try {
      await request.UploadImage(requestId, logo);
      setTab('CodigoCategoria');
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
      <h4>Etapa 4/5 - Imagem</h4>
      <ArrowLeftCircle
        // eslint-disable-next-line prettier/prettier
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTab('InformacoesFiscais'),
            setIsPageBack({ ...isPageBack, page_3: true });
        }}
      />
      <MainPage>
        <ImageBoxStyle>
          {!showImage ? <UploadCloud /> : <img src={image} />}
          {!showImage ? <p>Nenhum arquivo selecionado</p> : ''}
          {!showImage ? (
            <UploadBtn>
              <label htmlFor="logo">
                <div>
                  Upload
                  <input
                    type="file"
                    id="logo"
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
          ) : (
            ''
          )}
        </ImageBoxStyle>
      </MainPage>
      {showImage && (
        <UploadBtn style={{ marginTop: '14px', boxSizing: 'border-box' }}>
          <label htmlFor="logo">
            <div>
              Upload
              <input
                type="file"
                id="logo"
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
      )}
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn
          onClick={
            !showImage
              ? () => setTab('CodigoCategoria')
              : isPageBack.page_4
              ? () => setTab('CodigoCategoria')
              : () => uploadImage()
          }
        >
          {!showImage ? 'Pular' : 'Avançar'}
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default ImagemProduto;
