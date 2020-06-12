import { gql } from 'apollo-boost';

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
      id
      name
      logoURL
      website
      linkedin
      overview
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query Company($id: ID) {
    company(id: $id) {
      name
      logoURL
      website
      linkedin
      overview
      headquarters
      companySize
      regions {
        name
      }
      therapeutics {
        name
      }
      services {
        name
      }
      specialties {
        name
      }
    }
  }
`;

export const GET_SERVICES = gql`
  {
    services {
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
    specialties {
      name
    }
  }
`;
