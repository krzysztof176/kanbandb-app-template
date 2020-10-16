// Additional Libraries
import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const findEntryByField = (entries, field, fieldValue) => _.find(entries, { [field]: fieldValue });
