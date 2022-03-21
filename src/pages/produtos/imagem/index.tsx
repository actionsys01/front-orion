import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { useCompanyContext } from '@contexts/company';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { UploadCloud } from '@geist-ui/react-icons';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import {
  MainPage,
  AdvanceBtn,
  UMStyles,
  TextDiviser,
  TripleSelectLine,
  ImageBoxStyle,
  UploadBtn,
} from '../style';
import * as companyRequest from '@services/empresas';
import * as categoriesRequest from '@services/cadastros';
import * as request from '@services/produtos';

export default function ImagemProduto() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [register, setRegister] = useState({ ...router.query });
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState<any>();
  const [dataId, setDataId] = useState(0);
  const [logo, setLogo] = useState<File | undefined>();

  console.log('router.query 4/5', router.query);

  async function getCompanyCategoryData() {
    try {
      const response = await companyRequest.getCompanyById(
        Number(session?.usuario.empresa.id),
      );
      const data = response.data.categoria_id;
      const categoryId = data
        .filter(item => item.cod_categoria === 'Geral')
        .map(i => i.id);
      console.log('categoryId', categoryId);
      setDataId(categoryId);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompanyCategoryData();
  }, []);

  async function uploadImage() {
    try {
      await request.UploadImage(Number(router.query.id), logo);
      router.push({
        pathname: '/produtos/codigos-categoria',
        query: { cod_categoria: dataId, id: register.id, sku: register.sku },
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    console.log('register', register);
  }, [register]);

  // useEffect(() => {
  //   console.log('logo', logo);
  //   console.log('image', image);
  // }, [logo, image]);

  return (
    <>
      <Head>
        <title>Orion | Imagem - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 4/5 - Imagem</h4>
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
              ? () => router.push('/produtos/codigos-categoria')
              : () => uploadImage()
          }
        >
          {!showImage ? 'Pular' : 'Avançar'}
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
}

ImagemProduto.auth = true;
