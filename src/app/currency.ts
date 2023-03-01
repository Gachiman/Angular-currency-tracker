export interface ICurrency{
  name: string;
  value?: number;
  diff?: number;
  diffIcon?: string;
}

export class Currency implements ICurrency{
  name = '';
  value = 0;
  diff = 0;
  diffIcon = '';

  constructor(name: string) {
    this.name = name;
  }
}