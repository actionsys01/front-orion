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

export default function UploadArquivosExcel() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

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
          <MdCloudUpload />
          <p>
            Subir a planilha com <br /> os dados preenchidos
          </p>
        </IconContainer>
      </MainBox>
    </>
  );
}

UploadArquivosExcel.auth = true;
