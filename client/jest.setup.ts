import '@testing-library/jest-dom';
// setupTests.js или в начале вашего теста
import { useRouter as useRouterOriginal } from './src/navigation';
import type { ReturnTypeUseRouter } from './src/navigation'; // Импортируйте или определите тип возвращаемого значения useRouter

jest.mock('./src/navigation', () => ({
  ...jest.requireActual('./src/navigation'),
  useRouter: jest.fn(),
}));

// Теперь вы можете использовать useRouter в ваших тестах
export const mockedUseRouter = require('./src/navigation').useRouter 

// Настройте возвращаемые значения для mockedUseRouter
mockedUseRouter.mockReturnValue({
  // Убедитесь, что здесь только известные свойства
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  // Другие свойства, если они есть в типе
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