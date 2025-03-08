
// This file now acts as a re-export to maintain backward compatibility
// This approach ensures we don't break existing code that imports from this path

import { useLanguageAssessment } from './languageAssessment/useLanguageAssessment';

export { useLanguageAssessment };
export default useLanguageAssessment;
