import request from 'supertest';
import app from '../../../backserver/api/website.route'; // Assuming your app is defined in the app.js file
import websiteDataService from '../services/website.js';

describe('Website Data Service', () => {
  // Mock the http-common module
  jest.mock('./http-common', () => {
    return {
      post: jest.fn(),
      get: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test getUser
  describe('getUser', () => {
    it('should call the /users endpoint with the provided data', async () => {
      const data = {
        senddata: { name: 'John' },
      };

      await websiteDataService.getUser(data);
      expect(request(app).post).toHaveBeenCalledWith('/users', data.senddata);
    });
  });

  // Test getEvents
  describe('getEvents', () => {
    it('should call the /events endpoint', async () => {
      await websiteDataService.getEvents();
      expect(request(app).get).toHaveBeenCalledWith('/events');
    });
  });

  // Test getEventsByFilter
  describe('getEventsByFilter', () => {
    it('should call the /eventsfilter endpoint with the provided data', async () => {
      const data = { filter: 'someFilter' };

      await websiteDataService.getEventsByFilter(data);
      expect(request(app).post).toHaveBeenCalledWith('/eventsfilter', data);
    });
  });

  // Test getOdByFilter
  describe('getOdByFilter', () => {
    it('should call the /odfilter endpoint with the provided data', async () => {
      const data = { filter: 'someFilter' };

      await websiteDataService.getOdByFilter(data);
      expect(request(app).post).toHaveBeenCalledWith('/odfilter', data);
    });
  });

  // Test getLeaveByDate
  describe('getLeaveByDate', () => {
    it('should call the /leaves endpoint with the provided data', async () => {
      const data = { date: '2023-06-12' };

      await websiteDataService.getLeaveByDate(data);
      expect(request(app).post).toHaveBeenCalledWith('/leaves', data);
    });
  });

  // Test getAllLeaves
  describe('getAllLeaves', () => {
    it('should call the /leavesall endpoint', async () => {
      await websiteDataService.getAllLeaves();
      expect(request(app).get).toHaveBeenCalledWith('/leavesall');
    });
  });

  // Test putEventOd
  describe('putEventOd', () => {
    it('should call the /eventod endpoint with the provided data', async () => {
      const data = { eventData: { name: 'Event' } };

      await websiteDataService.putEventOd(data);
      expect(request(app).post).toHaveBeenCalledWith('/eventod', data);
    });
  });

  // Add tests for other methods following the same pattern
});
