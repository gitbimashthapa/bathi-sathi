import axios from 'axios';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // <-- key

export async function getOpenAIResponse(conversation) {
  try {
    // conversation is an array of message objects, e.g.:
    // [{ role: 'user', content: 'Hello' }, { role: 'assistant', content: 'Hi there!' }]

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', 
        messages: conversation,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    //assistant's reply is usually in response.data.choices[0].message.content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return 'Sorry, something went wrong while fetching a response.';
  }
}
