# 🔐 Security Alert - API Keys Exposed

## ⚠️ IMPORTANT: Immediate Actions Required

GitHub has detected that sensitive API keys were committed to your repository. Follow these steps immediately:

### 1. **Revoke Exposed API Keys** 🔴

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find the exposed API key: `AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
3. Click on it and select **"Delete"** or **"Regenerate"**
4. Create a new API key
5. Add the new key to your `.env.local` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_new_api_key_here
   ```

#### Supabase Keys (if exposed)
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to Settings → API
3. Click **"Reset"** for both the `anon` key and `service_role` key
4. Update your `.env.local` with the new keys

### 2. **Update .env.local** 📝

Make sure your `.env.local` file contains:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_new_supabase_anon_key

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_new_google_maps_api_key

# Optional: Gemini API (for AI features)
GEMINI_API_KEY=your_gemini_api_key
```

### 3. **Verify .gitignore** ✅

Ensure `.gitignore` includes:
```
.env
.env.local
.env.*.local
```

### 4. **Clean Git History** (Optional but Recommended)

If you want to completely remove the keys from git history:

```bash
# Install BFG Repo-Cleaner
brew install bfg

# Remove sensitive files from history
bfg --delete-files .env.local
bfg --delete-files SUPABASE_KEYS_HELP.md
bfg --delete-files GET_API_KEYS.md

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: This rewrites history)
git push --force
```

### 5. **Best Practices Going Forward** 🛡️

1. **Never commit**:
   - `.env.local`
   - `.env`
   - Any file containing API keys or secrets

2. **Always use**:
   - Environment variables for sensitive data
   - `.env.example` for documentation (with placeholder values)

3. **Use GitHub Secrets** for CI/CD:
   - Repository Settings → Secrets and variables → Actions
   - Add secrets there for deployment

4. **Enable Secret Scanning**:
   - Repository Settings → Code security and analysis
   - Enable "Secret scanning"

### 6. **Current Status** ✅

- ✅ Hardcoded API keys removed from code
- ✅ Using environment variables instead
- ✅ `.gitignore` updated
- ⚠️ **YOU MUST**: Revoke and regenerate exposed API keys

## 📚 Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [Google Cloud API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/going-into-prod)

---

**Remember**: The code is now secure, but the exposed keys are still valid until you revoke them!
