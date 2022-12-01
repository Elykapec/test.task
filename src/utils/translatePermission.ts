import {AccessLevel, EntitiesManagement, EntitiesRegular} from '@/model/Persmissions';

export default function translatePermission(s: AccessLevel|EntitiesRegular|EntitiesManagement|string) {
  if (s === EntitiesManagement.Admin) return 'Admin (Full Access)';
  return (s as string).replace(/([a-z])([A-Z])/g, '$1 $2');
}
