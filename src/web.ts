import { WebPlugin } from '@capacitor/core';

import type { JourneysMapPlugin } from './definitions';

export class JourneysMapWeb extends WebPlugin implements JourneysMapPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
