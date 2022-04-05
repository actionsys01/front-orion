import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { MdFileUpload, MdCloudUpload } from 'react-icons/md';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import Loader from '@components/Loader';
import { MainBox, InitialTopPhrase, IconContainer } from './style';
import * as request from '@services/itens';

export default function UploadArquivosExcel() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const uploadFileData = useCallback(async e => {
    // console.log('e.target.files[0', e.target.files[0]);
    // console.log('vim aqui');
    try {
      await request.UploadExcelFile(e.target.files[0], {
        id_empresa: session?.usuario.empresa.id,
        arquivo: '',
        status: 0,
        desc_status: 'confirmado',
      });
      setToast({
        text: 'Upload realizado com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Orion | Importar Dados</title>
      </Head>
      <h2>Importar Dados</h2>
      {/* <p>Para importar os dados é necessário relizar o upload d</p> */}
      <MainBox>
        <InitialTopPhrase>
          <p>Subir os dados para a plataforma</p>
        </InitialTopPhrase>
        <IconContainer>
          <label htmlFor="upload">
            <MdCloudUpload />
            <input type="file" id="upload" onChange={e => uploadFileData(e)} />
          </label>
          <p>
            Subir a planilha com <br /> os dados preenchidos
          </p>
        </IconContainer>
      </MainBox>
    </>
  );
}

UploadArquivosExcel.auth = true;
