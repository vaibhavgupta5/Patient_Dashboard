import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { healthMetrics } = body;

    if (!healthMetrics || !Array.isArray(healthMetrics)) {
      return NextResponse.json(
        { message: 'Health metrics data is required and must be an array.' },
        { status: 400 }
      );
    }

    // Build prompt (same as before)
    const prompt = `Analyze the following health vitals and provide a concise assessment within 150 characters for each entry...

${healthMetrics.map((metric, index) => 
`Entry ${index + 1}:
Heart Rate: ${metric.heart_rate || 'N/A'}
Blood Pressure: ${metric.blood_pressure?.systolic || 'N/A'}/${metric.blood_pressure?.diastolic || 'N/A'}
Oxygen Saturation: ${metric.oxygen_saturation || 'N/A'}
Respiratory Rate: ${metric.respiratory_rate || 'N/A'}
Temperature: ${metric.temperature || 'N/A'}
Date: ${metric.updated_at}

[Add analysis]`
).join('\n\n')}
`;

    // ✅ Cohere Chat API call
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model: 'command-a-03-2025',
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // ✅ Extract chat response (IMPORTANT CHANGE)
    const result = response.data.message.content[0].text;

    return NextResponse.json({ result }, { status: 200 });

  } catch (error: any) {
    console.error("Cohere Chat API Error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        message: 'Failed to analyze health vitals',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
