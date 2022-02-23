import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import BotaoVoltar from '@components/BotaoVoltar';
import {
  Section,
  Column,
  SmallInputs,
  InputStyle,
  CheckboxContainer,
} from './style';
import { Checkbox } from '@material-ui/core';
import { BottomConfirmBtn } from '@styles/buttons';
import { useSession } from 'next-auth/client';
import * as companyRequest from '@services/empresas';
import { useToasts } from '@geist-ui/react';
import router from 'next/router';
import MaskedInput from '@components/Masked-Input';
import { estados } from '@utils/estados';
export default function CadastrarCnpj() {
  const [session] = useSession();
  const [, setToast] = useToasts();
  const company_id = Number(session.usuario.empresa.id);
  const [request, setRequest] = useState({
    name: '',
    cnpj: '',
    uf: '',
    nfe: false,
    cte: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!request.name || !request.cnpj || !request.uf) {
        setToast({
          text: 'Por favor os campos obrigatórios',
          type: 'warning',
        });
        return;
      }
      await companyRequest.createCnpj(company_id, {
        cnpj: request.cnpj,
        nome: request.name,
        uf: request.uf,
        cte: request.cte,
        nfe: request.nfe,
        status_sefaz: 100,
      });
      setToast({
        text: 'Cadastro realizado com sucesso',
        type: 'success',
      });
    } catch (error) {
      setToast({
        text: error.response.data.mensagem,
        type: 'warning',
      });
    }
    router.push('/cnpjs-empresa');
  }

  // useEffect(() => {
  //   console.log('request', request);
  // }, [request]);

  return (
    <>
      <Head>
        <title>Orion | Cadastrar CNPJs</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro CNPJ</h2>
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
                    <option defaultValue=""></option>
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
          <button type="submit">adicionar</button>
        </BottomConfirmBtn>
      </Section>
    </>
  );
}

CadastrarCnpj.auth = true;
