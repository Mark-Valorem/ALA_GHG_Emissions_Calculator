# Australian Lubricant Association GHG Emissions Calculator - Next Steps

## Project Enhancement Roadmap

This document outlines the implementation plan for enhancing the ALA GHG Emissions Calculator with seven key features identified from the UEIL PCF Calculation Tool analysis. Each enhancement is designed to improve the tool's functionality, user experience, and alignment with industry best practices while maintaining compliance with NGER methodologies.

## 1. Production Normalisation Feature

### Overview
The production normalisation feature will enable facilities to understand their emissions intensity by relating total emissions to production output. This provides a crucial efficiency metric that allows for meaningful comparisons across different time periods and facilities of varying sizes.

### Implementation Details

The implementation requires adding new input fields in the facility information section for annual production volume, measured in tonnes of lubricant produced. The calculation engine will then compute emissions intensity metrics automatically, dividing total emissions by production volume to yield kg CO2e per tonne of product.

In the web application, create a new section titled "Production Metrics" positioned after the facility information but before the monthly data input. This section should include an input field for "Total Annual Production (tonnes)" with validation to ensure positive numeric values only. The results summary should then display both absolute emissions (tonnes CO2e) and normalised emissions (kg CO2e per tonne of product) side by side.

For the Excel version, add a clearly labelled cell in the facility information worksheet for production volume input. Create calculated cells in the summary worksheet that automatically compute the intensity metrics. Include conditional formatting to highlight when production data hasn't been entered, prompting users to complete this optional but valuable field.

### User Benefits
This feature enables facilities to track efficiency improvements over time, even as production volumes change. It provides a standardised metric for benchmarking against industry peers and helps identify opportunities for process optimisation. The normalised data also supports more meaningful year-on-year comparisons and goal setting.

## 2. Flexible Time Period Options

### Overview
Different organisations operate on various reporting cycles, and this enhancement accommodates both calendar year and financial year reporting preferences. The flexibility ensures the tool meets diverse organisational needs while maintaining data integrity and calculation accuracy.

### Implementation Details

The system will offer three primary time period options: calendar year (January to December), Australian financial year (July to June), and custom period for partial year calculations. The monthly data structure remains unchanged, but the presentation and calculation logic adapts based on the selected period.

In the web application, implement a dropdown selector in the facility information section with the three period options. When financial year is selected, reorder the monthly columns to display July through June sequentially. For custom periods, enable date pickers for start and end dates, automatically greying out months outside the selected range. The calculation engine should sum only the active months when computing annual totals.

The Excel implementation requires a more structured approach. Create separate input templates for calendar and financial year formats, with clear labelling and instructions. For custom periods, include start and end date cells with data validation, and use conditional formatting to visually indicate which months are included in the calculations. Formulas should use SUMIF or similar functions to calculate totals based on the selected period.

### Technical Considerations
Ensure all emission factor applications remain accurate regardless of the selected time period. Monthly factors don't change, but annual summaries must correctly reflect the chosen reporting period. Include clear labelling throughout to prevent confusion about which time period is being reported.

## 3. Data Source Documentation

### Overview
Transparency in emission factor sources builds trust and supports verification processes. This enhancement creates a comprehensive reference system documenting all emission factors used in calculations, their sources, and validity periods.

### Implementation Details

Create a dedicated reference section that clearly identifies the NGER Determination version and National Greenhouse Accounts Factors document used for all calculations. Include publication dates and effective periods for each factor set. This information should be easily accessible but not interfere with the primary data entry workflow.

For the web application, implement an "Emission Factors Reference" page accessible via a prominent button or link. This page should display a table listing each emission factor used, its value, unit, source document, and last updated date. Include direct links to the official government publications where possible. Consider adding a notification system that alerts users when new NGER determinations are published.

In Excel, create a dedicated "NGER Factors" worksheet containing all emission factors in a structured table format. Include cells for version numbers, publication dates, and source URLs. Use named ranges for all factors to ensure formula transparency. Add a summary box on the main dashboard indicating which factor versions are currently in use.

### Maintenance Strategy
Design the system to facilitate easy updates when new emission factors are released. In the web application, store factors in a configuration file or database table that can be updated without modifying core code. For Excel, use a clear update procedure with version control considerations. Include instructions for users on how to verify they're using the latest factors.

## 4. Enhanced Categorisation of Fuel Use

### Overview
Different fuel uses within a facility may have varying emission characteristics and reduction opportunities. This enhancement provides granular tracking of fuel consumption by specific use category, enabling more targeted emissions management strategies.

### Implementation Details

Expand the current fuel input categories to include subcategories for mobile combustion sources. Instead of a single "diesel" field, provide separate fields for diesel used in forklifts, diesel for delivery vehicles, and diesel for backup generators. Similarly, separate LPG used for different purposes. This granularity helps facilities identify specific areas for improvement.

In the web application, implement collapsible sections for each major fuel type. Under "Diesel Fuel", create subsections for different uses with individual monthly input fields. Include an "Other" category with a text field for description to capture unusual use cases. Ensure the calculation engine sums subcategories correctly while maintaining the ability to view breakdowns in results.

For Excel, expand the input rows to accommodate subcategories. Use indentation and cell formatting to clearly show the hierarchical relationship between main categories and subcategories. Implement subtotal rows that automatically sum subcategories, with these subtotals feeding into the main emissions calculations. Include data validation to prevent double-counting.

### Reporting Benefits
The enhanced categorisation enables facilities to generate more detailed reports showing emissions by specific activity. This supports targeted reduction strategies, such as electrifying forklifts or optimising delivery routes. The granular data also helps in preparing for potential future reporting requirements that may demand activity-level detail.

