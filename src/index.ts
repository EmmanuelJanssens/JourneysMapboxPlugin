import { registerPlugin } from '@capacitor/core';

import type { JourneyMapCapacitorPlugin } from './definitions';

const JourneyMapCapacitor = registerPlugin<JourneyMapCapacitorPlugin>(
  'JourneyMapCapacitor',
  {
    web: () => import('./web').then(m => new m.JourneysMapWeb()),
  },
);
export * from './definitions';
export { JourneyMapCapacitor };
