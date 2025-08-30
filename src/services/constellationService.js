// This is a mock service that simulates fetching constellation data.
// In a real application, this would make a network request to a backend API.

const MOCK_CONSTELLATION_DATA = {
  class_id: 'class-123',
  students: [
    {
      id: 'student-1',
      name: 'Emma',
      positiveRatio: 0.85,
      totalBehaviours: 18,
      recentPositiveLog: true,
      celebrationMoment: false
    },
    {
      id: 'student-2',
      name: 'Liam',
      positiveRatio: 0.65,
      totalBehaviours: 15,
      recentPositiveLog: false,
      celebrationMoment: true
    },
    {
      id: 'student-3',
      name: 'Olivia',
      positiveRatio: 0.35,
      totalBehaviours: 12,
      recentPositiveLog: false,
      celebrationMoment: false
    }
  ],
  constellation_stats: {
    total_students: 3,
    bright_stars: 1,
    growing_stars: 1,
    needs_support_stars: 1,
    average_brightness: 0.62
  },
  generated_at: new Date().toISOString()
};

export const fetchConstellationData = async (classId, tenantId, schoolId) => {
  console.log(`Fetching constellation data for class ${classId}, tenant ${tenantId}, school ${schoolId}`);
  // In a real app, you'd have an API call here.
  // For now, we'll simulate a successful API call with mock data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_CONSTELLATION_DATA);
    }, 500); // Simulate network delay
  });
};

export const generateMockConstellationData = (classId) => {
  console.log(`Generating mock constellation data for class ${classId}`);
  // In a real app, this might have more complex logic to generate varied mock data.
  return MOCK_CONSTELLATION_DATA;
};
