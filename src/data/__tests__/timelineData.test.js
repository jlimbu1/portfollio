import { educationData, experienceData, projectData } from '../timelineData';

describe('timelineData', () => {
  test('educationData contains valid entries', () => {
    expect(Array.isArray(educationData)).toBe(true);
    educationData.forEach(entry => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('title');
      expect(entry).toHaveProperty('institution');
      expect(entry).toHaveProperty('date');
      expect(entry).toHaveProperty('description');
      expect(typeof entry.id).toBe('string');
      expect(typeof entry.title).toBe('string');
      expect(typeof entry.description).toBe('string');
    });
  });

  test('experienceData contains valid entries', () => {
    expect(Array.isArray(experienceData)).toBe(true);
    experienceData.forEach(entry => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('title');
      expect(entry).toHaveProperty('organization');
      expect(entry).toHaveProperty('date');
      expect(entry).toHaveProperty('description');
    });
  });

  test('projectData contains valid entries', () => {
    expect(Array.isArray(projectData)).toBe(true);
    projectData.forEach(entry => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('title');
      expect(entry).toHaveProperty('date');
      expect(entry).toHaveProperty('description');
      // projects don't have institution/organization, but that's okay
    });
  });
});