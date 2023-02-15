import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from './ForgotPassword';

describe('<ForgotPassword />', () => {
  test('it should mount', () => {
    render(<ForgotPassword />);
    
    const forgotPassword = screen.getByTestId('ForgotPassword');

    expect(forgotPassword).toBeInTheDocument();
  });
});