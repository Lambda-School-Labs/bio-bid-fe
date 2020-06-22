import { gql } from 'apollo-boost';

export const CLAIM_COMPANY = gql`
  mutation claimCompany($user: String!, $email: String!, $name: String!, $company: ID!) {
    claimCompany(user: $user, email: $email, name: $name, company: $company) {
      id
      user
      email
      name
      company {
        id
        name
      }
      pending
      approved
    }
  }
`;

export const APPROVE_CLAIM = gql`
  mutation approveClaim($id: ID!) {
    approveClaim(id: $id) {
      id
      user
      email
      name
      company {
        id
        name
      }
      pending
      approved
    }
  }
`;

export const DENY_CLAIM = gql`
  mutation denyClaim($id: ID!) {
    denyClaim(id: $id) {
      id
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

export const ADD_COMPANY = gql`
  mutation addCompany(
    $name: String!
    $email: String
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $phases: [Phase]
  ) {
    createCompany(
      name: $name
      email: $email
      logoURL: $logoURL
      website: $website
      linkedin: $linkedin
      overview: $overview
      headquarters: $headquarters
      companySize: $companySize
      regions: $regions
      therapeutics: $therapeutics
      services: $services
      phases: $phases
    ) {
      id
    }
  }
`;

export const EDIT_COMPANY = gql`
  mutation editCompany(
    $id: ID!
    $name: String
    $email: String
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $phases: [Phase]
  ) {
    updateCompany(
      id: $id
      updated_name: $name
      updated_email: $email
      updated_logoURL: $logoURL
      updated_website: $website
      updated_linkedin: $linkedin
      updated_overview: $overview
      updated_headquarters: $headquarters
      updated_companySize: $companySize
      updated_services: $services
      updated_regions: $regions
      updated_therapeutics: $therapeutics
      updated_phases: $phases
    ) {
      id
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService($name: String!) {
    createServiceItem(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation deleteService($name: String!) {
    deleteServiceItem(name: $name) {
      id
      name
    }
  }
`;

export const ADD_THERAPEUTICS = gql`
  mutation addTherapeutics($name: String!) {
    createTherapeutic(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_THERAPEUTICS = gql`
  mutation deleteTherapeutic($name: String!) {
    deleteTherapeutic(name: $name) {
      id
      name
    }
  }
`;

export const ADD_REGION = gql`
  mutation addRegion($name: String!) {
    createRegion(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_REGION = gql`
  mutation deleteRegion($name: String!) {
    deleteRegion(name: $name) {
      id
      name
    }
  }
`;
