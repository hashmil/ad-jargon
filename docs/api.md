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

**Error Response (400/500):**
```typescript
{
  "success": false,
  "error": string,
  "translatedText": ""
}
```

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

**Server Error:**
```json
{
  "success": false,
  "error": "Failed to translate text",
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

### 3. Fallback Translation (Secondary)
- Activates if AI translation fails
- Uses rule-based jargon mapping
- Adds random buzzwords for enhancement
- Always succeeds (guaranteed response)

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

## 🔧 Fallback System

### Jargon Mappings
The fallback system uses predefined mappings for common business terms:

```typescript
const jargonMap = {
  'think': 'ideate',
  'ideas': 'blue-sky thinking',
  'new ideas': 'disruptive ideation',
  'meeting': 'alignment session',
  'plan': 'strategic roadmap',
  'client': 'key stakeholder',
  'budget': 'investment allocation',
  'problem': 'opportunity space',
  // ... 40+ more mappings
}
```

### Enhancement Process
1. **Word Replacement**: Apply jargon mappings
2. **Buzzword Injection**: Add random buzzwords (30% chance per word)
3. **Prefix Addition**: Add agency prefix phrase
4. **Suffix Addition**: Add agency suffix phrase
5. **Capitalisation**: Proper sentence structure

### Buzzword Categories
- **Synergistic**: synergistic, holistic, disruptive
- **Strategic**: innovative, cutting-edge, next-generation
- **Performance**: scalable, agile, dynamic, mission-critical
- **Quality**: best-in-class, world-class, enterprise-grade

## 🔒 Security & Rate Limiting

### Authentication
- No authentication required for public API
- API key stored securely in environment variables
- Rate limiting handled by Cloudflare

### Input Sanitisation
```typescript
// Basic validation
if (!text || typeof text !== 'string' || text.trim().length === 0) {
  return error('Text is required');
}

// Recommended limits
const MAX_LENGTH = 1000; // characters
```

### Error Handling
- Graceful failure to fallback system
- No sensitive information in error messages
- Proper HTTP status codes

## 📊 Response Times & Performance

### Expected Response Times
- **AI Translation**: 2-5 seconds
- **Fallback Translation**: <100ms
- **Edge Runtime**: Global sub-50ms routing

### Performance Optimisations
- **Edge Runtime**: Runs close to users globally
- **Lightweight Implementation**: No heavy SDK dependencies
- **Efficient Fallback**: Local processing when AI fails

## 🌍 British English Implementation

### AI Instructions
The AI is explicitly instructed to use British English spellings:
- optimise (not optimize)
- realise (not realize)
- colour (not color)
- centre (not center)

### Fallback Consistency
All fallback mappings use British spellings:
```typescript
{
  'improve': 'optimise and iterate',
  'sales': 'conversion optimisation',
  'email': 'personalised touchpoint communication'
}
```

## 🧪 Testing the API

### Using curl
```bash
curl -X POST https://ad-jargon.pages.dev/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "We need to discuss the budget"}'
```

### Using JavaScript
```javascript
async function translateText(text) {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Translation (${data.method}):`, data.translatedText);
    } else {
      console.error('Translation failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
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
// Fallback Output: "Let's action on synergistic blue-sky thinking to drive maximum ROI."
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
- **Fallback**: Always available when AI is unavailable

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
  "error": "Text is required",
  "translatedText": ""
}
```
**Solution**: Ensure request body contains non-empty "text" field

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to translate text",
  "translatedText": ""
}
```
**Solution**: Server issue, try again later. Fallback should still work.

#### Network Timeout
**Symptom**: Request takes >30 seconds
**Solution**: Check network connection, API may be overloaded

### Debugging Tips
1. **Check Request Format**: Ensure JSON is valid
2. **Verify Content-Type**: Must be `application/json`
3. **Test Fallback**: Should always work even if AI fails
4. **Monitor Console**: Check browser dev tools for errors

---

The API is designed to be simple, reliable, and entertaining. Perfect for adding some corporate satire to your applications! 🎭