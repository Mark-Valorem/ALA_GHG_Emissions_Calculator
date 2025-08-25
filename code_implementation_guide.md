# Step-by-Step Code Implementation Guide for ALA GHG Calculator Updates

## 🔴 HIGH PRIORITY: Adding the Disclaimer

### Step 1: Find the Title Section
Look for this line (around line 50-60):
```html
<h1 class="text-3xl font-bold text-center mb-2">Australian Lubricant Association</h1>
```

### Step 2: Add Disclaimer After Title
**Right after** the subtitle, add this disclaimer box:

```html
<!-- ADD THIS DISCLAIMER BOX -->
<div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6 max-w-4xl mx-auto">
    <h3 class="font-bold text-red-700 mb-2">⚠️ Important Disclaimer</h3>
    <p class="text-sm text-gray-700">
        This calculator is provided by the Australian Lubricant Association (ALA) as a general guide only. 
        While ALA has endeavoured to ensure accuracy, it makes no warranties and accepts no liability 
        for the accuracy, completeness, or reliability of calculations. Users are responsible for 
        verifying all data and calculations for their specific circumstances. This tool should not 
        replace professional advice or official reporting requirements.
    </p>
</div>
```

---

## 🔴 HIGH PRIORITY: Adding Data Security Notice

### Step 1: Find the Instructions Section
Look for this line (around line 70-80):
```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-semibold mb-4">How to Use This Calculator</h2>
```

### Step 2: Add Security Notice Before Instructions
**Right before** the instructions div, add:

```html
<!-- ADD THIS DATA SECURITY NOTICE -->
<div class="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
    <h3 class="font-bold text-green-700 mb-2">🔒 Your Data is Secure</h3>
    <p class="text-sm text-gray-700">
        This calculator operates entirely in your web browser. No data is transmitted to ALA 
        or any external servers. All calculations happen locally on your computer, and your 
        data remains completely private. When you close this page, no trace of your data remains.
    </p>
</div>
```

---

## 🔴 HIGH PRIORITY: Fixing the Zero Values in Input Fields

### Step 1: Find the Monthly Data Input Section
Look for input fields that look like this (around line 900-1000):
```html
<input type="number" value="0" class="w-full px-2 py-1...
```

### Step 2: Replace ALL instances
Change every occurrence from:
```html
value="0"
```
To:
```html
placeholder="0"
```

**Example**: 
- **Before**: `<input type="number" value="0" class="w-full px-2 py-1 border rounded" id="naturalGas_1">`
- **After**: `<input type="number" placeholder="0" class="w-full px-2 py-1 border rounded" id="naturalGas_1">`

You'll need to do this for approximately 150 input fields (12 months × multiple fuel types).

**Pro tip**: Use Find & Replace (Ctrl+H or Cmd+H):
- Find: `value="0"`
- Replace with: `placeholder="0"`
- But be careful to only replace in input fields!

---

## 🟡 MEDIUM PRIORITY: Adding Enter Key Navigation

### Step 1: Find the Script Section
Look for where the JavaScript starts (search for `<script>` near the bottom of the file).

### Step 2: Add This Navigation Code
After the line `// Initialize on page load`, add:

```javascript
// Excel-like Enter key navigation
function setupEnterNavigation() {
    // Get all input fields in the monthly data tables
    const inputs = document.querySelectorAll('#monthlyData input[type="number"]');
    
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                // Move to next input
                if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
                }
            }
        });
    });
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupEnterNavigation();
    // ... rest of initialization code
});
```

---

## 🟡 MEDIUM PRIORITY: Removing Re-refined Base Oil (if present)

### Step 1: Search for Re-refined References
Use Find (Ctrl+F or Cmd+F) to search for:
- "re-refined"
- "rerefined"
- "base oil"

### Step 2: Remove Any Found Sections
If you find any sections about re-refined base oil, delete the entire section including:
- The input field
- Any labels
- Any calculations that reference it

---

## 💚 TESTING YOUR CHANGES

After making changes:

1. **Save the file** with a new name like `ala-ghg-calculator-v3.1-draft.html`

2. **Open in browser** by double-clicking the file

3. **Check these things**:
   - ✅ Disclaimer appears at top
   - ✅ Security notice is visible
   - ✅ Input fields show grey "0" placeholder (not black)
   - ✅ Pressing Enter moves to next field
   - ✅ No errors in browser console (Press F12 to check)

---

## 📋 Quick Checklist

Before sending to the board member:
- [ ] Disclaimer added and visible
- [ ] Data security notice added
- [ ] All zero values changed to placeholders
- [ ] Enter key navigation works
- [ ] File saved with new version number
- [ ] Tested in Chrome, Firefox, and Edge
- [ ] No JavaScript errors in console

---

## 🆘 Need Help?

If you get stuck on any step:
1. Save a backup of your original file first
2. Work on one change at a time
3. Test after each change
4. The exact line numbers might vary slightly - use the Find function!

The most critical changes are the disclaimer and security notice - focus on those first!