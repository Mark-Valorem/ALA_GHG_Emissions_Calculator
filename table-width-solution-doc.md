# ALA GHG Calculator - Table Width Solution Documentation

## Current Situation (July 2025)

### The Problem
The monthly data entry table has become too wide to display properly on screen or print effectively. With 11 fuel type columns plus totals, the table extends beyond typical screen widths and creates significant usability issues:

- **Screen Display**: Horizontal scrolling required, making data entry cumbersome
- **Print Output**: Table gets cut off, making printed reports useless for audit trails
- **User Experience**: Difficult to see all data at once, increasing error risk
- **Mobile/Tablet**: Virtually unusable on smaller screens

### Root Cause
The table currently displays all emission sources in a single row per month:
- 3 columns for Scope 1 Stationary (Natural Gas, Diesel-Generators, Waste Oil)
- 3 columns for Scope 1 Mobile (Diesel-Vehicles, Petrol, LPG)
- 3 columns for Scope 1 Other (Refrigerant, CO2 Fire, Welding Gas)
- 2 columns for Scope 2 (Electricity, Steam/Heat)
- Plus Month column and Total column = 13 columns total

## Chosen Solution: Hybrid Approach

After evaluating multiple options, we've selected a hybrid approach that combines:
1. **Split tables by scope** for better screen usability
2. **Optimized print layout** for professional reporting

### Why This Solution?
- Maintains data entry ease on all devices
- Provides comprehensive printed reports for auditing
- Aligns with how emissions are actually reported (by scope)
- Allows future enhancements without major restructuring

## Implementation Plan

### Phase 1: Restructure Data Entry Tables

#### Step 1.1: Create Separate Scope 1 Table
```
Monthly Scope 1 Emissions (Direct)
- Natural Gas (m³)
- Diesel - Generators (L)
- Waste Oil (L)
- Diesel - Vehicles (L)
- Petrol (L)
- LPG - Forklifts (L)
- Refrigerant (kg)
- CO₂ Fire Systems (kg)
- Welding Gas (kg CO₂)
- Scope 1 Subtotal (t CO₂e)
```

#### Step 1.2: Create Separate Scope 2 Table
```
Monthly Scope 2 Emissions (Indirect)
- Electricity (kWh)
- Steam/Heat (GJ)
- Scope 2 Subtotal (t CO₂e)
```

#### Step 1.3: Create Summary Table
```
Monthly Emissions Summary
- Month
- Scope 1 Total (t CO₂e)
- Scope 2 Total (t CO₂e)
- Total Emissions (t CO₂e)
```

### Phase 2: Update JavaScript Calculation Logic

#### Step 2.1: Modify Data Storage Structure
```javascript
// Current structure:
monthlyData = [{
    month: 'July',
    naturalGas: 0,
    dieselGenerators: 0,
    // ... all fuels in one object
}]

// New structure:
monthlyData = [{
    month: 'July',
    scope1: {
        stationary: {
            naturalGas: 0,
            dieselGenerators: 0,
            wasteOil: 0
        },
        mobile: {
            dieselVehicles: 0,
            petrol: 0,
            lpg: 0
        },
        other: {
            refrigerant: 0,
            co2Fire: 0,
            weldingGas: 0
        },
        total: 0
    },
    scope2: {
        electricity: 0,
        steamHeat: 0,
        total: 0
    },
    totalEmissions: 0
}]
```

#### Step 2.2: Update Calculation Functions
- Modify `handleDataInput()` to work with nested structure
- Update `calculateEmissions()` to calculate subtotals for each scope
- Ensure all chart generation functions use the new data structure

### Phase 3: Implement Print-Specific Layout

#### Step 3.1: Create Print CSS Classes
```css
@media print {
    /* Hide screen-only elements */
    .screen-only { display: none !important; }
    
    /* Show print-only elements */
    .print-only { display: block !important; }
    
    /* Landscape orientation for data tables */
    @page {
        size: A4 landscape;
        margin: 10mm;
    }
    
    /* Consolidated table for printing */
    .print-consolidated-table {
        font-size: 7pt;
        width: 100%;
    }
}
```

