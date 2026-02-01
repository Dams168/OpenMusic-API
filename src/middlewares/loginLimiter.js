import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login dari IP ini. Silakan coba lagi nanti.',
  },
});

export const emailLoginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  keyGenerator: (req) => {
    return req.body.email || req.ip; // Use email as key if available, otherwise fallback to IP
  },
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login untuk email ini. Silakan coba lagi nanti.',
  },
});
