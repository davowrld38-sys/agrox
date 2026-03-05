# Agrox Multi-Step Form Demos

This directory contains interactive demos showcasing the multi-step form implementation with conditional logic (if/else statements).

## Demo Files

### 1. `demo-multi-step.html` - Multi-Step Form Scenarios
Demonstrates different user scenarios:
- **Valid Form Demo**: Shows successful form completion with all validations passing
- **Invalid Form Demo**: Shows validation failures with error messages
- **Partial Completion Demo**: Shows progressive validation with mixed valid/invalid states

**Features:**
- Interactive form with 4 steps (Basic Info, Pricing, Details, Review)
- Real-time validation with visual feedback
- Progress indicators and navigation
- Certification selection with preview
- Complete form preview functionality

### 2. `demo-conditionals.html` - Conditional Logic Explorer
Interactive demonstration of if/else statements in form validation:
- **Code Examples**: Visual code snippets showing conditional logic
- **Logic Flow**: Side-by-side comparison of valid vs invalid conditions
- **Interactive Testing**: Test individual validation scenarios
- **Real Form Demo**: Full multi-step form with validation logging

**Features:**
- Step-by-step validation logic explanation
- Console logging of conditional execution
- Interactive validation testers for each step
- Visual feedback for validation results

## How Conditional Logic Works

### Basic Structure
```javascript
function validateStep(stepNumber) {
    let isValid = true;
    const errors = [];

    // IF current step is 1
    if (stepNumber === 1) {
        // Check basic info fields
        if (!title) {
            errors.push('Title required');
            isValid = false;  // ELSE condition triggered
        }
        // More validation checks...
    }
    // ELSE IF current step is 2
    else if (stepNumber === 2) {
        // Check pricing fields
        if (!price || price <= 0) {
            errors.push('Valid price required');
            isValid = false;
        }
    }
    // ELSE (other steps)
    else {
        // Handle other cases
    }

    // IF validation failed
    if (!isValid) {
        showValidationErrors(errors);  // Show errors
    } else {
        hideValidationErrors();        // Clear errors
    }

    return isValid;  // Return result
}
```

### Key Conditional Patterns

1. **Field Validation**:
   ```javascript
   if (!fieldValue) {
       // IF field is empty/null
       errors.push('Field is required');
       isValid = false;
   } else {
       // ELSE field has value - continue
   }
   ```

2. **Range Validation**:
   ```javascript
   if (value <= 0) {
       // IF value is zero or negative
       errors.push('Must be greater than 0');
       isValid = false;
   } else {
       // ELSE value is positive
   }
   ```

3. **Step Navigation**:
   ```javascript
   if (isValid) {
       // IF validation passes
       proceedToNextStep();
   } else {
       // ELSE show errors and block navigation
       displayValidationErrors();
   }
   ```

## Running the Demos

1. Start a local server:
   ```bash
   cd agrox
   python -m http.server 8000
   ```

2. Open in browser:
   - Main form demo: `http://localhost:8000/demo-multi-step.html`
   - Conditional logic demo: `http://localhost:8000/demo-conditionals.html`

3. Test different scenarios:
   - Try leaving required fields empty
   - Enter invalid data (negative numbers, etc.)
   - Complete forms partially
   - Use browser console to see validation logic execution

## Educational Value

These demos illustrate:
- **Progressive Enhancement**: Form validates step-by-step
- **User Experience**: Clear feedback prevents frustration
- **Data Integrity**: Validation ensures quality submissions
- **Conditional Logic**: Real-world if/else statement usage
- **Error Handling**: Graceful failure with helpful messages

## Integration

The demo logic is identical to the production code in:
- `js/farmer-dashboard.js` - Main dashboard functionality
- `css/marketplace.css` - Form styling
- `farmer-dashboard.html` - Form HTML structure

Use these demos to understand how the conditional validation works before implementing similar logic in other forms.</content>
<parameter name="filePath">c:\Users\HP\Desktop\agrox\agrox\DEMO_README.md