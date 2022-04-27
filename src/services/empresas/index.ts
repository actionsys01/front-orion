import getAllCompaniesByPage from './empresa-api/getAllCompaniesByPage';
import create from './empresa-api/create';
import update from './empresa-api/update';
import deletar from './empresa-api/delete';
import getCompanyById from './empresa-api/getCompanyById';

import sendCertificate from './certificado-api/sendCertificate';
import getCertificate from './certificado-api/getCertificate';
import deleteCertificate from './certificado-api/deleteCertificate';

import dashboardRequest from './dashboard-api/dashboard-request';

import getCnpj from './cnpj-api/getCompanyCnpj';
import createCnpj from './cnpj-api/createCnpj';
import deleteCnpj from './cnpj-api/deleteCnpj';
import updateCnpj from './cnpj-api/updateCnpj';

import uploadLogo from './logo/upload';

import createToken from './tokens-api/createToken';
import disableToken from './tokens-api/disableToken';

export {
  // empresas requests
  getAllCompaniesByPage,
  create,
  update,
  deletar,
  getCompanyById,
  // dashboard request
  dashboardRequest,
  // certificados requests
  getCertificate,
  sendCertificate,
  deleteCertificate,
  // CNPJ requests
  getCnpj,
  createCnpj,
  deleteCnpj,
  updateCnpj,
  // LOGO
  uploadLogo,
  // tokens
  createToken,
  disableToken,
};
