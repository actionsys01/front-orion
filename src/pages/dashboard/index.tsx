import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { Speedometer, InfoContainer, SelectStyle } from './style';
import { useSession } from "next-auth/client";
import Head from "next/head";
import {useSecurityContext} from "@contexts/security";
import  {useCertificateContext} from "@contexts/certificate"
import GaugeChart from "react-gauge-chart";
import { BsChevronCompactUp } from "react-icons/bs";
import { useRouter } from "next/router";
import * as planos from "@services/planos"
import * as empresas from "@services/empresas";
import CertificateConfirm from './modal';
import { useToasts } from "@geist-ui/react";
import { setDate } from 'date-fns';
export default function Dashboard() {
    const {
      nfePermission,
      ctePermission, 
      nfsePermission, 
      userPermission, 
      profilePermission, 
      entrancePermission} 
      = useSecurityContext()
    const { isCertificated } = useCertificateContext()
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
    const [, setToast] = useToasts();

    const [ dateDash, setDateDash ] = useState("")
    
    // modal
    const [ modal, setModal] = useState(false)
    
  

    const chartStyle = {
      width: 225,
      height:20,
    }

      // request de plano
    const getAccountData = useCallback(async () => {
      try {
        const response = await planos.getAccountById(Number(session?.usuario.empresa.plano.id))
        const data = response.data
        setTotalValue(data.notas)
        setTotalUsers(data.usuarios)
        setAccountName(data.nome)
        setAccountDescription(data.descricao)
        return data
      } catch (error) {
        setToast({
          text: "Houve um problema, por favor tente novamente",
          type: "warning"
        })
      }
      },[])

      // request de dashboard data
    const getDashboardData = useCallback(async() => {
      let date = dateDash
      // console.log(`date na função`, date)
      try {
        const response = await empresas.dashboardRequest(Number(session?.usuario.empresa.id), date)
      const data = response.data
      setTotalAmount(data.notas)
      setTotalUsersAmount(data.usuarios)
      setNfeAmount(data?.NfeCount)
      setCteAmount(data.CteCount)
      setNfseAmount(data.NfseCount)
      return data
      } catch (error) {
        setToast({
          text: "Houve um problema, por favor tente novamente",
          type: "warning"
        })
      }
      },[dateDash])
    
    function getPercentage(partial: number, total: number) {
      return partial / total
    }

    useEffect(() => {
      getAccountData()
      getDashboardData()
        const firstSpeedometer = getPercentage(totalAmount, totalValue)
        const secondSpeedometer = getPercentage(totalUsersAmount, totalUsers)
        setFirstPercentage(firstSpeedometer)
        setSecondPercentage(secondSpeedometer)
    }, [totalValue, totalAmount, totalUsers, totalUsersAmount, dateDash])


    // useEffect(() => {
    //   console.log("date dash", typeof(dateDash), dateDash)
    // }, [dateDash])


    return  <>
        <Head>
            <title>Orion | Dashboard</title>
        </Head>
        <h2>Dashboard</h2>
        <SelectStyle>
          <input type="month" onChange={(e) => setDateDash(e.target.value)} />
          {/* <select name="" id="">Ano</select> */}
        </SelectStyle>
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