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

interface SelectProps {
    className: string
}

export default function Dashboard({className}: SelectProps) {
    
    
 
const input = [<Calendar size="32px" className="field"/>, "Ano" ]

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
<Speedometer>
  <div id="main-div">
  {/* Scorer 1 Starts */}
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
    </SelectStyle>
    </>
}

Dashboard.auth = true 