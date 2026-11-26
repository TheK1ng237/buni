import { PatternSymbol } from '@buni-design/patterns';

export interface UploadablePatternSymbol
  extends PatternSymbol {
  image?: File;
}
