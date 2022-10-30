export interface JourneysMapPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
