export type Primitive = string | number | boolean | null | undefined;

export type WidenLiterals<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer Item>
        ? Array<WidenLiterals<Item>>
        : T extends object
          ? { [Key in keyof T]: WidenLiterals<T[Key]> }
          : T;

export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Primitive
    ? T[Key]
    : T[Key] extends Array<infer Item>
      ? Array<DeepPartial<Item>>
      : DeepPartial<T[Key]>;
};
