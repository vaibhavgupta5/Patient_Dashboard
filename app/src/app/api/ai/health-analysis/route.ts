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

    // Generate the prompt for Cohere
    const prompt = `Analyze the following health vitals and provide a concise assessment within 150 characters for each entry. Include possible health conditions or diseases. Format the response using HTML tags, following the specified layout for each entry. Each entry should adhere to this structure:

<strong>Entry X:</strong><br>
<strong>Heart Rate:</strong> [value] bpm - [status]<br>
<strong>Blood Pressure:</strong> [systolic/diastolic] mmHg - [status]<br>
<strong>Oxygen Saturation:</strong> [value]% - [status]<br>
<strong>Respiratory Rate:</strong> [value] breaths/min - [status]<br>
<strong>Temperature:</strong> [value]°F - [status]<br>
<strong>Date:</strong> [date]<br>
[Concise Analysis within 150 characters]<br><br>

${healthMetrics.map((metric, index) => 
      `<strong>Entry ${index + 1}:</strong><br>
<strong>Heart Rate:</strong> ${metric.heart_rate || 'N/A'} bpm - ${metric.heart_rate >= 60 && metric.heart_rate <= 100 ? 'Ideal' : 'Check required'}<br>
<strong>Blood Pressure:</strong> ${metric.blood_pressure?.systolic || 'N/A'}/${metric.blood_pressure?.diastolic || 'N/A'} mmHg - ${metric.blood_pressure?.systolic >= 90 && metric.blood_pressure?.systolic <= 120 && metric.blood_pressure?.diastolic >= 60 && metric.blood_pressure?.diastolic <= 80 ? 'Ideal' : 'Monitor levels'}<br>
<strong>Oxygen Saturation:</strong> ${metric.oxygen_saturation || 'N/A'}% - ${metric.oxygen_saturation >= 95 ? 'Normal' : 'Potential issue'}<br>
<strong>Respiratory Rate:</strong> ${metric.respiratory_rate || 'N/A'} breaths/min - ${metric.respiratory_rate >= 12 && metric.respiratory_rate <= 20 ? 'Ideal' : 'Assess further'}<br>
<strong>Temperature:</strong> ${metric.temperature || 'N/A'}°F - ${metric.temperature >= 97 && metric.temperature <= 99 ? 'Normal' : 'Evaluate'}<br>
<strong>Date:</strong> ${metric.updated_at}<br>
[Add specific analysis and recommendation here]<br><br>`
).join('')}

<strong>Summary and Recommendations:</strong><br>
Provide a summary based on the overall analysis and key recommendations for improvement. Ensure this section highlights essential actions, using <strong> tags for emphasis.<br>
Format response strictly to match this layout and use <strong> for bold sections and <br> for line breaks.
`;


    // Send request to Cohere API
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate', // Cohere's text generation endpoint
      {
        model: 'command-r-plus-08-2024', // Use the appropriate model (check Cohere documentation)
        prompt: prompt,
        max_tokens: 500, // Specify token limit
        temperature: 0.7, // Adjust temperature for creativity
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`, // Use your Cohere API key
        },
      }
    );

    // Extract the generated text
    const result = response.data.generations[0].text;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error("Cohere API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: 'Failed to analyze health vitals', error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
