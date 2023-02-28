export class Currency {
  name: string;
  value: number = 0;
  diff: number = 0;
  diffIcon: string = ' ';

  constructor(name: string) {
    this.name = name;
  }
}