#### Step 3.2: Generate Print-Optimized Table
Create a hidden consolidated table that only appears when printing:
- Combines all fuel types in a single view
- Uses smaller fonts and tighter spacing
- Optimized for A4 landscape format
- Includes page headers and footers

### Phase 4: Enhance User Interface

#### Step 4.1: Add View Toggle
```html
<div class="view-controls">
    <button onclick="showDetailedView()">Detailed View</button>
    <button onclick="showSummaryView()">Summary View</button>
    <button onclick="showPrintPreview()">Print Preview</button>
</div>
```

#### Step 4.2: Implement Responsive Tabs for Mobile
For screens under 768px width:
- Convert scope tables to tabs
- One fuel type visible at a time
- Swipe navigation between fuel types

### Phase 5: Update Related Features

#### Step 5.1: Modify Data Validation
- Update validation to check data across split tables
- Ensure validation messages appear in correct table section

#### Step 5.2: Update CSV Export
- Maintain current CSV structure for backwards compatibility
- Add option for "detailed export" with scope groupings

#### Step 5.3: Update Charts
- Ensure all charts pull from new data structure
- Add scope-specific mini charts above each table

## Specific Implementation Steps

### Day 1: Backend Changes
1. Create new data structure in JavaScript
2. Write migration function to convert existing data
3. Update all calculation functions
4. Test calculations with sample data

### Day 2: Frontend Table Restructuring
1. Create new HTML structure with three tables
2. Update table generation functions
3. Implement subtotal calculations
4. Style tables with proper Scope 1/2 coloring

### Day 3: Print Layout
1. Create print-specific CSS rules
2. Build consolidated print table (hidden on screen)
3. Test printing on various browsers
4. Optimize for A4 landscape format

### Day 4: User Interface Enhancements
1. Add view toggle buttons
2. Implement mobile-responsive design
3. Create smooth transitions between views
4. Add helpful tooltips for new layout

### Day 5: Testing and Polish
1. Comprehensive testing across devices
2. Validate calculations match previous version
3. User acceptance testing with sample data
4. Fix any identified issues
5. Fix duplicate footer issue: When Executive Summary is generated, hide the main footer at bottom of page to prevent duplication

## Migration Considerations

### For Existing Users
- Auto-detect if user has data in old format
- Provide one-time migration when detected
- Show notification explaining new layout
- Offer "Classic View" toggle for first month

### Data Integrity
- All calculations must produce identical results
- CSV exports must maintain same structure
- Print reports should include all same information

## Success Criteria

The implementation will be considered successful when:
1. ✓ Tables fit on standard screens without horizontal scrolling
2. ✓ Print output captures all data on A4 landscape
3. ✓ Mobile users can easily enter data
4. ✓ Calculations remain accurate and match NGER methodology
5. ✓ User feedback indicates improved usability

## Future Enhancements

Once the split table structure is implemented, these become possible:
- Collapse/expand individual scopes
- Fuel type grouping customization
- Quick entry mode for common scenarios
- Comparative views (month-over-month, year-over-year)

## Notes for Developers

- Maintain backward compatibility where possible
- Document all calculation changes
- Preserve existing emission factors
- Keep accessibility features (ARIA labels, keyboard navigation)
- Test thoroughly on ALA's supported browsers
- **Footer Display Logic**: Add conditional hiding of the main page footer when Executive Summary is visible:
  ```javascript
  // In generateExecutiveSummary() function
  document.getElementById('executiveSummary').style.display = 'block';
  document.getElementById('mainFooter').style.display = 'none'; // Hide main footer to prevent duplication
  ```
  Ensure the main footer has id="mainFooter" for this to work properly

---

*Last Updated: July 2025*
*Version: 2.2 - Table Width Solution*