import {
   BusinessIcon,
   FavouritesIcon,
   GeneralIcon,
   HealthIcon,
   HomeIcon,
   ScienceIcon,
   SportsIcon,
   TechnologyIcon,
} from '@shared/svgs';
import { SidebarItem } from './type';

export const SidebarItems: SidebarItem[] = [
   {
      name: 'Home',
      value: '',
      icon: <HomeIcon />,
   },
   {
      name: 'Favourites',
      value: 'favourites',
      icon: <FavouritesIcon />,
   },
   {
      name: 'General',
      value: 'general',
      icon: <GeneralIcon />,
   },
   {
      name: 'Business',
      value: 'business',
      icon: <BusinessIcon />,
   },
   {
      name: 'Health',
      value: 'health',
      icon: <HealthIcon />,
   },
   {
      name: 'Science',
      value: 'science',
      icon: <ScienceIcon />,
   },
   {
      name: 'Sports',
      value: 'sports',
      icon: <SportsIcon />,
   },
   {
      name: 'Technology',
      value: 'technology',
      icon: <TechnologyIcon />,
   },
];
