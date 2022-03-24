import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import { UploadCloud } from '@geist-ui/react-icons';
import Loader from '@components/Loader';
import { IPageBack } from '../utils';
import { ArrowLeftCircle } from '@geist-ui/react-icons';
import { BottomConfirmBtn } from '@styles/buttons';
import { MainPage, AdvanceBtn, ImageBoxStyle, UploadBtn } from '../style';

import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';

interface ICadastroProdutos {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  requestId: number;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
  setIsPageBack: Dispatch<SetStateAction<IPageBack>>;
}

const ImagemProduto = ({
  requestId,
  setTab,
  register,
  isPageBack,
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

  async function getImage() {
    try {
      const response = await request.GetProductById(requestId);
      const dataImg = response.data.url_foto;
      setImage(dataImg);
      dataImg != null && setShowImage(true);
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    isPageBack.page_4 && getImage();
  }, []);

  useEffect(() => {
    console.log('showImage', showImage);
  }, [showImage]);

  return (
    <>
      <h4>Etapa 4/5 - Imagem</h4>
      <ArrowLeftCircle
        // eslint-disable-next-line prettier/prettier
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTab('InformacoesFiscais');
        }}
      />
      <MainPage>
        <ImageBoxStyle>
          {!showImage && !isPageBack.page_4 ? (
            <UploadCloud />
          ) : isPageBack.page_4 ? (
            <img src={image} />
          ) : (
            <img src={image} />
          )}
          {!showImage && !isPageBack.page_4 ? (
            <p>Nenhum arquivo selecionado</p>
          ) : (
            ''
          )}
          {!showImage && !isPageBack.page_4 ? (
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
            !showImage ? () => setTab('CodigoCategoria') : () => uploadImage()
          }
        >
          {!showImage ? 'Pular' : 'Avançar'}
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default ImagemProduto;
