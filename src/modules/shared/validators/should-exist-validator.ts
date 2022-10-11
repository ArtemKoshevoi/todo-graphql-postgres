import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { getErrorTranslationData } from '../utils/get-error-translation-data';

type constraintsType = {
  constraints?: {
    service: new (...args: any[]) => any;
    reverse?: boolean;
    prop?: string;
    withDeleted?: boolean;
  }[];
};

@Injectable()
@ValidatorConstraint({ async: true })
export class ShouldExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly moduleRef: ModuleRef) {}

  async validate(value: any, { constraints }: constraintsType) {
    const [{ service, reverse = false, prop = 'id', withDeleted = false }] =
      constraints;
    const injectedService = this.moduleRef.get(service, { strict: false });
    const instance = await injectedService.findOne(
      { [prop]: value },
      { withDeleted },
    );
    return reverse ? !instance : !!instance;
  }

  defaultMessage({ constraints }: constraintsType) {
    const [{ reverse = false }] = constraints;
    return reverse
      ? getErrorTranslationData('ALREADY_EXISTS')
      : getErrorTranslationData('DOES_NOT_EXIST');
  }
}
