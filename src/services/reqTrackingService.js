import container from "../config/container.js";

const apiUsageRepository = container.resolve('apiUsageRepository');

const getApiUsagesService = async () => {
    return await apiUsageRepository.findAll();
};

const statesRequest = async () => {
    const usages = await apiUsageRepository.findAll();
  
    const breakdown = usages.reduce((acc, usage) => {
      if (!acc[usage.endpointAccess]) {
        acc[usage.endpointAccess] = {};
      }
      if (!acc[usage.endpointAccess][usage.requestMethod]) {
        acc[usage.endpointAccess][usage.requestMethod] = 0;
      }
      acc[usage.endpointAccess][usage.requestMethod] += usage.requestCount;
      return acc;
    }, {});
    const total_requests = usages.reduce((acc, usage) => acc + usage.requestCount, 0);
    return { breakdown, total_requests}
};

const responseTimeService = async () => {
    const usages = await apiUsageRepository.findAll();

    const responseTimes = usages.reduce((acc, usage) => {
      if (!acc[usage.endpointAccess]) {
        acc[usage.endpointAccess] = {
          avg: 0,
          min: Infinity,
          max: -Infinity,
          count: 0
        };
      }
      acc[usage.endpointAccess].avg += usage.responseTimeAvg * usage.requestCount;
      acc[usage.endpointAccess].min = Math.min(acc[usage.endpointAccess].min, usage.responseTimeMin);
      acc[usage.endpointAccess].max = Math.max(acc[usage.endpointAccess].max, usage.responseTimeMax);
      acc[usage.endpointAccess].count += usage.requestCount;

      return acc;
    }, {});

    for (const endpoint in responseTimes) {
      responseTimes[endpoint].avg = responseTimes[endpoint].avg / responseTimes[endpoint].count;
      delete responseTimes[endpoint].count;
    }
    return responseTimes;
};

const getPopularEndpoints = async () => {
    const usages = await apiUsageRepository.findAll();

    const popularEndpoint = usages.reduce((acc, usage) => {
      if (!acc[usage.endpointAccess]) {
        acc[usage.endpointAccess] = 0;
      }
      acc[usage.endpointAccess] += usage.requestCount;
      return acc;
    }, {});

    const mostPopular = Object.keys(popularEndpoint).reduce((a, b) => 
      popularEndpoint[a] > popularEndpoint[b] ? a : b
    );
    return{mostPopular, popularEndpoint};
};

const getStatusCode = async () => {
    const usages = await apiUsageRepository.findAll();

    const statusCodes = usages.reduce((acc, usage) => {
      if (!acc[usage.statusCode])
        acc[usage.statusCode] = 0;
      acc[usage.statusCode] += usage.requestCount;
      return acc;
    }, {});
    return statusCodes;
};

export default {
    getApiUsagesService,
    responseTimeService,
    statesRequest,
    getPopularEndpoints,
    getStatusCode
};