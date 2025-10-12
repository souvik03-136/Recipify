import NodeCache from 'node-cache';

export const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false
});

export const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache_${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      cache.set(key, body, duration);
      return originalJson(body);
    };

    next();
  };
};

export const clearCache = (pattern) => {
  const keys = cache.keys();
  const matchingKeys = pattern 
    ? keys.filter(key => key.includes(pattern))
    : keys;
  
  matchingKeys.forEach(key => cache.del(key));
  return matchingKeys.length;
};