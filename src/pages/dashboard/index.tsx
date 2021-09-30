import React, { useState, useMemo, useEffect} from 'react'; 
import { SelectStyle, Speedometer } from './style';
import {format, Locale} from "date-fns"
import {
    Button,
    Loading,
    Popover,
    Row,
    Spacer,
    Table,
    Select,
    Text,
  } from "@geist-ui/react";
  import { Calendar } from '@geist-ui/react-icons'
import { useSession } from "next-auth/client";
import Head from "next/head";
import api from '@services/api';

interface SelectProps {
    className: string
}

interface IUsuario  {
  id: number;
  nome: string;
  email: string;
};


export default function Dashboard() {
  
    const time = new Date().toLocaleString()
 
 console.log(time);
 

    return  <>
    <Head>
        <title>Orion | Dashboard</title>
    </Head>
    <Text h2>Dashboard</Text>

    <SelectStyle>
  <select title="Ano" name="Ano" id="ano">
    <option value="" disabled selected>Ano</option>
    <option value="2010" >2010</option>
  </select>
  <select title="Mês" name="Mês" id="mes">
    <option value="" disabled selected>Mês</option>
    <option value="Janeiro" >2010</option>
  </select>
  </SelectStyle>
  <div style={{height: "35vh"}}>

  </div>
<Speedometer>
  <div id="main-div">
  {/* velocímetro 1  */}
  <div className="layout-align">
    <div id="score-meter-1" className="layout-align">
    <div id="scorer-1-inner-div">
      <div id="scorer-1-inner-div-5">
        <div className="scorer-1-tick">
        </div>
      </div>
    </div>
    <div id="scorer-1-inner-div-2"></div>
    <div id="scorer-1-inner-div-3"></div>
    <div id="scorer-1-inner-div-4"></div>
  </div>
  </div>
  </div>
  <div id="main-div">
  {/* velocímetro 2 */}
  <div className="layout-align">
    <div id="score-meter-1" className="layout-align">
    <div id="scorer-1-inner-div">
      <div id="scorer-1-inner-div-5">
        <div className="scorer-1-tick">
        </div>
      </div>
    </div>
    <div id="scorer-1-inner-div-2"></div>
    <div id="scorer-1-inner-div-3"></div>
    <div id="scorer-1-inner-div-4"></div>
  </div>
  </div>
  </div>
  </Speedometer>
    
    </>
}


Dashboard.auth = true 