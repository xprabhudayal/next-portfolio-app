// instrumentation.ts - Server-side initialization
// This file runs once when the Next.js server starts
// Purpose: Observability, monitoring, server setup (OpenTelemetry, logging, etc.)
// Documentation: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  // Server-side initialization code only
  // TODO: Add OpenTelemetry or monitoring setup when needed
  // Example: await registerOTel({ serviceName: 'next-portfolio-app' })

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Server instrumentation registered');
  }
}
