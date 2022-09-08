import { SetMetadata } from '@nestjs/common';

export function Roles(...args: Array<string>) {
  const globalRoles = args.filter((arg) => typeof arg === 'string');

  return (
    target: { [key: string]: any },
    key: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    SetMetadata('roles', globalRoles)(target, key, descriptor);

    if (descriptor) {
      return descriptor;
    }
    return target;
  };
}
