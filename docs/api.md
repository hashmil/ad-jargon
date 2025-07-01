# API Documentation

The Ad Agency Jargon Translator provides a simple REST API for transforming normal business language into satirical agency buzzwords.

## 🚀 Base URL

- **Production**: `https://ad-jargon.pages.dev/api`
- **Local Development**: `http://localhost:3000/api`

## 📋 Endpoints

### POST /api/translate

Translates normal business text into agency jargon using AI with automatic retry logic.

#### Request

**Headers:**
```
Content-Type: application/json
```

**CORS Support:**
- Cross-origin requests are supported
- OPTIONS preflight requests are handled
- Supports requests from all origins for public API

**Body:**
```typescript
{
  "text": string  // Required: Text to translate (max ~1000 chars recommended)
}
```

**Example Request:**
```javascript
fetch('/api/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "Let's think of some new ideas for this client"
  })
})
```

#### Response

**Success Response (200):**
```typescript
{
  "success": true,
  "translatedText": string,
  "method": "ai"
}
```
*All responses include CORS headers for browser compatibility*

**Error Response (400/429/500):**
```typescript
{
  "success": false,
  "error": string,
  "translatedText": ""
}
```

**Rate Limit Response (429):**
```typescript
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "translatedText": ""
}
```
*Includes additional headers: X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After*

#### Example Responses

**AI Translation Success:**
```json
{
  "success": true,
  "translatedText": "Moving forward, we should leverage disruptive ideation to optimise our value proposition for scalable growth potential.",
  "method": "ai"
}
```

**Retry Success:**
```json
{
  "success": true,
  "translatedText": "Moving forward, we should leverage disruptive ideation to optimise our value proposition for scalable growth potential.",
  "method": "ai"
}
```

**Validation Error:**
```json
{
  "success": false,
  "error": "Text is required",
  "translatedText": ""
}
```

**Service Error:**
```json
{
  "success": false,
  "error": "Service temporarily unavailable. Please try again later.",
  "translatedText": ""
}
```

**Network Error (Client-side handling):**
```json
{
  "success": false,
  "error": "Network error. Please check your connection and try again.",
  "translatedText": ""
}
```

## 🔄 Translation Process

### 1. Input Validation
- Checks if text is provided
- Validates text is a string
- Ensures text is not empty after trimming

### 2. AI Translation (Primary)
- Sends request to OpenRouter API
- Uses Mistral Small 3.2 24B Instruct model
- Includes British English spelling instructions
- Timeout after reasonable period

### 3. Retry Logic
- Automatically retries failed AI requests up to 2 times
- Provides user feedback during retry attempts
- Returns error if all attempts fail

## 🤖 AI Integration Details

### OpenRouter Configuration
```typescript
{
  baseURL: "https://openrouter.ai/api/v1",
  model: "mistralai/mistral-small-3.2-24b-instruct:free",
  headers: {
    "Authorization": "Bearer ${OPENROUTER_API_KEY}",
    "HTTP-Referer": "https://ad-jargon.pages.dev",
    "X-Title": "Ad Agency Jargon Translator"
  }
}
```

### AI Prompt Template
```
Transform this normal business statement into hilariously over-the-top advertising agency jargon. Make it as buzzword-heavy and pretentious as possible, using terms like "synergise," "ideate," "paradigm," "holistic," "leverage," "circle back," "move the needle," etc. The goal is to satirise corporate speak. Use British English spelling throughout (e.g., "optimise," "realise," "colour," "centre"):

"${userInput}"

Respond with ONLY the translated jargon version, no explanation.
```

### AI Parameters
- **Max Tokens**: 200
- **Temperature**: 0.8 (creative but controlled)
- **Model**: Mistral Small 3.2 24B Instruct (Free tier)

## 🔄 Retry System

### Retry Logic
The API implements automatic retry functionality:

1. **Initial Request**: First attempt to translate via AI
2. **Retry on Failure**: Up to 2 additional attempts if the first fails
3. **User Feedback**: Loading states show retry attempts in progress
4. **Final Failure**: Returns error response if all attempts fail

### Retry Scenarios
- Network timeouts
- API rate limiting
- Temporary service unavailability
- Invalid API responses

## 🔒 Security & Rate Limiting

### CORS Configuration
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### Authentication
- No authentication required for public API
- API key stored securely in environment variables
- Client identification for rate limiting

### Rate Limiting
- Built-in rate limiting with client identification
- Graceful error responses with retry information
- Rate limit headers included in responses

