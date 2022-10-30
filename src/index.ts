import { registerPlugin } from '@capacitor/core';

import type { JourneysMapPlugin } from './definitions';

const JourneysMap = registerPlugin<JourneysMapPlugin>('JourneysMap', {
  web: () => import('./web').then(m => new m.JourneysMapWeb()),
});

export * from './definitions';
export { JourneysMap };
