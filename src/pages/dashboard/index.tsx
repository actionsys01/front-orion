import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { Speedometer, InfoContainer } from './style';
import { useSession } from "next-auth/client";
import Head from "next/head";
import {useSecurityContext} from "@contexts/security";
import  {useCertificateContext} from "@contexts/certificate"
import GaugeChart from "react-gauge-chart";
import { BsChevronCompactUp } from "react-icons/bs";
import { useRouter } from "next/router";
import * as planos from "@services/planos"
import * as empresas from "@services/empresas"
import CertificateConfirm from './modal';




export default function Dashboard() {
    const {
      nfePermission,
      ctePermission, 
      nfsePermission, 
      userPermission, 
      profilePermission, 
      entrancePermission} 
      = useSecurityContext()
    const { isCertificated} = useCertificateContext()
    const [nfeAmount, setNfeAmount] = useState(0)
    const [cteAmount, setCteAmount] = useState(0)
    const [nfseAmount, setNfseAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalUsersAmount, setTotalUsersAmount] = useState(0)
    const [firstPercentage, setFirstPercentage] = useState(0)
    const [secondtPercentage, setSecondPercentage] = useState(0)
    const [totalUsers, setTotalUsers] = useState(10)
    const [accountName, setAccountName] = useState("")
    const [accountDescription, setAccountDescription] = useState("")
    const [totalValue, setTotalValue] = useState(10)
    const [session] = useSession()
    const router = useRouter()
    
    // modal
    const [ modal, setModal] = useState(false)
    
  

    const chartStyle = {
      height: 50,
    }

      // request de plano
    const getAccountData = useCallback(async () => {
      const response = await planos.getAccountById(Number(session?.usuario.empresa.plano.id))
      const data = response.data
      return data
      },[])

      // request de dashboard data
    const getDashboardData = useCallback(async() => {
      const response = await empresas.dashboardRequest(Number(session?.usuario.empresa.id))
      const data = response.data
      return data
      },[])

    // const modalHandler = useCallback(() => {
    //   router.query.certificate === "open" ? setModal(true) : 
    //   setModal(false)
    //   },[])
    
    
    function getPercentage(partial: number, total: number) {
      return partial / total
    }

    useEffect(() => {
      getAccountData().then(response => {setTotalValue(response.notas), 
        setTotalUsers(response.usuarios),
        setAccountName(response.nome),
        setAccountDescription(response.descricao)})
      getDashboardData().then(response =>  {setTotalAmount(response.notas), 
        setTotalUsersAmount(response.usuarios),
        setCteAmount(response.CteCount), 
        setNfseAmount(response.NfseCount), 
        setNfeAmount(response.NfeCount)})
        const firstSpeedometer = getPercentage(totalAmount, totalValue)
        const secondSpeedometer = getPercentage(totalUsersAmount, totalUsers)
        setFirstPercentage(firstSpeedometer)
        setSecondPercentage(secondSpeedometer)
    }, [totalValue, totalAmount, totalUsers, totalUsersAmount])
 
    // useEffect(() => {
    //   modalHandler()
    // }, [])
 

    return  <>
        <Head>
            <title>Orion | Dashboard</title>
        </Head>
        <h2>Dashboard</h2>
        <InfoContainer>
          <div>
            <div>
              <h3>NF-e</h3>
              <h4>{nfeAmount}</h4>
              <BsChevronCompactUp />
            </div>
            <div>
              <h3>CT-e</h3>
              <h4>{cteAmount}</h4>
              <BsChevronCompactUp />
            </div>
            <div>
              <h3>NFS-e</h3>
              <h4>{nfseAmount}</h4>
              <BsChevronCompactUp />
              </div>
          </div>
          <div>
            <div>
              <h2>{accountName}</h2>
              <p>{accountDescription}</p>
            </div>
          </div>
        </InfoContainer>
       
  {/* <div style={{height: "35vh"}}>
  {nfePermission && <h3>Nf-e</h3>}
  {ctePermission && <h3>Ct-e</h3>}
  {nfsePermission &&  <h3>Nfs-e</h3>}
  {entrancePermission && <h3>Portaria</h3>}
  {profilePermission && <h3>Perfis</h3>}
  {userPermission && <h3>Usuários</h3>}
  </div> */}
        <Speedometer>
          <div>
            <h3>Notas</h3>
            <GaugeChart arcWidth={0.1} 
              nrOfLevels={38} percent={firstPercentage} style={chartStyle} animateDuration={500}
              id="gauge-chart1" hideText/>
              <span>
                <h5>{totalAmount} / {totalValue}</h5>
              </span>
          </div>
          <div>
            <h3>Usuários</h3>
            <GaugeChart arcWidth={0.1} style={chartStyle}
              nrOfLevels={38} percent={secondtPercentage} animateDuration={1500}
              id="gauge-chart2" hideText/> 
              <span>
                <h5>{totalUsersAmount} / {totalUsers}</h5>
              </span> 
          </div>
        </Speedometer>
        {router.query.certificate === "open"  && <CertificateConfirm />}
    </>
}


Dashboard.auth = true 