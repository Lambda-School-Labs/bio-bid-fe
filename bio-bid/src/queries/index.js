import { gql } from "apollo-boost";

export const STATISTICS = gql`
  {
    statistics {
      companyCount
      pendingClaimCount
      serviceCount
      specialtyCount
    }
  }
`;

export const GET_CLAIMS = gql`
  {
    pendingClaims {
      id
      user
      email
      name
      company {
        id
        name
        maintainer
      }
      pending
      approved
    }
  }
`;

export const GET_STUDIES = gql`
  {
    studies {
      id
      name
      area
      protocol_number
      title
      phase
      services
      modified_date
      status
    }
  }
`;

export const GET_COMPANIES = gql`
  {
    companies {
      maintainer
      id
      name
      email
      phases
      logoURL
      website
      linkedin
      overview
      headquarters
      companySize
      services {
        name
        specialties {
          name
          sub_specialties {
            name
          }
        }
      }
      regions {
        id
        name
      }
      therapeutics {
        id
        name
      }
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query Company($id: ID) {
    company(id: $id) {
      maintainer
      name
      logoURL
      website
      linkedin
      overview
      headquarters
      companySize
      email
      phases
      regions {
        name
      }
      therapeutics {
        name
      }
      services {
        name
        specialties {
          name
          sub_specialties {
            name
          }
        }
      }
    }
  }
`;

export const GET_SERVICES = gql`
  {
    serviceItems {
      name
    }
  }
`;

export const GET_REGIONS = gql`
  {
    regions {
      name
    }
  }
`;

export const GET_THERAPEUTICS = gql`
  {
    therapeutics {
      name
    }
  }
`;

export const GET_SPECIALTIES = gql`
  {
    specialtyItems {
      name
    }
  }
`;
