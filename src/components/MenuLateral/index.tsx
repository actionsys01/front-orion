import React, { useState, useCallback, useEffect} from 'react';
import { useFiltro } from "@contexts/filtro";
import { useMediaQuery } from "@geist-ui/react";
import {
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Grid,
  LogOut,
  Settings,
  User,
} from "@geist-ui/react-icons";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SubMenu,
} from "react-pro-sidebar";
import {useSecurityContext} from "@contexts/security"
import { useCertificateContext } from '@contexts/certificate';
import * as dashboard from "@services/empresas"

interface IProps {
  setCollapsed(collapsed: boolean): void;
  setToggled(toggled: boolean): void;
  collapsed: boolean;
  toggled: boolean;
}

export default function MenuLateral({
  collapsed,
  setCollapsed,
  toggled,
  setToggled,
}: IProps) {
  const [session] = useSession();
  const router = useRouter();
  const { limpar } = useFiltro();
  const {nfePermission,ctePermission, nfsePermission, profilePermission, userPermission} = useSecurityContext()
  const {isCertificated} = useCertificateContext()


  const isMD = useMediaQuery("lg");

  async function sair() {
    await limpar();
    signOut();
  }



  return (
    <aside>
      <ProSidebar
        breakPoint="sm"
        collapsed={isMD ? collapsed : false}
        width={"13.5rem"}
        toggled={toggled}
        onToggle={() => setToggled(!toggled)}
      >
        <SidebarContent>
          <Menu iconShape="circle">
            {isMD && (
              <MenuItem
                icon={collapsed ? <ChevronsRight /> : <ChevronsLeft />}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            <MenuItem icon={<img src="images/actionsys.jpg" style={{objectFit: "contain", borderRadius: "50%"}} />}
             onClick={() => router.push("/dashboard")}>
              Actionsys
            </MenuItem>
            <SubMenu title="Painéis" icon={<FileText />}>
              {nfePermission && <MenuItem onClick={() => router.push("/nfe")}>NF-e</MenuItem>}
              {ctePermission && <MenuItem onClick={() => router.push("/cte")}>CT-e</MenuItem>}
              {nfsePermission && <MenuItem>NFS-e</MenuItem>}
            </SubMenu>
            <SubMenu title="Aplicações" icon={<Grid />}>
              <MenuItem onClick={() => router.push("/controle-entrada")}>Controle de Entrada</MenuItem>
              {/* <MenuItem>Contagem Física</MenuItem>
              <MenuItem>Controle Divergência</MenuItem> */}
            </SubMenu>
            <SubMenu title="Configurações" icon={<Settings />}>
              {profilePermission && <MenuItem onClick={() => router.push("/perfil-acesso")}>
                Perfil de Acesso
              </MenuItem>}
              {userPermission && <MenuItem onClick={() => router.push("/usuarios")}>
                Usuários
              </MenuItem>}
              <MenuItem onClick={() => router.push({
                pathname: "/certificado-digital",
                query: {isCertificated: "true"}
              })}>
                  Certificado Digital
              </MenuItem>
               {/* <MenuItem onClick={() => router.push("/empresas")}>
                Cadastro de Empresa
              </MenuItem>
               <MenuItem onClick={() => router.push("/planos")}>
                Cadastro de Plano
              </MenuItem> */}
              </SubMenu>
              {!isCertificated && <MenuItem style={{textShadow: "1px 0 red"}}
              onClick={() => router.push({
                pathname: "/dashboard",
                query: {certificate: "open"}
              })}
              >Certificado Digital</MenuItem>}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="circle">
            <SubMenu title={session?.usuario?.nome} icon={<User />}>
              <MenuItem onClick={() => router.push("/trocar-senha")}>
                Trocar senha
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<LogOut />} onClick={sair}>
              Sair
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </aside>
  );
}
