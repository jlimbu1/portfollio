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

    it('each entry should have a parseable date string', () => {
      educationData.forEach((entry) => {
        expect(entry.date).toBeTruthy();
        expect(typeof entry.date).toBe('string');
        const trimmed = entry.date.trim();
        expect(trimmed.length).toBeGreaterThan(0);
        const datePattern = /^(19|20)\d{2}(-\d{2}(-\d{2})?)?$/;
        const rangePattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*(19|20)\d{2}$/i;
        const presentPattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*Present$/i;
        const isValid = datePattern.test(trimmed) || rangePattern.test(trimmed) || presentPattern.test(trimmed);
        expect(isValid).toBe(true);
      });
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

    it('each entry should have a parseable date string', () => {
      experienceData.forEach((entry) => {
        expect(entry.date).toBeTruthy();
        expect(typeof entry.date).toBe('string');
        const trimmed = entry.date.trim();
        expect(trimmed.length).toBeGreaterThan(0);
        const datePattern = /^(19|20)\d{2}(-\d{2}(-\d{2})?)?$/;
        const rangePattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*(19|20)\d{2}$/i;
        const presentPattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*Present$/i;
        const isValid = datePattern.test(trimmed) || rangePattern.test(trimmed) || presentPattern.test(trimmed);
        expect(isValid).toBe(true);
      });
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
      const titles = projectData.map((e) => e.title);
      expect(titles).toContain('ARM MOOC Platform');
      expect(titles).toContain('Danger Dungeon');
      expect(titles).toContain('Arduino Gameboy');
    });

    it('should have unique ids', () => {
      const ids = projectData.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('each entry should have a parseable date string', () => {
      projectData.forEach((entry) => {
        expect(entry.date).toBeTruthy();
        expect(typeof entry.date).toBe('string');
        const trimmed = entry.date.trim();
        expect(trimmed.length).toBeGreaterThan(0);
        const datePattern = /^(19|20)\d{2}(-\d{2}(-\d{2})?)?$/;
        const rangePattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*(19|20)\d{2}$/i;
        const presentPattern = /^(19|20)\d{2}\s*(-|to|–|—)\s*Present$/i;
        const isValid = datePattern.test(trimmed) || rangePattern.test(trimmed) || presentPattern.test(trimmed);
        expect(isValid).toBe(true);
      });
    });
  });

  describe('cross-data integrity', () => {
    it('should have no duplicate ids across all data sets', () => {
      const allIds = [
        ...educationData.map((e) => e.id),
        ...experienceData.map((e) => e.id),
        ...projectData.map((e) => e.id),
      ];
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it('should have correct type values for each data set', () => {
      educationData.forEach((entry) => {
        expect(entry.type).toBe('education');
      });
      experienceData.forEach((entry) => {
        expect(entry.type).toBe('experience');
      });
      projectData.forEach((entry) => {
        expect(entry.type).toBe('project');
      });
    });

    it('should have no entries with empty or whitespace-only required string fields', () => {
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      allEntries.forEach((entry) => {
        expect(entry.id).toBeTruthy();
        expect(entry.id.trim().length).toBeGreaterThan(0);
        expect(entry.title).toBeTruthy();
        expect(entry.title.trim().length).toBeGreaterThan(0);
        expect(entry.date).toBeTruthy();
        expect(entry.date.trim().length).toBeGreaterThan(0);
        expect(entry.description).toBeTruthy();
        expect(entry.description.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays gracefully when imported', () => {
      expect(Array.isArray(educationData)).toBe(true);
      expect(Array.isArray(experienceData)).toBe(true);
      expect(Array.isArray(projectData)).toBe(true);
    });

    it('should not contain entries with null or undefined values for required fields', () => {
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      allEntries.forEach((entry) => {
        expect(entry.id).not.toBeNull();
        expect(entry.id).not.toBeUndefined();
        expect(entry.title).not.toBeNull();
        expect(entry.title).not.toBeUndefined();
        expect(entry.date).not.toBeNull();
        expect(entry.date).not.toBeUndefined();
        expect(entry.description).not.toBeNull();
        expect(entry.description).not.toBeUndefined();
        expect(entry.type).not.toBeNull();
        expect(entry.type).not.toBeUndefined();
      });
    });

    it('should have valid type values across all entries', () => {
      const validTypes = ['education', 'experience', 'project'];
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      allEntries.forEach((entry) => {
        expect(validTypes).toContain(entry.type);
      });
    });

    it('should have no entries with malformed date strings', () => {
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      const malformedPatterns = [
        /^\s*$/,
        /^null$/i,
        /^undefined$/i,
        /^NaN$/i,
        /^Invalid Date$/i,
      ];
      allEntries.forEach((entry) => {
        const dateStr = entry.date;
        expect(typeof dateStr).toBe('string');
        const isMalformed = malformedPatterns.some((pattern) => pattern.test(dateStr));
        expect(isMalformed).toBe(false);
      });
    });

    it('should have ids that are non-empty strings without leading or trailing whitespace', () => {
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      allEntries.forEach((entry) => {
        expect(typeof entry.id).toBe('string');
        expect(entry.id.length).toBeGreaterThan(0);
        expect(entry.id).toBe(entry.id.trim());
      });
    });
  });
});
