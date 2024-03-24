const gpt4Input = document.getElementById('gpt4-message-input');
const gpt4Messages = document.getElementById('gpt4-chat-messages');
const gpt4SendButton = document.getElementById('gpt4');

const j2Input = document.getElementById('j2-message-input');
const j2Messages = document.getElementById('j2-chat-messages');
const j2SendButton = document.getElementById('j2');


const GPT_KEY = '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';
const J2_KEY = 'tGlJGtorLjaA3K3BEk3AMjOWwujf8uWW';

gpt4SendButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const mytext = gpt4Input.value.trim();
  if (mytext) {
    const userDiv = document.createElement('div');
    userDiv.textContent = mytext; userDiv.className = 'user-message';
    gpt4Messages.appendChild(userDiv);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ` + GPT_KEY
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
              role: 'user',
              content: mytext
            }],
            temperature: 1.0,
            top_p: 0.7,
            n: 1,
            stream: false,
            presence_penalty: 0,
            frequency_penalty: 0,
          }),
        }); if (response.ok) {
          const data = await response.json();
          const messageDiv = document.createElement('div');
          messageDiv.textContent = data.choices[0].message.content;
          messageDiv.className = 'ai-message';
          gpt4Messages.appendChild(messageDiv);
        } else { gpt4Messages.textContent = 'Error: Unable to process your request.'; }
    } catch (error) {
      console.error(error);
      gpt4Messages.textContent = 'Error: Unable to process your request.';
    }
    gpt4Input.value = '';
    gpt4Messages.scrollTop = gpt4Messages.scrollHeight;
  }
});

j2SendButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const mytext = j2Input.value.trim();
  if (mytext) {
    const userDiv = document.createElement('div');
    userDiv.textContent = mytext;
    userDiv.className = 'user-message';
    j2Messages.appendChild(userDiv);
    try {
      const response = await fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ` + J2_KEY
        },
        body: JSON.stringify({
          numResults: 1,
          maxTokens: 16,
          minTokens: 0,
          temperature: 0.7,
          topP: 1,
          topKReturn: 0,
          frequencyPenalty: {
            scale: 0,
            applyToWhitespaces: true,
            applyToPunctuations: true,
            applyToNumbers: true,
            applyToStopwords: true,
            applyToEmojis: true
          },
          presencePenalty: {
            scale: 0,
            applyToWhitespaces: true,
            applyToPunctuations: true,
            applyToNumbers: true,
            applyToStopwords: true,
            applyToEmojis: true
          },
          countPenalty: {
            scale: 0,
            applyToWhitespaces: true,
            applyToPunctuations: true,
            applyToNumbers: true,
            applyToStopwords: true,
            applyToEmojis: true
          },
          prompt: mytext
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const messageDiv = document.createElement('div');
        messageDiv.textContent = data.completions[0].data.text;
        messageDiv.className = 'ai-message';
        j2Messages.appendChild(messageDiv);
      } else {
        j2Messages.textContent = 'Error: Unable to process your request.';
      }
    } catch (error) {
      console.error(error);
      j2Messages.textContent = 'Error: Unable to process your request.';
    }
    j2Input.value = '';
    j2Messages.scrollTop = j2Messages.scrollHeight;
  }
});