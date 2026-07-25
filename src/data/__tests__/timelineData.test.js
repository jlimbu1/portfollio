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
  });

  describe('merged timeline array', () => {
    const extractStartYear = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string') {
        return null;
      }
      const match = dateStr.match(/(\d{4})/);
      return match ? parseInt(match[1], 10) : null;
    };

    const mergeAndSort = () => {
      const allEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      return allEntries.sort((a, b) => {
        const yearA = extractStartYear(a.date);
        const yearB = extractStartYear(b.date);
        if (yearA === null && yearB === null) return 0;
        if (yearA === null) return 1;
        if (yearB === null) return -1;
        return yearB - yearA;
      });
    };

    it('should contain all entries from education, experience, and project data', () => {
      const merged = mergeAndSort();
      const expectedLength =
        educationData.length + experienceData.length + projectData.length;
      expect(merged.length).toBe(expectedLength);
    });

    it('should be sorted by start year in descending order', () => {
      const merged = mergeAndSort();
      const years = merged.map((entry) => extractStartYear(entry.date));
      for (let i = 1; i < years.length; i++) {
        if (years[i - 1] !== null && years[i] !== null) {
          expect(years[i - 1]).toBeGreaterThanOrEqual(years[i]);
        }
      }
    });

    it('each merged entry should have required fields', () => {
      const merged = mergeAndSort();
      merged.forEach((entry) => {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('type');

        expect(typeof entry.id).toBe('string');
        expect(entry.id.length).toBeGreaterThan(0);
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);
        expect(typeof entry.date).toBe('string');
        expect(entry.date.length).toBeGreaterThan(0);
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
        expect(['education', 'experience', 'project']).toContain(entry.type);
      });
    });

    it('should handle entries with missing description gracefully', () => {
      const entryWithoutDescription = {
        id: 'test-missing-desc',
        title: 'Test Entry',
        date: '2023',
        type: 'project',
      };
      const testData = [entryWithoutDescription];
      const merged = [...educationData, ...experienceData, ...projectData, ...testData];
      const sorted = merged.sort((a, b) => {
        const yearA = extractStartYear(a.date);
        const yearB = extractStartYear(b.date);
        if (yearA === null && yearB === null) return 0;
        if (yearA === null) return 1;
        if (yearB === null) return -1;
        return yearB - yearA;
      });

      const found = sorted.find((e) => e.id === 'test-missing-desc');
      expect(found).toBeDefined();
      expect(found.description).toBeUndefined();
    });

    it('should handle entries with unparseable dates by placing them at the end', () => {
      const entryWithBadDate = {
        id: 'test-bad-date',
        title: 'Bad Date Entry',
        date: 'invalid-date-string',
        description: 'No parseable year',
        type: 'experience',
      };
      const entryWithValidDate = {
        id: 'test-valid-date',
        title: 'Valid Date Entry',
        date: '2020',
        description: 'Has a valid year',
        type: 'education',
      };
      const testData = [entryWithBadDate, entryWithValidDate];
      const merged = [...educationData, ...experienceData, ...projectData, ...testData];
      const sorted = merged.sort((a, b) => {
        const yearA = extractStartYear(a.date);
        const yearB = extractStartYear(b.date);
        if (yearA === null && yearB === null) return 0;
        if (yearA === null) return 1;
        if (yearB === null) return -1;
        return yearB - yearA;
      });

      const badDateIndex = sorted.findIndex((e) => e.id === 'test-bad-date');
      const validDateIndex = sorted.findIndex((e) => e.id === 'test-valid-date');
      expect(badDateIndex).toBeGreaterThan(validDateIndex);
    });

    it('should preserve all original entry properties after merge', () => {
      const merged = mergeAndSort();
      const allSourceEntries = [
        ...educationData,
        ...experienceData,
        ...projectData,
      ];
      allSourceEntries.forEach((sourceEntry) => {
        const found = merged.find((e) => e.id === sourceEntry.id);
        expect(found).toBeDefined();
        expect(found).toEqual(sourceEntry);
      });
    });
  });
});
