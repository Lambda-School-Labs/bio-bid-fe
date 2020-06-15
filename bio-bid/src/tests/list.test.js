import React from 'react';
import List from '../components/company-profile/List/List';
import { render, screen, act, wait } from '@testing-library/react';

import { MockedProvider } from '@apollo/react-testing';
import { GET_COMPANIES } from '../queries';

const listMock = [
    {
        request: {
            query: GET_COMPANIES
            // variables: {
            //     id,
            //     name,
            //     logoURL,
            //     website,
            //     linkedin,
            //     overview,
            // }
        },
        result: {
            data: {
                companies: {
                    0: {
                            id:"ckaye0vmijew80999u8m3kev6",
                            linkedin:"https://linkedin.com/in/drug-company",
                            logoURL:"",
                            name:"Drug Company",
                            overview:"This is a company that sells drugs. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            website:"https://drugcompany.com",
                            __typename:"Company"
                    }
                } 
            }
        }
    }
]


test('Company list title displays on list page', async () => {
    render(
        <MockedProvider
            mocks={listMock}
            addTypename={false}
            defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
            <List />
        </MockedProvider>
    );

    await act(() => wait(async () => {
        const listText = /List of Service Providers/i;
        const foundText = await screen.findByText(listText);
        expect(foundText).toBeInTheDocument();
    }))
});

test('Search is displayed on the company list page', async () => {
    render(
        <MockedProvider
            mocks={listMock}
            addTypename={false}
            defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
            <List />
        </MockedProvider>
    );
    await act(() => wait(async () => {
        const searchText = /Search/i;
        const newText = await screen.findByText(searchText);
        expect(newText).toBeInTheDocument();
    }))
});

test('Add Company displays correctly on the company list page', async () => {
    render(
        <MockedProvider
            mocks={listMock}
            addTypename={false}
            defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
            <List />
        </MockedProvider>
    );
    await act(() => wait(async () => {
        const companyText = /Add Company/i;
        const newText = await screen.findByText(companyText);
        expect(newText).toBeInTheDocument();
    }))
});

test('Cards are displaying correctly on the screen', async () => {
    render(
        <MockedProvider
            mocks={listMock}
            addTypename={false}
            defaultOptions={{
                watchQuery: { fetchPolicy: 'no-cache' },
                query: { fetchPolicy: 'no-cache' },
            }}>
            <List />
        </MockedProvider>
    );
    await act(() => wait(async () => {
        const drugText = /Drug Company/i;
        const newText = await screen.findByText(drugText);
        expect(newText).toBeInTheDocument();
    }))
});
