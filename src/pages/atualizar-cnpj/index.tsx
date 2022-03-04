import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BotaoVoltar from '@components/BotaoVoltar';
import {
  Section,
  Column,
  SmallInputs,
  InputStyle,
  CheckboxContainer,
} from '../cadastrar-cnpj/style';
import { Checkbox } from '@material-ui/core';
import { BottomConfirmBtn } from '@styles/buttons';
import { useSession } from 'next-auth/client';
import * as companyRequest from '@services/empresas';
import { useToasts } from '@geist-ui/react';
import router from 'next/router';
import MaskedInput from '@components/Masked-Input';
import { estados } from '@utils/estados';

export default function AtualizarCnpj() {
  const [name, setName] = useState(router.query.nome.toString());
  const [cnpj, setCnpj] = useState(router.query.cnpj.toString());
  const [uf, setUf] = useState(router.query.uf.toString().toUpperCase());
  const [, setToast] = useToasts();
  const id = Number(router.query.id);
  const [request, setRequest] = useState({
    name: router.query.nome.toString(),
    cnpj: router.query.cnpj.toString(),
    uf: router.query.uf.toString().toUpperCase(),
    nfe: router.query.nfe === 'true',
    cte: router.query.cte === 'true',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!request.name || !request.cnpj || !request.uf) {
        setToast({
          text: 'Por favor preencha todos os campos',
          type: 'warning',
        });
        return;
      }
      await companyRequest.updateCnpj(id, {
        cnpj: request.cnpj,
        nome: request.name,
        uf: request.uf,
        nfe: request.nfe,
        cte: request.cte,
        status_sefaz: 100,
      });
      setToast({
        text: 'Cadastro realizado com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
    router.push('/cnpjs-empresa');
  }

  useEffect(() => {
    console.log('request', request);
  }, [request]);

  return (
    <>
      <Head>
        <title>Orion | Atualizar CNPJs</title>
      </Head>
      <BotaoVoltar />
      <h2>Atualizar CNPJ</h2>
      <Section onSubmit={handleSubmit}>
        <section>
          <div>
            <InputStyle>
              <label htmlFor="cnpj">CNPJ</label>
              <MaskedInput
                value={request.cnpj}
                onChange={event =>
                  setRequest({ ...request, cnpj: event.target.value })
                }
              />
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                value={request.name}
                onChange={e => setRequest({ ...request, name: e.target.value })}
              />
            </InputStyle>
          </div>
          <div>
            <SmallInputs>
              <Column>
                <div className="uf">
                  <span>UF</span>
                  <select
                    onChange={e =>
                      setRequest({ ...request, uf: e.target.value })
                    }
                  >
                    <option value={request.uf}>{request.uf}</option>
                    {estados.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <CheckboxContainer>
                  <span>
                    <span>
                      <Checkbox
                        checked={request.nfe}
                        onChange={() =>
                          setRequest({ ...request, nfe: !request.nfe })
                        }
                      />
                    </span>
                    NF-e
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={request.cte}
                        onChange={() =>
                          setRequest({ ...request, cte: !request.cte })
                        }
                      />
                    </span>
                    CT-e
                  </span>
                </CheckboxContainer>
              </Column>
            </SmallInputs>
          </div>
        </section>
        <BottomConfirmBtn>
          <button type="submit">atualizar</button>
        </BottomConfirmBtn>
      </Section>
    </>
  );
}

AtualizarCnpj.auth = true;
