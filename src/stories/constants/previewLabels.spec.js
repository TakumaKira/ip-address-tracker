import formatLocation from '../../services/formatLocation';
import PREVIEW_LABELS from './previewLabels';

it(`should return the correctly formatted location`, () => {
  expect(PREVIEW_LABELS.location).toBe(formatLocation(PREVIEW_LABELS.city, '', PREVIEW_LABELS.postalCode, PREVIEW_LABELS.region));
});