### Input Validation & Sanitisation
```typescript
// Comprehensive validation
const validationResult = defaultValidator.validate(text);
if (!validationResult.isValid) {
  return error(validationResult.error || 'Invalid input');
}

// Text length and content validation
const sanitizedText = validationResult.sanitizedText;
```

### Error Handling
- Comprehensive error categorization
- Browser-specific error handling (Chrome on iOS)
- No sensitive information in error messages
- Proper HTTP status codes with CORS headers

## 📊 Response Times & Performance

### Expected Response Times
- **AI Translation**: 2-5 seconds
- **Retry Attempts**: Additional 2-5 seconds per retry
- **Edge Runtime**: Global sub-50ms routing

### Performance Optimisations
- **Edge Runtime**: Runs close to users globally
- **Lightweight Implementation**: No heavy SDK dependencies
- **Smart Retry Logic**: Avoids unnecessary requests

## 🌍 British English Implementation

### AI Instructions
The AI is explicitly instructed to use British English spellings:
- optimise (not optimize)
- realise (not realize)
- colour (not color)
- centre (not center)

### Consistency Across Features
All AI-generated content uses British spellings consistently, ensuring a cohesive experience throughout the application.

## 🧪 Testing the API

### Using curl
```bash
curl -X POST https://ad-jargon.pages.dev/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "We need to discuss the budget"}'
```

### Using JavaScript (with improved error handling)
```javascript
async function translateText(text) {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    // Check response status
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Translation (${data.method}):`, data.translatedText);
    } else {
      console.error('Translation failed:', data.error);
    }
  } catch (error) {
    // Handle different error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error. Please check your connection.');
    } else {
      console.error('Error:', error.message);
    }
  }
}
```

### Using Python
```python
import requests

def translate_text(text):
    url = "https://ad-jargon.pages.dev/api/translate"
    payload = {"text": text}
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    if data["success"]:
        print(f"Translation ({data['method']}): {data['translatedText']}")
    else:
        print(f"Error: {data['error']}")
```

## 📈 Usage Examples

### Simple Translation
```javascript
// Input: "Let's brainstorm some ideas"
// AI Output: "Moving forward, we should leverage innovative thought-showers to optimise our disruptive ideation for next-level paradigm disruption."
```

### Complex Business Scenario
```javascript
// Input: "The client wants changes to the design and we need to discuss the budget by Friday"
// AI Output: "From a strategic standpoint, our key stakeholder requires iterative optimisation to the experiential design thinking, and we need to deep-dive into investment allocation parameters to maximise stakeholder buy-in."
```

## 🔄 Rate Limits & Quotas

### OpenRouter Free Tier
- **Model**: Mistral Small 3.2 24B Instruct
- **Limit**: Rate limited (exact limits vary)
- **Retry Logic**: Automatically handles temporary failures

### Cloudflare Pages Free Tier
- **Requests**: 100,000 per day
- **Duration**: 100,000 CPU milliseconds per day
- **Bandwidth**: Unlimited

## 🚨 Error Codes & Troubleshooting

### Common Error Scenarios

#### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input. Please check your text and try again.",
  "translatedText": ""
}
```
**Solution**: Ensure request body contains valid, non-empty "text" field

#### 429 Too Many Requests  
```json
{
  "success": false,
  "error": "Too many requests. Please wait a moment and try again.",
  "translatedText": ""
}
```
**Solution**: Wait for the time specified in Retry-After header before making another request

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Service temporarily unavailable. Please try again later.",
  "translatedText": ""
}
```
**Solution**: Server issue, API will automatically retry up to 2 times. If persistent, wait a few minutes.

#### Network Errors (Chrome on iOS)
**Symptom**: Requests fail with network errors on Chrome for iOS but work on Safari
**Solution**: This is now handled with improved CORS headers and error handling

### Debugging Tips
1. **Check Request Format**: Ensure JSON is valid
2. **Verify Content-Type**: Must be `application/json`
3. **Monitor Retries**: Watch for retry attempts in network tab
4. **Check Browser Compatibility**: Test in both Chrome and Safari on iOS
5. **Monitor Console**: Check browser dev tools for specific error messages
6. **Network Tab**: Look for CORS errors or failed preflight requests
7. **Rate Limiting**: Check response headers for rate limit information

---

The API is designed to be simple, reliable, and entertaining. Perfect for adding some corporate satire to your applications! 🎭