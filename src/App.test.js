import { render, screen } from '@testing-library/react';
import App from './App';


describe('App component', () => {

  const renderComponent = () => {
    return render(<App />);
  };

  test('should render header and main components', () => {

    renderComponent();
    expect(screen.getByTestId('App')).toBeInTheDocument();

  });

});