type Children =
  | number
  | string
  | Promise<string>
  | boolean
  | null
  | undefined
  | Children[];

export type PropsWithChildren<T = {}> = { children?: Children } & T;
