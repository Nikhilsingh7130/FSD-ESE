# Open Router API Setup Guide

## 🔑 How to Use Your Open Router API Key

### Step 1: Get Your Open Router API Key
1. Go to https://openrouter.ai
2. Sign up or login
3. Go to Dashboard → Keys
4. Copy your API key

### Step 2: Configure Backend

**Edit `server/.env` file:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint_db
JWT_SECRET=your_jwt_secret_key_here
OPEN_ROUTER_API_KEY=your_open_router_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Replace `your_open_router_api_key_here` with your actual API key from Open Router.

### Step 3: How It Works

The AI analysis now uses Open Router's LLMs instead of keyword-based analysis:

**Features:**
- ✅ Real AI-powered priority detection
- ✅ Intelligent department recommendation
- ✅ Natural language summarization
- ✅ Context-aware auto-responses
- ✅ Better understanding of complaint nuances

### Step 4: Test the Integration

1. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd client
   npm start
   ```

3. File a complaint with complex text, and watch the AI analyze it intelligently!

---

## 🚀 Open Router Models Being Used

The system uses the **Mistral 7B Instruct Free Model** from Open Router:
- Fast response times
- Accurate analysis
- Free tier available
- Excellent for complaint analysis

---

## 💰 Open Router Pricing

- **Free Tier**: Limited requests
- **Paid**: Per-token pricing
- Check [pricing page](https://openrouter.ai/pricing) for details

---

## ⚠️ Error Handling

If API fails, the system automatically falls back to rule-based analysis:
- Keywords analysis for priority
- Category mapping for departments
- Template-based responses

**This ensures the system works even if API is down!**

---

## 🔐 Security Tips

1. ✅ Never commit `.env` file
2. ✅ Use environment variables
3. ✅ Regenerate keys if exposed
4. ✅ Monitor API usage in Open Router dashboard

---

## 🧪 Test Cases with Open Router

### Test 1: Simple Complaint
```
Title: "Broken streetlight"
Description: "The streetlight near my house is broken"
Expected: Low priority, Municipal Department
```

### Test 2: Urgent Water Issue
```
Title: "Severe water leakage"
Description: "Critical water pipeline failure causing flooding in my neighborhood. Water is spreading everywhere and affecting multiple households. Immediate assistance needed."
Expected: Critical priority, Water Department
```

### Test 3: Complex Complaint
```
Title: "Multiple infrastructure issues"
Description: "Multiple problems including damaged roads, broken streetlights, and overflowing drainage system causing public health hazard."
Expected: High priority, Public Works Department
```

---

## 📊 Monitoring

Monitor your API usage:
1. Go to Open Router Dashboard
2. Check "Usage" section
3. Track API calls and costs

---

## ❓ Troubleshooting

### API Key Not Working
```
Error: Unauthorized
Solution: 
1. Check API key is correct
2. Ensure key is from Open Router
3. Check key hasn't expired
```

### Rate Limited
```
Error: Too many requests
Solution:
1. Wait a few minutes
2. Check Open Router dashboard
3. Upgrade to paid plan if needed
```

### Timeout Error
```
Error: Request timeout
Solution:
1. Network might be slow
2. Open Router might be down
3. System will fallback to rule-based analysis
```

---

## 🎯 What Changed from Hugging Face

| Feature | Before (Hugging Face) | After (Open Router) |
|---------|----------------------|-------------------|
| API Used | Hugging Face API | Open Router API |
| Model | Text Classification | Mistral 7B LLM |
| Accuracy | Rule-based keyword matching | AI-powered understanding |
| Response Quality | Simple categories | Context-aware responses |
| Fallback | None | Built-in rule-based fallback |

---

## ✨ Benefits

1. **Better AI Analysis** - Real LLMs understand context
2. **More Accurate** - Better priority and department detection
3. **Natural Language** - Responses sound professional
4. **Intelligent** - Understands nuances in complaints
5. **Reliable** - Fallback ensures system always works

---

## 📝 API Call Format

```javascript
// The system automatically sends:
{
  model: 'mistral/mistral-7b-instruct:free',
  messages: [
    {
      role: 'user',
      content: 'Analyze this complaint: [complaint details]'
    }
  ]
}
```

---

**Your complaint system now has enterprise-grade AI! 🚀**
