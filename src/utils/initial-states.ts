export const initialState = {
    'VISUALIZAR': false,
    'HISTORICO': false,
    'CIENCIA': false,
    'CONFIRMACAO': false,
    'DESCONHECIMENTO': false,
    'OPERACAO_NAO_REALIZADA': false
    }

export const initial = {
        "ADICIONAR": false,
        "EXCLUIR": false,
        "EDITAR": false
    }
    
export const initialStateEntrada = {
        "ADICIONAR": false,
        "CANCELAR": false,
        "AUTORIZAR": false,
        "VISUALIZAR": false,
        "EDITAR": false
    }
    
export const initialStateB = {
    'VISUALIZAR': false,
    'HISTORICO': false,
    'IMPRIMIR': false
    }

export const companyProfile = {
    logo: "",
    nome: ""
}

export const certificateState = {
    initialDate: new Date,
    expiringDate: new Date,
}

export const entranceInitials = {
    driverId: "",
    driver: "",
    statusDescription: "",
    vehicleLicense: "",
    loadedWeight: 0,
    emptyWeight: 0,
    measure: "kG",
    firstHaulage: "",
    secondHaulage: "",
    thirdHaulage: "",
    status: 0
}

export interface EntranceProps {
    driverId: string,
    driver: string,
    statusDescription: string,
    vehicleLicense: string,
    loadedWeight: number,
    emptyWeight: number,
    measure: string,
    firstHaulage: string,
    secondHaulage: string,
    thirdHaulage: string,
    status: number
}