import React, { useState } from 'react';
import { useToasts } from "@geist-ui/react";
import { ModalInputContainer } from "@styles/modal-inputs";
import { BottomConfirmBtn } from '@styles/buttons';
import { ButtonStyle } from '../style';
import * as companyRequest from "@services/empresas";
import { useCompanyContext } from '@contexts/company';

const initialState = {
    razao_social: '',
    nome_fantasia: ''
}

interface ModalProps {
    getLogo: () => Promise<void>
}

const Modal = ({data, getLogo} ) => {
    const [ visibleModal, setVisibleModal ] = useState(false)
    const [ dataUpdate, setDataUpdate ] = useState({...initialState})
    const [, setToast] = useToasts();
    const { getCompanyFeatures } = useCompanyContext()

    async function updateCompany() {
        try {
        await companyRequest.update({
            cnpj: data.cnpj,
            email: data.email,
            plano_id: Number(data.plano.id),
            empresa_id: Number(data.id),
            status: Number(data.status),
            nome_fantasia: dataUpdate.nome_fantasia.length ? dataUpdate.nome_fantasia : data.nome_fantasia,
            razao_social: dataUpdate.razao_social.length ? dataUpdate.razao_social : data.razao_social
        })
        getCompanyFeatures()
        setToast({
            text: 'Atualização realizada com sucesso',
            type: 'success'
          })
        } catch (error) {
            setToast({
                text: 'Houve um problema. Por favor tente novamente',
                type: 'warning'
              })
        }
        setVisibleModal(false)
        getLogo()
    }


    return <>
        <BottomConfirmBtn>
            <ButtonStyle onClick={() => setVisibleModal(true)}>
                Editar
            </ButtonStyle>
        </BottomConfirmBtn>
        <ModalInputContainer visible={visibleModal}>
            <div>
                <h4>Editar</h4>
                <h6>Perfil da Empresa</h6>
                <div className="input-container">
                    <div>
                    <label htmlFor="social">Razão Social</label>
                        <input type="text" id='social' defaultValue={data?.razao_social}
                            onChange={(e) => setDataUpdate({...dataUpdate, razao_social: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="nome">Nome Fantasia</label>
                        <input type="text" id='nome' defaultValue={data?.nome_fantasia}
                            onChange={(e) => setDataUpdate({...dataUpdate, nome_fantasia: e.target.value})}/>
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
                    <button onClick={updateCompany}>CONFIRMAR</button>
                </div>
            </div>
        </ModalInputContainer>
        </>
}

export default Modal