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
    'feed/add-post': 'feed/add-post',
    '/settings': '/settings',
    '/messages': '/messages',
    '/contacts/chat/[id]': '/contacts/chat/[id]',
    
    '/home': {
      ru: '/dom',
      en: '/home'
    },

  } satisfies Pathnames<typeof locales>;
   
  export const {Link, redirect, usePathname, useRouter, getPathname} =
    createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});

    export type ReturnTypeUseRouter = {
      push: (href: string, options?: any) => void;
      replace: (href: string, options?: any) => void;
      refresh: () => void;
    };