## 5. Visual Scope Separation

### Overview
Clear visual distinction between Scope 1 and Scope 2 emissions improves understanding and reduces reporting errors. This enhancement uses design elements to create intuitive scope separation throughout the tool.

### Implementation Details

Implement a consistent colour scheme across all interfaces: green for Scope 1 (direct emissions), blue for Scope 2 (electricity), and grey for totals. This colour coding should appear in input sections, calculation displays, and all visualisations.

In the web application, apply background colours to input sections corresponding to their scope. Use CSS classes to maintain consistency and enable easy theme updates. In results displays, use coloured bars or badges to indicate scope. Implement interactive tooltips that appear on hover, explaining what each scope includes with facility-specific examples.

For charts and graphs, maintain the colour scheme in all visualisations. Pie charts should use the designated colours for scope segments. Bar charts comparing monthly emissions should stack Scope 1 and 2 with their respective colours. Include a persistent legend explaining the colour coding.

The Excel implementation requires careful use of cell formatting. Apply subtle background shading to input cells based on scope. Use conditional formatting in summary sections to automatically apply scope colours. Create a colour key on each worksheet explaining the scheme. Consider using cell borders or section dividers to further separate scopes visually.

### Accessibility Considerations
Ensure colour choices meet WCAG contrast requirements for readability. Don't rely solely on colour to convey information; include text labels and patterns for colour-blind users. In Excel, use patterns in addition to colours for fill effects.

## 6. Validation Prompts

### Overview
Data quality directly impacts calculation accuracy. This enhancement implements intelligent validation that helps users identify and correct potential data entry errors while maintaining a smooth user experience.

### Implementation Details

Develop a multi-tier validation system that checks data reasonableness without being overly restrictive. Set reasonable ranges for each input type based on typical facility operations. For example, monthly electricity usage above 1,000,000 kWh might trigger a confirmation prompt for most lubricant blending facilities.

In the web application, implement real-time validation as users enter data. Use subtle visual indicators like yellow highlights for values requiring confirmation, and red for clear errors. When a value falls outside expected ranges, display a non-blocking message asking users to verify the entry. For zero values in typically non-zero fields, prompt users to confirm this is intentional, not an oversight.

Create facility-size profiles (small, medium, large) that adjust validation ranges appropriately. Allow users to dismiss warnings if they confirm unusual values are correct. Log these confirmations for audit trails. Implement cross-field validation, such as flagging if electricity usage drops to zero while production continues.

For Excel, use data validation rules with custom error messages. Implement a separate validation dashboard that runs comprehensive checks across all data and displays results in a summary table. Use conditional formatting to highlight potential issues directly in input cells. Create a "Validation Report" that users can generate before finalising their calculations.

### Validation Rules Examples
Monthly electricity usage should typically fall between 100 kWh and 1,000,000 kWh. Natural gas consumption showing more than 50% variation from the monthly average triggers a verification prompt. Total annual emissions varying by more than 30% from the previous year (if available) generates an alert with request for explanation. Zero values in any field that had non-zero values in previous months prompt confirmation.

## 7. Executive Summary Enhancement

### Overview
A well-designed executive summary transforms raw data into actionable insights. This enhancement creates a comprehensive one-page overview that communicates key findings to stakeholders at all levels.

### Implementation Details

Design a visually appealing summary page that captures essential information at a glance. Include facility identification, reporting period, total emissions by scope, emissions intensity (if production data provided), and primary emission sources ranked by contribution.

For the web application, create a dedicated "Executive Summary" view accessible via a prominent button. Use a responsive grid layout that adapts to different screen sizes. Include a high-level emissions breakdown pie chart showing percentage contributions by source. Add a trend indicator showing whether emissions increased or decreased compared to the previous period (if data available).

Implement data visualisation best practices: use clear, readable fonts, maintain consistent colour coding aligned with the scope separation scheme, and include contextual information such as facility size or production volume. Add an export function that generates a PDF version maintaining all formatting and visualisations.

The Excel executive summary should occupy a single printed page when exported to PDF. Use Excel's charting capabilities to create a pie chart of emissions by source and a column chart showing Scope 1 vs Scope 2 totals. Include conditional formatting that automatically highlights the top three emission sources. Design the layout to work well both on screen and when printed.

### Key Metrics to Display
Total annual emissions (tonnes CO2e) with scope breakdown, emissions intensity (kg CO2e per tonne product) if applicable, percentage change from previous year with trend arrow, top three emission sources with percentages, monthly emission trends visualisation, and facility details including location and reporting period. Include a notes section for contextual information about significant changes or unusual circumstances.

## Implementation Priority and Timeline

These enhancements should be implemented in phases to ensure quality and maintain tool stability. Phase 1 (Months 1-2) should focus on the Production Normalisation Feature and Flexible Time Period Options, as these provide immediate value with minimal complexity. Phase 2 (Months 2-3) should implement Data Source Documentation and Visual Scope Separation to improve transparency and usability. Phase 3 (Months 3-4) should add Enhanced Categorisation of Fuel Use and Validation Prompts to increase data quality and granularity. Phase 4 (Month 4) should culminate with the Executive Summary Enhancement, leveraging all previous improvements.

## Success Metrics

Track implementation success through user adoption rates, data completion rates, reduction in support queries, and positive feedback on new features. Monitor whether facilities using the enhanced features show improved emissions tracking and reduction outcomes over time. Regular review and iteration based on user feedback will ensure the tool continues to meet evolving needs of the Australian lubricant industry.