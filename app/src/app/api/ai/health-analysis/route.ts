import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { healthMetrics } = body;

    // ✅ Strong validation
    if (
      !healthMetrics ||
      !Array.isArray(healthMetrics) ||
      healthMetrics.length === 0
    ) {
      return NextResponse.json(
        { message: 'Health metrics must be a non-empty array.' },
        { status: 400 }
      );
    }

    // ✅ Build entries
    const entries = healthMetrics
      .map((metric: any, index: number) => {
        return `
Entry ${index + 1}:
Heart Rate: ${metric.heart_rate ?? 'N/A'} bpm
Blood Pressure: ${metric.blood_pressure?.systolic ?? 'N/A'}/${metric.blood_pressure?.diastolic ?? 'N/A'} mmHg
Oxygen Saturation: ${metric.oxygen_saturation ?? 'N/A'}%
Respiratory Rate: ${metric.respiratory_rate ?? 'N/A'} breaths/min
Temperature: ${metric.temperature ?? 'N/A'}°F
Date: ${metric.updated_at ?? 'N/A'}
        `;
      })
      .join('\n');

    // ✅ Prompt
    const prompt = `
You are a medical assistant.

Analyze each entry and return response in clean HTML format using <strong> and <br> tags.

Rules:
- Max 150 characters per entry analysis
- Mention possible conditions if abnormal
- Keep it concise and readable

${entries}

Also include a final summary with recommendations.
    `.trim();

    // ✅ Gemini API call
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.COHERE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    // ✅ Extract response safely
    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response generated';

    return NextResponse.json({ result }, { status: 200 });

  } catch (error: any) {
    console.error(
      'Gemini API Error:',
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        message: 'Failed to analyze health vitals',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
