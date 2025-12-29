import 'zone.js';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ZoneContextManager } from '@opentelemetry/context-zone';

try {
    const provider = new WebTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: 'frontend-vite-app',
        }),
    });

    // Configure Zipkin Exporter
    const zipkinExporter = new ZipkinExporter({
        url: 'http://localhost:9411/api/v2/spans',
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));

    provider.register({
        contextManager: new ZoneContextManager(),
    });

    registerInstrumentations({
        instrumentations: [
            new DocumentLoadInstrumentation(),
            new FetchInstrumentation({
                propagateTraceHeaderCorsUrls: [
                    /http:\/\/localhost:8081\.*/, // Regex to match your backend URL
                ],
            }),
        ],
    });

    console.log('OpenTelemetry instrumentation initialized successfully');
} catch (e) {
    console.error('Failed to initialize OpenTelemetry instrumentation', e);
}
