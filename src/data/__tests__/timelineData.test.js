import { educationData, experienceData, projectData } from '../timelineData';

describe('timelineData', () => {
  describe('educationData', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(educationData)).toBe(true);
      expect(educationData.length).toBeGreaterThan(0);
    });

    it('each entry should have required keys with non-empty values', () => {
      educationData.forEach((entry) => {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('institution');
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('type', 'education');

        expect(typeof entry.id).toBe('string');
        expect(entry.id.length).toBeGreaterThan(0);
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);
        expect(typeof entry.institution).toBe('string');
        expect(entry.institution.length).toBeGreaterThan(0);
        expect(typeof entry.date).toBe('string');
        expect(entry.date.length).toBeGreaterThan(0);
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
      });
    });

    it('should contain the expected education entries', () => {
      const titles = educationData.map((e) => e.title);
      expect(titles).toContain('Higher Diploma in Software Engineering');
      expect(titles).toContain('BSc (Hons) in Computing');

      const institutions = educationData.map((e) => e.institution);
      expect(institutions).toContain(
        'IVE - Hong Kong Institute of Vocational Education'
      );
      expect(institutions).toContain('Ulster University');
    });

    it('should have unique ids', () => {
      const ids = educationData.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('experienceData', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(experienceData)).toBe(true);
      expect(experienceData.length).toBeGreaterThan(0);
    });

    it('each entry should have required keys with non-empty values', () => {
      experienceData.forEach((entry) => {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('organization');
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('type', 'experience');

        expect(typeof entry.id).toBe('string');
        expect(entry.id.length).toBeGreaterThan(0);
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);
        expect(typeof entry.organization).toBe('string');
        expect(entry.organization.length).toBeGreaterThan(0);
        expect(typeof entry.date).toBe('string');
        expect(entry.date.length).toBeGreaterThan(0);
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
      });
    });

    it('should contain the expected experience entries', () => {
      const titles = experienceData.map((e) => e.title);
      expect(titles).toContain('Software Engineer');
      expect(titles).toContain('Full Stack Developer');
      expect(titles).toContain('Junior Software Developer');

      const organizations = experienceData.map((e) => e.organization);
      expect(organizations).toContain('DIY ROCKS');
      expect(organizations).toContain('Fletrix');
      expect(organizations).toContain('Wealthskey');
    });

    it('should have unique ids', () => {
      const ids = experienceData.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('projectData', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(projectData)).toBe(true);
      expect(projectData.length).toBeGreaterThan(0);
    });

    it('each entry should have required keys with non-empty values', () => {
      projectData.forEach((entry) => {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('type', 'project');

        expect(typeof entry.id).toBe('string');
        expect(entry.id.length).toBeGreaterThan(0);
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);
        expect(typeof entry.date).toBe('string');
        expect(entry.date.length).toBeGreaterThan(0);
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
      });
    });

    it('should contain the expected project entries', () => {
      const titles = projectData.map((p) => p.title);
      expect(titles).toContain('ARM MOOC Platform');
      expect(titles).toContain('Arduino Gameboy');
      expect(titles).toContain('Danger Dungeon');
    });

    it('should have unique ids', () => {
      const ids = projectData.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});