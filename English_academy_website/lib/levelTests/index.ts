import { A1Test } from './a1';
import { A2Test } from './a2';
import { A3Test } from './a3';
import { A4Test } from './a4';
import { A5Test } from './a5';
import { A6Test } from './a6';
import { B1Test } from './b1';
import { B2Test } from './b2';
import { B3Test } from './b3';

export const allTests = {
  a1: A1Test,
  a2: A2Test,
  a3: A3Test,
  a4: A4Test,
  a5: A5Test,
  a6: A6Test,
  b1: B1Test,
  b2: B2Test,
  b3: B3Test,
};

export type GradeKey = keyof typeof allTests;