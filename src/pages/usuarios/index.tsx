import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { RefreshCw } from '@geist-ui/react-icons';
import { Button, Row, Spacer, Text } from '@geist-ui/react';
import { Plus } from '@geist-ui/react-icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';

import { useSecurityContext } from '@contexts/security';

import getUsersByCompanyId from '@services/usuarios/getUsersByCompanyId';

import capitalize from '@utils/capitalize';

import UserPopover from './Popover';
import UserModal from './modal';
import { TableGrid } from '@styles/tableStyle';
import { Pages } from '@styles/pages';
import { RefreshBtn } from '@styles/RefreshBtn';

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
}

interface Perfil {
  id: number;
  nome: string;
  descricao: string;
  criadoEm: string;
  atualizadaEm: string;
  criadoPorIp: string;
  atualizadoPorIp: string;
}

export default function Usuarios() {
  const { userPermissions } = useSecurityContext();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [userModalVisible, setUserModalVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getUsersAndTotalPage = useCallback(async () => {
    const responseNfes: any = await getUsersByCompanyId(page);
    const { data } = responseNfes;

    setUsuarios(data.usuarios);

    setQuantityPage(Math.ceil(data.total / 8));
  }, [page]);

  useEffect(() => {
    getUsersAndTotalPage();
  }, [page]);

  function optionUserPopover(data: any, i: number) {
    return (
      <UserPopover
        data={data}
        usuarios={usuarios}
        setUsuarios={setUsuarios}
        setUserModalVisible={setUserModalVisible}
        i={i}
      />
    );
  }

  const UsersByCompanyData = useMemo(() => {
    const allData: any = [];
    if (usuarios) {
      usuarios.forEach((item, i) => {
        allData.push({
          ...item,
          perfil_nome: item.perfil.nome,
          emailFormatted: item.email.toLowerCase(),
          nome: capitalize(item.nome),
          option: optionUserPopover(item, i),
        });
      });
    }

    return allData.sort(comparations);
  }, [usuarios]);

  function comparations(a: any, b: any) {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <Head>
        <title>Orion | Usuários</title>
      </Head>
      <Text h2>Usuários</Text>
      <Row justify="end" align="middle">
        <RefreshBtn>
          <RefreshCw
            onClick={() => {
              getUsersAndTotalPage();
            }}
          />
        </RefreshBtn>
        <Button
          type="success-light"
          size="small"
          icon={<Plus />}
          disabled={!userPermissions.ADICIONAR}
          onClick={() => router.push('/cadastrar-usuario')}
        >
          Adicionar
        </Button>
      </Row>
      <Spacer y={1} />
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
            </tr>
          </thead>
          {userPermissions.ADICIONAR && (
            <tbody>
              {UsersByCompanyData.map((item: any, i: any) => (
                <tr key={i}>
                  <td>{item.option}</td>
                  <td style={{ textTransform: 'capitalize' }}>{item.nome}</td>
                  <td>{item.email}</td>
                  <td>{item.perfil_nome}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </TableGrid>
      <Pages>
        <Pagination
          style={{ margin: '0 auto' }}
          onChange={handleChange}
          count={quantityPage}
          shape="rounded"
        />
      </Pages>
      {userModalVisible && (
        <UserModal setUserModalVisible={setUserModalVisible} />
      )}
    </>
  );
}

Usuarios.auth = true;
