import container from '../../config/container.js';

const apiUsageRepository = container.resolve('apiUsageRepository');

export const requestTracking = (controller) => {
  return async (req, res, next) => {
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;
      const { method, originalUrl: endpointAccess } = req;
      const { statusCode } = res;
      const userId = req.user ? req.user.username : null;

      let usageRecord = await apiUsageRepository.findOneByClause({ endpointAccess, requestMethod: method, statusCode });

      if (usageRecord) {
        usageRecord.requestCount += 1;
        usageRecord.responseTimeAvg = (usageRecord.responseTimeAvg * (usageRecord.requestCount - 1) + duration) / usageRecord.requestCount;
        usageRecord.responseTimeMin = Math.min(usageRecord.responseTimeMin, duration);
        usageRecord.responseTimeMax = Math.max(usageRecord.responseTimeMax, duration);
        usageRecord.timestamp = new Date();
      } else {
        usageRecord = await apiUsageRepository.create({
          endpointAccess,
          requestMethod: method,
          statusCode,
          responseTimeAvg: duration,
          responseTimeMin: duration,
          responseTimeMax: duration,
          requestCount: 1,
          timestamp: new Date(),
          userId
        });
      }

      await usageRecord.save();
    });

    controller(req, res, next);
  };
}
