import { useFiltro } from "@contexts/filtro";
import { Avatar, useMediaQuery } from "@geist-ui/react";
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
// import logo from "@assets/images/actionsys.jpg"
// import logo from "@assets/images/reckitt-logo.png";
import {useSecurityContext} from "@contexts/security"

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
            <MenuItem icon={<img src="images/actionsys.jpg" style={{objectFit: "contain", borderRadius: "50%"}} />} onClick={() => router.push("/dashboard")}>
              Actionsys
            </MenuItem>
            <SubMenu title="Painéis" icon={<FileText />}>
              {nfePermission && <MenuItem onClick={() => router.push("/nfe")}>NFe</MenuItem>}
              {ctePermission && <MenuItem onClick={() => router.push("/cte")}>CTe</MenuItem>}
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
               <MenuItem onClick={() => router.push("/empresas")}>
                Cadastro de Empresa
              </MenuItem>
               <MenuItem onClick={() => router.push("/planos")}>
                Cadastro de Plano
              </MenuItem>
              </SubMenu>
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
