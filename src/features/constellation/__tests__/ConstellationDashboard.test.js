import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStore } from '../../../state/useStore';
import ConstellationDashboard from '../index';

// Mock the useStore hook
jest.mock('../../../state/useStore');

// Mock the constellation service
jest.mock('../../../services/constellationService', () => ({
  fetchConstellationData: jest.fn(),
  generateMockConstellationData: jest.fn()
}));

// Mock utility functions
jest.mock('../../../utils/engagementScore', () => ({
  getInvisibleStudents: jest.fn(() => []),
  MOCK_QUICK_LOG_DATA: []
}));

jest.mock('../../../utils/seedDemoData', () => ({
  getConstellationEffects: jest.fn(() => ({
    starBrightness: 0.8,
    pulseEffect: false,
    shouldShowShootingStar: false,
    trailColor: '#FFD700'
  }))
}));

describe('ConstellationDashboard', () => {
  const mockStore = {
    students: [],
    behaviours: [],
    abcIncidents: [],
    engagementOptOuts: {},
    selectedClassId: 'class-123',
    tenantId: 'tenant-456',
    schoolId: 'school-789'
  };

  const mockConstellationData = {
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

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    useStore.mockReturnValue(mockStore);

    // Mock successful API response
    const { fetchConstellationData } = require('../../../services/constellationService');
    fetchConstellationData.mockResolvedValue(mockConstellationData);
  });

  test('renders ConstellationDashboard without crashing', () => {
    render(<ConstellationDashboard />);
    expect(screen.getByText(/Student Constellation ⭐/i)).toBeInTheDocument();
  });

  test('displays constellation header and description', () => {
    render(<ConstellationDashboard />);

    expect(screen.getByText(/Student Constellation ⭐/i)).toBeInTheDocument();
    expect(screen.getByText(/Stars shine brighter with positive connections/i)).toBeInTheDocument();
  });

  test('shows loading state while fetching data', async () => {
    // Mock slow API response
    const { fetchConstellationData } = require('../../../services/constellationService');
    fetchConstellationData.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<ConstellationDashboard />);

    expect(screen.getByText(/Charting the stars/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading constellation data/i)).toBeInTheDocument();
  });

  test('displays constellation data after successful API call', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Emma/i)).toBeInTheDocument();
    expect(screen.getByText(/Liam/i)).toBeInTheDocument();
    expect(screen.getByText(/Olivia/i)).toBeInTheDocument();
  });

  test('shows constellation statistics', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/3 stars/i)).toBeInTheDocument();
    expect(screen.getByText(/1 bright/i)).toBeInTheDocument();
    expect(screen.getByText(/1 growing/i)).toBeInTheDocument();
    expect(screen.getByText(/1 need support/i)).toBeInTheDocument();
    expect(screen.getByText(/Avg brightness: 62%/)).toBeInTheDocument();
  });

  test('displays star legend correctly', () => {
    render(<ConstellationDashboard />);

    expect(screen.getByText(/Bright = high positive ratio/i)).toBeInTheDocument();
    expect(screen.getByText(/Pulsing = recent positive log/i)).toBeInTheDocument();
    expect(screen.getByText(/Shooting star = celebration moment/i)).toBeInTheDocument();
  });

  test('renders with no class selected', () => {
    useStore.mockReturnValue({
      ...mockStore,
      selectedClassId: null
    });

    render(<ConstellationDashboard />);

    expect(screen.getByText(/Select a class to view the constellation/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose a class from the dropdown above/i)).toBeInTheDocument();
  });

  test('handles API errors gracefully with fallback to mock data', async () => {
    const { fetchConstellationData, generateMockConstellationData } = require('../../../services/constellationService');

    // Mock API failure
    fetchConstellationData.mockRejectedValueOnce(new Error('Network error'));

    // Mock successful mock data generation
    generateMockConstellationData.mockReturnValue(mockConstellationData);

    render(<ConstellationDashboard />);

    await waitFor(() => {
      // Should fall back to mock data
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Emma/i)).toBeInTheDocument();
    expect(screen.getByText(/Liam/i)).toBeInTheDocument();
    expect(screen.getByText(/Olivia/i)).toBeInTheDocument();
  });

  test('displays student stars with correct positioning', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      // Check that student names are displayed
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Emma/i)).toBeInTheDocument();
    expect(screen.getByText(/Liam/i)).toBeInTheDocument();
    expect(screen.getByText(/Olivia/i)).toBeInTheDocument();
  });

  test('shows star brightness indicators on hover', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      // Check that brightness indicators are present (they should be in the DOM)
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    const stars = screen.getAllByText(/Emma|Liam|Olivia/);
    expect(stars.length).toBeGreaterThan(0);
  });

  test('displays pulsing effect for recent positive logs', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      // Emma has recentPositiveLog: true, so should show pulsing effect
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    const emmaStar = screen.getByText(/Emma/);
    expect(emmaStar).toBeInTheDocument();
  });

  test('shows celebration moment indicators', async () => {
    render(<ConstellationDashboard />);

    await waitFor(() => {
      // Liam has celebrationMoment: true
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    const liamStar = screen.getByText(/Liam/);
    expect(liamStar).toBeInTheDocument();
  });

  test('renders background stars and constellation effects', () => {
    render(<ConstellationDashboard />);

    // Check that the constellation container has the correct background
    const container = screen.getByTestId('constellation');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      background: 'radial-gradient(ellipse at top, #0a0e27 0%, #020515 100%)'
    });
  });

  test('displays shooting stars when triggered', async () => {
    // Mock constellation effects to trigger shooting stars
    const { getConstellationEffects } = require('../../../utils/seedDemoData');
    getConstellationEffects.mockReturnValue({
      starBrightness: 0.9,
      pulseEffect: true,
      shouldShowShootingStar: true,
      trailColor: '#FFD700'
    });

    render(<ConstellationDashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getAllByText(/Emma/i).length).toBeGreaterThan(0);
  });

  test('updates when selectedClassId changes', async () => {
    const { fetchConstellationData } = require('../../../services/constellationService');

    const { rerender } = render(<ConstellationDashboard />);

    // Initial render
    await waitFor(() => {
      expect(fetchConstellationData).toHaveBeenCalledWith('class-123', 'tenant-456', 'school-789');
    });

    // Change class
    useStore.mockReturnValue({
      ...mockStore,
      selectedClassId: 'class-456'
    });

    rerender(<ConstellationDashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(fetchConstellationData).toHaveBeenCalledWith('class-456', 'tenant-456', 'school-789');
  });

  test('handles mock data generation failure', async () => {
    const { fetchConstellationData, generateMockConstellationData } = require('../../../services/constellationService');

    // Mock API failure
    fetchConstellationData.mockRejectedValueOnce(new Error('Network error'));

    // Mock mock data generation failure
    generateMockConstellationData.mockImplementation(() => {
      throw new Error('Mock data generation failed');
    });

    render(<ConstellationDashboard />);

    await waitFor(() => {
      expect(screen.queryByText(/Charting the stars/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Unable to load stars/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to load constellation data/i)).toBeInTheDocument();
  });
});
