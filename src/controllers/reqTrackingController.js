import reqTrackingService from "../services/reqTrackingService.js";

const statesRequest = async (req, res, next) => {
    try {
        const {breakdown, total_requests} = await reqTrackingService.statesRequest()
        res.status(200).json({ total_requests, breakdown });
    } catch (error) {
        res.status(500).json({ error: 'Error in obtaining request statistics'});
    }
};

const responseTime =  async (req, res) => {
  try {
    const responseTimes = await reqTrackingService.responseTimeService();
    res.status(200).json(responseTimes);
  } catch (error) {
    res.status(500).json({ error: 'Error in obtaining response time statistics'});
  }
};

const statusCodes = async (req, res) => {
  try {
    const statusCodes = await reqTrackingService.getStatusCode();
    res.status(200).json(statusCodes);
  } catch (error) {
    res.status(500).json({ error: 'Error in obtaining status code statistics'});
  }
};

const popularEndpoint = async (req, res) => {
  try {
    const {mostPopular, popularEndpoint} = await reqTrackingService.getPopularEndpoints();
    res.status(200).json({ most_popular: mostPopular, request_count: popularEndpoint[mostPopular]});
  } catch (error) {
    res.status(500).json({ error: 'Error getting statistics of popular endpoints'});
  }
};

export default {
    statesRequest,
    responseTime,
    statusCodes,
    popularEndpoint
}
