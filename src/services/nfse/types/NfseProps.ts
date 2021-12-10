export interface NfseProps {
    id: number,
    chave_nota: string,
    empresa_id: number,
    nota: string,
    emit_cnpj: string,
    emit_nome: string,
    dest_cnpj: string,
    dest_nome: string,
    serie: number,
    prefeitura_status: number,
    dt_hr_emi: string,
    dt_hr_receb: string
}

export interface NfseFormattedProps {
    versao: string,
    id: string,
    numero: string,
    codigoVerificacao: string,
    dtEmissao: string
    numeroNFSeSubstituida: string,
    serie: string,
    dtPrestacaoServico:string,
    exigibilidade: string,
    dadosTomador: {
      //  Cpf: ,
       cnpj: string,
       inscricaoMunicipal: string,
       inscricaoEstadual: string,
       nome: string,
       razaoSocial: string,
       nomeFantasia: string,
       endereco: {
          logradouro: string,
          numero: string,
          complemento: string,
          bairro:string,
          cep: string,
          municipio: string,
          uf: string,
          pais: string,
          codigoIBGE: string
       },
       contato: {
          telefone: string,
          email: string
       },
       regime: string
       codigoMobiliario: string
    },
    dadosPrestador: {
      //  Cpf: [],
       cnpj: string,
       inscricaoMunicipal: string,
       inscricaoEstadual: string,
       nome: string,
       razaoSocial: string,
       nomeFantasia: string,
       endereco: {
          logradouro:string
          numero: string
          complemento: string
          bairro: string
          cep: string
          municipio: string
          uf: string
          pais: string,
          codigoIBGE: string
       },
       contato: {
          telefone: string,
          email: string
       },
       regime: string,
       codigoMobiliario: string
    },
    dadosIntermediario: {
      //  Cpf: [],
       cnpj: string,
       inscricaoMunicipal: string,
       inscricaoEstadual: string,
       nome: string ,
       razaoSocial: string ,
       nomeFantasia: string ,
       endereco: {
          logradouro:string,
          numero: string,
          complemento:string ,
          bairro: string,
          cep: string,
          municipio: string,
          uf: string,
          pais: string,
          codigoIBGE: string
       },
       contato: {
          telefone: string,
          email:string
       },
       regime: string,
       codigoMobiliario: string
    },
    itens: string,
    discriminacaoServico: string,
    outrasInformacoes: string,
    impostosRetidos: {
       alqCsll: string,
       vlrCsll: string,
       alqCofins: string,
       vlrCofins: string,
       alqPisPasep: string,
       vlrPisPasep: string,
       alqIrrf: string,
       vlrIrrf: string,
       alqIssRetido: string,
       vlrIssRetido: string,
       alqInss: string,
       vlrInss: string
    },
    iss: {
       baseCalculo: string,
       aliquota: string,
       vlr: string,
       dtVenc: string
    },
    rps: {
       numero: string,
       serie: string,
       tipo: string,
       dtEmissao: string
    },
    construcaoCivil: {
       art: string,
       codigoObra: string
    },
    vlrTotal: string,
    vlrServicos: string,
    vlrLiquido: string,
    vlrDeducoes: string,
    vlrCredito: string,
    vlrDesconto: string,
    vlrRetencoesFederais: string,
    vlrOutrasRetencoes: string,
    descontoCondicionado: string,
    descontoIncondicionado: string,
    mesCompetencia:string,
    municipioIncidencia: string,
    recolhimento: string,
    tributacao: string,
    cnae: string,
    descricaoAtividade: string,
    descricaoTipoServico: string,
    localPrestacao: string,
    naturezaOperacao: string,
    optanteSimplesNacional:string,
    incentivadorCultural: string,
    regimeEspecialTributacao: string,
    dtPagamento: string,
    numeroGuia: string,
    itemListaServico: string,
    codigoTributacaoMunicipio: string,
    pedidoCompra: {
       numero: string,
       itens: string
    },
    particularidades: string,
    emissionDate: string,
    chave_nota: string
    status_prefeitura: string,
    expiringIssDate: string,
    serviceDate: string
 }
