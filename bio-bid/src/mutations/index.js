import { gql } from 'apollo-boost';

export const CLAIM_COMPANY = gql`
  mutation claimCompany(
    $user: String!
    $email: String!
    $name: String!
    $company: ID!
  ) {
    claimCompany(
      user: $user
      email: $email
      name: $name
      company: $company
    ) {
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
mutation approveClaim( $id: ID! ) {
  approveClaim( id: $id ) {
    id
    user
    email
    name
    company{
      id
      name
    }
    pending
    approved
  }
}
`;

export const DENY_CLAIM = gql`
  mutation denyClaim( $id: ID! ) {
    denyClaim( id: $id ) {
      id
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id){
      id
    }
  }
`;

export const ADD_COMPANY = gql`
  mutation addCompany(
    $name: String!
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $specialties: [SpecialtyInput]
  ) {
    createCompany(
      name: $name
      logoURL: $logoURL
      website: $website
      linkedin: $linkedin
      overview: $overview
      headquarters: $headquarters
      companySize: $companySize
      regions: $regions
      therapeutics: $therapeutics
      services: $services
      specialties: $specialties
    ) {
      id
    }
  }
`;

export const EDIT_COMPANY = gql`
  mutation editCompany(
    $id: ID!
    $name: String
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $specialties: [SpecialtyInput]
  ) {
    updateCompany(
      id: $id
      updated_name: $name
      updated_logoURL: $logoURL
      updated_website: $website
      updated_linkedin: $linkedin
      updated_overview: $overview
      updated_headquarters: $headquarters
      updated_companySize: $companySize
      updated_services: $services
      updated_specialties: $specialties
      updated_regions: $regions
      updated_therapeutics: $therapeutics
    ) {
      id
    }
  }
`;
