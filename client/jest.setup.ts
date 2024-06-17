import '@testing-library/jest-dom';

jest.mock('./src/navigation', () => ({
  ...jest.requireActual('./src/navigation'),
  useRouter: jest.fn(),
}));


export const mockedUseRouter = require('./src/navigation').useRouter 


mockedUseRouter.mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
});

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });