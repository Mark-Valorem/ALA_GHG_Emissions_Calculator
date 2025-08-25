ALA GHG Calculator - Table Width Solution Documentation
Current Situation (July 2025)
The Problem
The monthly data entry table has become too wide to display properly on screen or print effectively. With 11 fuel type columns plus totals, the table extends beyond typical screen widths and creates significant usability issues:

Screen Display: Horizontal scrolling required, making data entry cumbersome

Print Output: Table gets cut off, making printed reports useless for audit trails

User Experience: Difficult to see all data at once, increasing error risk

Mobile/Tablet: Virtually unusable on smaller screens

Root Cause
The table currently displays all emission sources in a single row per month:

3 columns for Scope 1 Stationary (Natural Gas, Diesel-Generators, Waste Oil)

3 columns for Scope 1 Mobile (Diesel-Vehicles, Petrol, LPG)

3 columns for Scope 1 Other (Refrigerant, CO2 Fire, Welding Gas)

2 columns for Scope 2 (Electricity, Steam/Heat)

Plus Month column and Total column = 13 columns total

Chosen Solution: Hybrid Approach
After evaluating multiple options, we've selected a hybrid approach that combines:

Split tables by scope for better screen usability

Optimized print layout for professional reporting

Why This Solution?
Maintains data entry ease on all devices

Provides comprehensive printed reports for auditing

Aligns with how emissions are actually reported (by scope)

Allows future enhancements without major restructuring

Implementation Plan
Phase 1: Restructure Data Entry Tables
Step 1.1: Create Separate Scope 1 Table
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

Step 1.2: Create Separate Scope 2 Table
Monthly Scope 2 Emissions (Indirect)
- Electricity (kWh)
- Steam/Heat (GJ)
- Scope 2 Subtotal (t CO₂e)

Step 1.3: Create Summary Table
Monthly Emissions Summary
- Month
- Scope 1 Total (t CO₂e)
- Scope 2 Total (t CO₂e)
- Total Emissions (t CO₂e)

Phase 2: Update JavaScript Calculation Logic
Step 2.1: Modify Data Storage Structure
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

Step 2.2: Update Calculation Functions
Modify handleDataInput() to work with nested structure

Update calculateEmissions() to calculate subtotals for each scope

Ensure all chart generation functions use the new data structure

Phase 3: Implement Print-Specific Layout
Step 3.1: Create Print CSS Classes
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

Step 3.2: Generate Print-Optimized Table
Create a hidden consolidated table that only appears when printing:

Combines all fuel types in a single view

Uses smaller fonts and tighter spacing

Optimized for A4 landscape format

Includes page headers and footers

Phase 4: Enhance User Interface
Step 4.1: Add View Toggle
<div class="view-controls">
    <button onclick="showDetailedView()">Detailed View</button>
    <button onclick="showSummaryView()">Summary View</button>
    <button onclick="showPrintPreview()">Print Preview</button>
</div>

Step 4.2: Implement Responsive Tabs for Mobile
For screens under 768px width:

Convert scope tables to tabs

One fuel type visible at a time

Swipe navigation between fuel types

Phase 5: Update Related Features
Step 5.1: Modify Data Validation
Update validation to check data across split tables

Ensure validation messages appear in correct table section

Step 5.2: Update CSV Export
Maintain current CSV structure for backwards compatibility

Add option for "detailed export" with scope groupings

Step 5.3: Update Charts
Ensure all charts pull from new data structure

Add scope-specific mini charts above each table

Specific Implementation Steps
Day 1: Backend Changes
Create new data structure in JavaScript

Write migration function to convert existing data

Update all calculation functions

Test calculations with sample data

Day 2: Frontend Table Restructuring
Create new HTML structure with three tables

Update table generation functions

Implement subtotal calculations

Style tables with proper Scope 1/2 coloring

Day 3: Print Layout
Create print-specific CSS rules

Build consolidated print table (hidden on screen)

Test printing on various browsers

Optimize for A4 landscape format

Day 4: User Interface Enhancements
Add view toggle buttons

Implement mobile-responsive design

Create smooth transitions between views

Add helpful tooltips for new layout

Day 5: Testing and Polish
Comprehensive testing across devices

Validate calculations match previous version

User acceptance testing with sample data

Fix any identified issues

Fix duplicate footer issue: When Executive Summary is generated, hide the main footer at bottom of page to prevent duplication

Migration Considerations
For Existing Users
Auto-detect if user has data in old format

Provide one-time migration when detected

Show notification explaining new layout

Offer "Classic View" toggle for first month

Data Integrity
All calculations must produce identical results

CSV exports must maintain same structure

Print reports should include all same information

Success Criteria
The implementation will be considered successful when:

✓ Tables fit on standard screens without horizontal scrolling

✓ Print output captures all data on A4 landscape

✓ Mobile users can easily enter data

✓ Calculations remain accurate and match NGER methodology

✓ User feedback indicates improved usability

Future Enhancements
Once the split table structure is implemented, these become possible:

Collapse/expand individual scopes

Fuel type grouping customization

Quick entry mode for common scenarios

Comparative views (month-over-month, year-over-year)

Notes for Developers
Maintain backward compatibility where possible

Document all calculation changes

Preserve existing emission factors

Keep accessibility features (ARIA labels, keyboard navigation)

Test thoroughly on ALA's supported browsers

Footer Display Logic: Add conditional hiding of the main page footer when Executive Summary is visible:

// In generateExecutiveSummary() function
document.getElementById('executiveSummary').style.display = 'block';
document.getElementById('mainFooter').style.display = 'none'; // Hide main footer to prevent duplication

Ensure the main footer has id="mainFooter" for this to work properly

Comprehensive Feature Documentation (from ala-ghg-calculator-v2.html)
To ensure no functionality is lost during future transformations, the following features and their implementation details from ala-ghg-calculator-v2.html must be preserved and accounted for:

1. Information Pop-ups (Tooltips & Modals)
The calculator utilizes interactive "i" icons (.info-icon) to display contextual information in pop-up modals. This system is driven by a JavaScript infoContent object and functions showInfoPopup(infoType) and closeInfoPopup().

HTML Structure:

span elements with class info-icon and data-info attribute (e.g., <span class="info-icon" data-info="natural-gas">i</span>).

A hidden modal structure (.info-popup and .popup-overlay) with id="infoPopup" and id="popupOverlay".

CSS Styling:

.info-icon: Styles for the circular 'i' icon.

.info-popup, .popup-overlay: Styles for the modal and its background overlay, including position: fixed, z-index, transform, background-color, border-radius, box-shadow.

.info-popup.active, .popup-overlay.active: Classes to control visibility (display: block).

JavaScript Logic:

infoContent object: Stores title and content for each data-info key.

showInfoPopup(infoType): Retrieves content from infoContent and displays the modal.

closeInfoPopup(): Hides the modal and overlay.

Event listeners are attached to all .info-icon elements on DOMContentLoaded.

Preservation Note: When restructuring tables or adding new input fields, ensure that relevant info-icon elements are included with appropriate data-info attributes, and that the infoContent object is updated with corresponding information. The core JavaScript functions and CSS should remain intact.

2. Facility Information Section
This section captures essential details about the facility and reporting period.

Key Inputs:

Facility Name (#facilityName): Text input.

Location (State/Territory) (#state): Select dropdown for electricity emission factor.

Reporting Period (#reportingPeriod): Select dropdown (calendar, financial, custom).

Reporting Year (#reportingYear): Select dropdown.

Custom Period Dates (#customPeriodDates): Hidden div with Start Date (#customStartDate) and End Date (#customEndDate) date inputs, shown conditionally based on reportingPeriod selection.

JavaScript Interaction:

reportingPeriod change listener: Toggles visibility of customPeriodDates.

state change listener: Triggers updateCalculations to apply correct electricity factors.

Preservation Note: Maintain the IDs and event listeners for these elements. The logic for customPeriodDates visibility and state-based calculations is crucial.

3. Production Metrics (Optional) Section
An optional section to input annual production for calculating emissions intensity.

Key Inputs/Outputs:

Total Annual Production (#annualProduction): Number input in tonnes.

Emissions Intensity (#emissionsIntensity): Display-only field for calculated kg CO₂e/tonne.

JavaScript Interaction:

annualProduction input listener: Triggers updateEmissionsIntensity.

updateEmissionsIntensity(): Calculates and displays the intensity based on total emissions and production.

Preservation Note: Ensure the input field (#annualProduction) and display element (#emissionsIntensity) are present, and the updateEmissionsIntensity function correctly references the total emissions calculation.

4. Contact Information Section
Captures details of the person preparing the report.

Key Inputs:

Prepared By (Name) (#preparedBy): Text input.

Title/Position (#preparerTitle): Text input.

Email (#preparerEmail): Email input.

Phone (#preparerPhone): Tel input.

Date Prepared (#datePrepared - hidden date input, #dateDisplay - visible text input): Custom date picker.

Department/Division (#department): Text input.

JavaScript Interaction:

setDefaultDate(): Sets current date on load.

updateDateDisplay(): Formats and displays the date from the hidden input.

datePrepared change listener: Calls updateDateDisplay.

dateDisplay click handler: Triggers the hidden date input's picker.

Preservation Note: The dual input approach for dates (#datePrepared and #dateDisplay) and their associated JavaScript functions (setDefaultDate, updateDateDisplay) must be retained for the custom date picker functionality.

5. Monthly Activity Data Table
This is the core data entry table. The solution focuses on splitting this, but its current structure and features must be understood.

Structure: Single table with id="monthlyDataBody" for rows and id="monthlyTotal" for annual totals.

Input Cells: Each data entry cell is an <input type="number"> with class="input-cell", data-month, and data-fuel attributes.

Calculated Cells: Monthly and annual totals are displayed in <span> elements (e.g., id="monthlyTotal-January").

Tab Navigation: tabindex attributes are dynamically assigned to inputs to enable column-wise navigation.

Validation:

validationStatus and validationMessage divs for displaying validation results.

validation-warning and validation-error CSS classes for input styling.

Buttons: Validate Data (#validateData) and Clear All Data (#clearData).

JavaScript Logic:

generateMonthlyTable(): Populates the table rows and monthlyData array.

handleDataInput(input): Updates monthlyData and triggers updateCalculations.

validateInput(input): Applies visual validation (warning/error classes) to individual inputs.

validateAllData(): Performs comprehensive validation checks and updates validationStatus.

clearAllData(): Resets all input fields, calculated values, and charts.

Preservation Note: The split table solution must replicate the input field structure (data-month, data-fuel, tabindex), retain the monthlyData array structure (or adapt it as per Phase 2.1), and ensure handleDataInput, validateInput, validateAllData, and clearAllData functions are updated to work with the new table structure. The validationStatus display must also be maintained.

6. Emission Reduction Initiatives Section
Allows users to track sustainability efforts and their estimated impact.

Key Inputs:

Renewable Energy & Offsets: Solar Generation (#solarGeneration), Green Power Purchase (#greenPowerPercent), Renewable Energy Certificates (RECs) (#recsQuantity), Carbon Offsets (#carbonOffsets).

Material & Process Efficiency: Re-refined Base Oil Usage (#rerefinedOilPercent), Electric Forklifts (#electricForklifts), Energy Efficiency Projects (#efficiencySavings), Waste Heat Recovery (#wasteHeatRecovery).

Additional Sustainability Notes (#sustainabilityNotes): Textarea for free-form notes.

Calculated Outputs: Estimated Emission Reductions (#renewableReduction, #efficiencyReduction, #totalReduction) and Net Emissions (#netEmissions).

JavaScript Interaction:

Input listeners on all relevant fields trigger updateReductions().

updateReductions(): Calculates and displays estimated reductions and net emissions.

Preservation Note: All input fields and their IDs, along with the updateReductions function, are critical for this section's functionality. The calculated reduction displays must also be maintained.

7. Annual Emissions Summary Section
Displays calculated annual totals and charts.

Summary Cards:

Scope 1 Emissions (#scope1Total)

Scope 2 Emissions (#scope2Total)

Total Emissions (#totalEmissionsSum)

Net Emissions (After Reductions & Offsets) (#netEmissions)

Charts:

Emissions by Source (#emissionsBySourceChart): Pie chart.

Emissions by Scope (#scopeBreakdownChart): Doughnut chart.

Monthly Emissions Trend (#monthlyTrendChart): Line chart.

Chart placeholders (#sourceChartPlaceholder, etc.) displayed when no data or Chart.js is unavailable.

Detailed Breakdown Table: id="detailedBreakdown" table showing consumption, energy content, and emissions per source.

JavaScript Interaction:

updateCharts(): Orchestrates updates for all three charts.

updateEmissionsBySourceChart(), updateScopeBreakdownChart(), updateMonthlyTrendChart(): Functions to render/update Chart.js instances.

updateDetailedBreakdown(): Populates the detailed breakdown table.

checkChartsAvailability(): Verifies Chart.js loading and toggles chart visibility/placeholders.

Preservation Note: The IDs for all summary display elements and chart canvases are essential. The updateCharts and related functions, along with the window.emissionsData object, must be adapted to the new data structure. The detailed breakdown table population logic also needs to be updated.

8. Executive Summary (Print-friendly) Section
A hidden section designed for printing, which consolidates key information.

HTML Structure: section with id="executiveSummary" and style="display: none;" initially.

Content: Summarizes facility, period, total emissions, intensity, primary source, key findings, and contact info. Includes a print-only footer.

JavaScript Logic:

generateExecutiveSummary(): Populates the summary fields and makes the section visible. It also includes the Footer Display Logic to hide the main page footer.

Preservation Note: This section's HTML structure and the generateExecutiveSummary() function are critical for print functionality. Ensure the IDs used for populating data (summaryFacility, summaryTotal, etc.) are correctly mapped. The conditional footer display logic must be maintained.

9. NGER Emission Factors Reference Section
A collapsible section providing reference data for emission factors.

HTML Structure: button with class="collapsible" and a div with class="collapsible-content".

Content: Tables for Energy Content Factors, Emission Factors, and State Electricity Emission Factors.

JavaScript Interaction:

populateStateFactorsTable(): Dynamically populates the electricity factors table.

Event listener on .collapsible elements to toggle active class and content visibility.

Preservation Note: The collapsible behavior and the populateStateFactorsTable() function are key. The hardcoded emission factors in EMISSION_FACTORS JavaScript object must be preserved.

10. Actions Section
Contains primary action buttons for the calculator.

Buttons:

Calculate Emissions (#calculateEmissions)

Generate Executive Summary (#generateSummary)

Print Report (#printReport)

Export to CSV (#exportData)

Return to ALA Website (standard <a> tag)

JavaScript Interaction: Each button triggers its respective function (calculateEmissions(), generateExecutiveSummary(), printReport(), exportToCSV()).

Preservation Note: Ensure all these buttons and their associated event listeners and functions are present and correctly linked.

11. General UI/UX and Styling
Tailwind CSS: Loaded via CDN.

Custom CSS: Defined in the <style> block for:

Input spinners removal.

Font family (Inter).

Scope colors (.scope1-bg, .scope2-bg, etc.).

Input cell styling (.input-cell).

Validation styles (.validation-warning, .validation-error).

Info icon and popup styles.

Calculated cell styling (.calculated-cell).

Tooltip styles (.tooltip).

Chart container styles.

Collapsible section styles.

Executive summary styling.

Sustainability initiative styling.

Print-Specific CSS (@media print): Crucial for report generation, including:

Page size (A4), margins.

Font size adjustments.

page-break-before, page-break-inside for sections and table rows.

Hiding screen-only elements (.no-print, buttons, info icons, tooltips).

Making input fields look like plain text.

Formatting tables and charts for print.

Specific adjustments for the monthly data table (#monthlyDataBody) to fit.

Displaying the print-footer.

JavaScript Utility Functions: formatNumber(), hasAnyData().

Global Variables: EMISSION_FACTORS, validationThresholds, MONTHS_CALENDAR, MONTHS_FINANCIAL.

Preservation Note: The Tailwind CSS CDN link and all custom CSS rules (especially the @media print block) are vital for the calculator's appearance and print functionality. All JavaScript utility functions and global constants must be retained.

By meticulously accounting for these features, any future modifications or refactoring for table width solutions can be performed without inadvertently removing or corrupting existing, critical functionalities.

Last Updated: July 2025
Version: 2.2 - Table Width Solution (Enhanced Documentation)