export interface XMLItem {
  name: string;
  attributes: object;
  children: XMLItem[];
  value: string;
}

export interface CTAResponse<T> {
  ctatt: T;
}
