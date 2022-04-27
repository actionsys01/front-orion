import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import Loader from '@components/Loader';
import { TextContainer, TokenContainer } from './styles';
import { FilterBtn } from '@styles/buttons';
import * as request from '@services/empresas';

export default function IntegracaoSistemas() {
  const [session] = useSession();
  const [token, setToken] = useState<any>();
  const [, setToast] = useToasts();
  const textAreaRef = useRef(null);

  async function generateToken() {
    try {
      const tokenRequest = await request.createToken({
        empresa_id: Number(session?.usuario.empresa.id),
        user_insert: Number(session?.usuario.id),
      });
      setToken(tokenRequest.data.token);
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    console.log(e.target.focus)
  }


  return (
    <>
      <Head>
        <title>Orion | Integração de Sistemas</title>
      </Head>
      <h2>Integração de Sistemas</h2>
      <h4>O GRA Web permite a integração com outros sistemas:</h4>
      <TextContainer>
        <h5>Token de acesso</h5>
        <h6>
          Clique no botão abaixo para gerar um token definitivo <br /> que
          permitirá o acesso ao nosso sistema sem realizar o login pelo nosso
          web site:
        </h6>
        <FilterBtn>
          <button onClick={() => generateToken()}>Token</button>
        </FilterBtn>
      </TextContainer>
      <TokenContainer>
        <div>
          <textarea
            onClick={e => copyToClipboard(e)}
            ref={textAreaRef}
            value={token}
          >
            {token}
          </textarea>
        </div>
      </TokenContainer>

      <TextContainer>
        <h5>Acesso as rotas</h5>
        <h6>
          Para verificar as rotas de API da nossa aplicação, clique no linka
          baixo:
        </h6>
        <h6>
          <a href="https://gra-web.herokuapp.com/api-docs" target="_blank">
            www.gra-web.com/rotas-api
          </a>
        </h6>
      </TextContainer>
    </>
  );
}

IntegracaoSistemas.auth = true;
