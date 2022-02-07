import React, {
    useEffect,
    useContext,
    useCallback,
    useState,
    useMemo,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import {
    tripleLabels,
    entranceLabels,
    middlePermissions,
    severalPermissions,
} from '@utils/permissions-labels';
import {
    initialState,
    initial,
    initialStateEntrada,
    initialStateB,
} from '@utils/initial-states';
interface ContextProps {
    nfePermissions: NewPermissions;
    nfsePermissions: NewPermissions;
    entrancePermissions: NewPermissions;
    cnpjPermissions: NewPermissions;
    userPermissions: NewPermissions;
    profilePermission: NewPermissions;
    ctePermissions: NewPermissions;
    certificatePermissions: NewPermissions;
    isCompanyConfig: boolean;
}

interface Permissions {
    categoria: string;
    acao: string;
}
interface NewPermissions {
    [key: string]: boolean;
}

const SecurityContext = React.createContext({} as ContextProps);

const SecurityProvider: React.FC = ({ children }: any) => {
    const [session] = useSession();
    const [permissions, setPermissions] = useState<Permissions[]>([]);
    const [, setToast] = useToasts();

    const [nfePermissions, setNfePermissions] = useState({ ...initialState });
    const [profilePermission, setProfilePermission] = useState({ ...initial });
    const [cnpjPermissions, setCnpjPermissions] = useState({ ...initial });
    const [userPermissions, setUserPermissions] = useState({ ...initial });
    const [certificatePermissions, setCertificatePermissions] = useState({
        ...initial,
    });
    const [nfsePermissions, setNfsePermissions] = useState({
        ...initialStateB,
    });
    const [ctePermissions, setCtePermissions] = useState({ ...initialStateB });
    const [entrancePermissions, setEntrancePermissions] = useState({
        ...initialStateEntrada,
    });
    const [isCompanyConfig, setIsCompanyConfig] = useState(false);

    const getPermissions = async () => {
        try {
            const data = session?.usuario.perfil.permissoes;
            //  console.log("inside permission", data)
            setPermissions(data);
            return data || [];
        } catch (error) {
            setToast({
                text: 'Houve um erro, por favor reinicie seu navegador.',
                type: 'warning',
            });
            return [];
        }
    };

    useEffect(() => {
        getPermissions();
    }, [session]);

    function getUserPermissions() {
        if (permissions) {
            const nfeCheck: string[] = permissions
                ?.filter(item => item.categoria === 'NFE')
                .map(permit => permit.acao);
            nfeCheck && verifyFurtherPermissions(nfeCheck, 'nfe');
            const cnpjPermissionCheck: string[] = permissions
                ?.filter(item => item.categoria === 'CNPJS')
                .map(permit => permit.acao);
            cnpjPermissionCheck &&
                verifyPermissions(cnpjPermissionCheck, 'cnpj');
            const userPermissionCheck: string[] = permissions
                ?.filter(item => item.categoria === 'USUARIO')
                .map(permit => permit.acao);
            userPermissionCheck &&
                verifyPermissions(userPermissionCheck, 'usuario');
            const profileCheck: string[] = permissions
                ?.filter(item => item.categoria === 'PERFIS')
                .map(permit => permit.acao);
            profileCheck && verifyPermissions(profileCheck, 'perfis');
            const certificateCheck: string[] = permissions
                ?.filter(item => item.categoria === 'CERTIFICADO')
                .map(permit => permit.acao);
            certificateCheck &&
                verifyPermissions(certificateCheck, 'certificado');
            const entranceCheck: string[] = permissions
                ?.filter(item => item.categoria === 'ENTRADA')
                .map(permit => permit.acao);
            entranceCheck && verifyFurtherPermissions(entranceCheck, 'entrada');
            const nfseCheck: string[] = permissions
                ?.filter(item => item.categoria === 'NFSE')
                .map(permit => permit.acao);
            nfseCheck && verifyFurtherPermissions(nfseCheck, 'nfse');
            const cteCheck: string[] = permissions
                ?.filter(item => item.categoria === 'CTE')
                .map(permit => permit.acao);
            cteCheck && verifyFurtherPermissions(cteCheck, 'cte');
            setIsCompanyConfig(
                Boolean(
                    permissions?.find(item => item.categoria === 'EMPRESA'),
                ),
            );
        }
    }

    function verifyPermissions(param, type) {
        let currentPermissions;
        for (let i = 0; i < param.length; i++) {
            currentPermissions = tripleLabels.find(item => item === param[i]);
            // console.log(`currentPermissions`, currentPermissions)
            if (currentPermissions && type === 'cnpj') {
                const permissionsFormatted = cnpjPermissions;
                permissionsFormatted[currentPermissions] = true;
                setCnpjPermissions(permissionsFormatted);
            }
            if (currentPermissions && type === 'usuario') {
                const permissionsFormatted = userPermissions;
                permissionsFormatted[currentPermissions] = true;
                setUserPermissions(permissionsFormatted);
            }
            if (currentPermissions && type === 'perfis') {
                const permissionsFormatted = profilePermission;
                permissionsFormatted[currentPermissions] = true;
                setProfilePermission(permissionsFormatted);
            }
            if (currentPermissions && type === 'certificado') {
                const permissionsFormatted = certificatePermissions;
                permissionsFormatted[currentPermissions] = true;
                setCertificatePermissions(permissionsFormatted);
            }
        }
    }

    function verifyFurtherPermissions(param, type) {
        if (type === 'entrada') {
            let current;
            for (let i = 0; i < param.length; i++) {
                current = entranceLabels.find(item => item === param[i]);
                if (current) {
                    const permissionsFormatted = entrancePermissions;
                    permissionsFormatted[current] = true;
                    setEntrancePermissions(permissionsFormatted);
                }
            }
        }
        if (type === 'nfe') {
            let current;
            for (let i = 0; i < param.length; i++) {
                current = severalPermissions.find(item => item === param[i]);
                if (current) {
                    const permissionsFormatted = nfePermissions;
                    permissionsFormatted[current] = true;
                    setNfePermissions(permissionsFormatted);
                }
            }
        } else {
            let current;
            for (let i = 0; i < param.length; i++) {
                current = middlePermissions.find(item => item === param[i]);
                if (current && type === 'nfse') {
                    const permissionsFormatted = nfsePermissions;
                    permissionsFormatted[current] = true;
                    setNfsePermissions(permissionsFormatted);
                }
                if (current && type === 'cte') {
                    const permissionsFormatted = ctePermissions;
                    permissionsFormatted[current] = true;
                    setCtePermissions(permissionsFormatted);
                }
            }
        }
    }

    useEffect(() => {
        getUserPermissions();
    }, [permissions]);
    // console.log('entrancePermissions', entrancePermissions);

    return (
        <SecurityContext.Provider
            value={{
                nfePermissions,
                entrancePermissions,
                userPermissions,
                profilePermission,
                nfsePermissions,
                isCompanyConfig,
                ctePermissions,
                cnpjPermissions,
                certificatePermissions,
            }}
        >
            {children}
        </SecurityContext.Provider>
    );
};

export const useSecurityContext = () => {
    return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider };
