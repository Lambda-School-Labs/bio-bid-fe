import React from 'react';
import { render, fireEvent, waitForElement, getByText } from '@testing-library/react';
import List from '../components/company-profile/List/List';
import { fakeData } from '../components/company-index/fake-data'

test('Checking to see if the correct labels render to the page', () => {
    const { getByText, getByLabel } = render(<List />)
    expect(getByText(/List of Service Providers/i)).toBeInTheDocument()
    expect(getByText(/Search/i)).toBeInTheDocument()

})

test('Checking to see if our data is loaded correctly', () => {
    expect(fakeData).toBeTruthy()
})