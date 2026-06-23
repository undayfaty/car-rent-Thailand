import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'th', 'jp', 'ru', 'vn', 'cn'],
  defaultLocale: 'th'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
