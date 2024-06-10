import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix, pathnames} from './navigation';


export default createMiddleware({
  defaultLocale: 'ru',
  localePrefix,
  locales
});
 
export const config = {
  matcher: ['/', '/(ru|en)/:path*']
};