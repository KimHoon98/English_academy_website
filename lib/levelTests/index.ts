import type { GradeTest } from './types';

export type GradeKey = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'b1' | 'b2' | 'b3';

export async function getTest(grade: GradeKey): Promise<GradeTest | null> {
  try {
    switch (grade) {
      case 'a1': return (await import('./a1')).A1Test;
      case 'a2': return (await import('./a2')).A2Test;
      case 'a3': return (await import('./a3')).A3Test;
      case 'a4': return (await import('./a4')).A4Test;
      case 'a5': return (await import('./a5')).A5Test;
      case 'a6': return (await import('./a6')).A6Test;
      case 'b1': return (await import('./b1')).B1Test;
      case 'b2': return (await import('./b2')).B2Test;
      case 'b3': return (await import('./b3')).B3Test;
      default: return null;
    }
  } catch {
    return null;
  }
}

export const gradeKeys: GradeKey[] = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'b1', 'b2', 'b3'];