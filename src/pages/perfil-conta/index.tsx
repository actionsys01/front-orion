import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { ProfileBody, BodyRow } from './style';
import Modal from './modal';
import LogoModal from './logo-modal';
import * as companyRequest from '@services/empresas';
import { useSecurityContext } from '@contexts/security';
import { useCompanyContext } from '@contexts/company';
export interface CompanyProps {
  empresa_id: number;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  email: string;
  status: number;
  plano_id: number;
}

export default function PerfilConta() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [hasLogo, setHasLogo] = useState(false);
  const company_id = Number(session?.usuario.empresa.id);
  const { isCompanyConfig } = useSecurityContext();
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyData, setCompanyData] = useState({} as CompanyProps);
  const [visibleModal, setVisibleModal] = useState(false);
  const { getCompanyFeatures } = useCompanyContext();
  const [spinning, setSpinning] = useState(false);

  const modalHandler = useCallback(() => {
    setVisibleModal(!visibleModal);
  }, [visibleModal]);

  const getLogo = useCallback(async () => {
    try {
      const response = await companyRequest.getCompanyById(company_id);
      const data = response.data;
      setCompanyData(data);
      const logoUrl = data.logo;
      logoUrl && setHasLogo(true);
      if (logoUrl.includes('.jpeg')) {
        const jpegIndex = logoUrl.indexOf('.jpeg', 0);
        const jpeg = logoUrl.substring(0, jpegIndex + 5);
        setCompanyLogo(jpeg);
      }
      if (logoUrl.includes('.jpg')) {
        const jpgIndex = logoUrl.indexOf('.jpg', 0);
        const jpg = logoUrl.substring(0, jpgIndex + 4);
        setCompanyLogo(jpg);
      }
      if (logoUrl.includes('.png')) {
        const pngIndex = logoUrl.indexOf('.png', 0);
        const png = logoUrl.substring(0, pngIndex + 4);
        setCompanyLogo(png);
      }
    } catch (error) {
      console.log(error);
      // setToast({
      //     text: "Houve um problema, por favor tente novamenteeeeeeee",
      //     type: "warning"
      // })
    }
  }, [companyData]);

  useEffect(() => {
    getLogo();
  }, []);

  const registerFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setSpinning(true);
      if (event.target.files) {
        try {
          await companyRequest.uploadLogo(company_id, event.target.files[0]);
          setToast({
            text: 'Logo enviado com sucesso',
            type: 'success',
          });
          getLogo();
          getCompanyFeatures();
        } catch (error) {
          console.log(error);
          setToast({
            text: 'Houve um problema tente novamente',
            type: 'warning',
          });
        }
        setVisibleModal(false);
        setSpinning(false);
      }
    },
    [],
  );

  return (
    <>
      <Head>
        <title>Orion | Conta</title>
      </Head>
      <BotaoVoltar />
      <h2>Configurações de Conta</h2>
      {isCompanyConfig && (
        <ProfileBody>
          <div>
            <LogoModal
              registerFile={registerFile}
              hasLogo={hasLogo}
              companyLogo={companyLogo}
              modalHandler={modalHandler}
              visibleModal={visibleModal}
              spinning={spinning}
            />
            <BodyRow>
              <h6>Razão Social:</h6>
              <h5>{companyData?.razao_social}</h5>
            </BodyRow>
            <BodyRow>
              <h6>Nome Fantasia:</h6>
              <h5>{companyData?.nome_fantasia}</h5>
            </BodyRow>
            <BodyRow>
              <h6>CNPJ:</h6>
              <h5>{companyData?.cnpj}</h5>
            </BodyRow>
            <BodyRow>
              <h6>E-mail:</h6>
              <h5>{companyData.email}</h5>
            </BodyRow>
            <Modal data={companyData} getLogo={getLogo} />
          </div>
        </ProfileBody>
      )}
    </>
  );
}

PerfilConta.auth = true;
