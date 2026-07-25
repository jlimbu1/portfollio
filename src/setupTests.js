// Mock IntersectionObserver
// IntersectionObserver is not available in jsdom, mock it
class MockIntersectionObserver {
  constructor(callback, options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = MockIntersectionObserver;

// Optional: mock window.scrollTo to avoid errors in tests
window.scrollTo = jest.fn();