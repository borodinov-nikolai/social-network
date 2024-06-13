import {
    createLocalizedPathnamesNavigation,
    Pathnames
  } from 'next-intl/navigation';
   
  export const locales = ['ru', 'en'] as const;
  export const localePrefix = 'always';
   
  
  export const pathnames = {
    '#':'#',
    '/': '/',
    '/blog': '/blog',
    '/contacts': '/contacts',
    '/account' : '/account',
    '/feed': '/feed',
    
    '/home': {
      ru: '/dom',
      en: '/home'
    },

  } satisfies Pathnames<typeof locales>;
   
  export const {Link, redirect, usePathname, useRouter, getPathname} =
    createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});