# Australian Lubricant Association GHG Emissions Calculator
## User Guide - Version 2.1

### Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [New Features in Version 2.1](#new-features)
4. [Entering Monthly Energy Data](#entering-monthly-data)
5. [Emission Reduction Initiatives](#emission-reduction-initiatives)
6. [Understanding Your Results](#understanding-results)
7. [Printing and Exporting](#printing-exporting)
8. [Troubleshooting](#troubleshooting)

---

## Overview {#overview}

The ALA GHG Emissions Calculator is a comprehensive tool designed specifically for Australian lubricant blending facilities to track and report their Scope 1 and Scope 2 greenhouse gas emissions. This calculator aligns with the Australian National Greenhouse and Energy Reporting (NGER) methodology and uses official emission factors from the National Greenhouse Accounts Factors 2024.

### Key Capabilities
- Track monthly energy consumption across multiple fuel types
- Calculate Scope 1 (direct) and Scope 2 (indirect) emissions
- Monitor emission reduction initiatives and their impact
- Generate professional reports for internal and external stakeholders
- Calculate emissions intensity per tonne of product

---

## Getting Started {#getting-started}

### Initial Setup

When you first open the calculator, you'll need to enter basic facility information:

1. **Facility Name**: Enter your facility's official name as it appears on regulatory documents
2. **Location (State/Territory)**: Select your state or territory - this is crucial as it determines the electricity emission factor used in calculations
3. **Reporting Period**: Choose between:
   - Calendar Year (January to December)
   - Financial Year (July to June)
   - Custom Period (specify your own dates)
4. **Reporting Year**: Select the year you're reporting for

### Contact Information

Complete the contact details for the person responsible for preparing the emissions report. This information appears on printed reports and ensures accountability.

### Production Metrics (Optional)

If you want to calculate emissions intensity, enter your facility's total annual lubricant production in tonnes. The calculator will automatically compute your emissions per tonne of product, which is valuable for benchmarking and tracking efficiency improvements over time.

---

## New Features in Version 2.1 {#new-features}

Version 2.1 introduces significant enhancements to provide more comprehensive emissions tracking:

### Expanded Scope 1 Sources

**Stationary Combustion**
- Natural Gas (m³)
- Diesel for Generators (L)
- **NEW**: Waste Oil burning for heat recovery (L)

**Mobile Combustion**
- Diesel for Vehicles (L)
- **NEW**: Petrol for light vehicles (L)
- LPG for Forklifts (L)

**Other Scope 1 Sources**
- **NEW**: Refrigerant Leakage (kg) - tracks high-GWP refrigerants like R134a
- **NEW**: CO₂ Fire Suppression Systems (kg) - monitors releases during testing/discharge
- **NEW**: Welding Gas (kg CO₂) - accounts for CO₂ used as shielding gas

### Enhanced Scope 2 Sources

- Electricity (kWh) - with state-specific emission factors
- **NEW**: Steam/Heat purchased from external sources (GJ)

### Emission Reduction Initiatives Tracking

A completely new section allows you to monitor and quantify the impact of your sustainability efforts:

**Renewable Energy & Offsets**
- Solar panel generation (kWh/year)
- Green power purchases (% of total electricity)
- Renewable Energy Certificates (RECs) in MWh
- Verified carbon offsets (t CO₂e)

**Material & Process Efficiency**
- Re-refined base oil usage (% of total base oil)
- Number of electric forklifts replacing diesel/LPG units
- Energy efficiency project savings (GJ/year)
- Waste heat recovery systems (GJ/year)

The calculator automatically calculates emission reductions from these initiatives and displays your net emissions after accounting for all reduction efforts.

---

## Entering Monthly Energy Data {#entering-monthly-data}

The monthly data entry table is the heart of the calculator. Here's how to use it effectively:

### Understanding the Table Layout

The table is organized by:
- **Rows**: Each month of your reporting period
- **Columns**: Different energy sources grouped by scope and category
- **Color Coding**: 
  - Light green cells indicate Scope 1 sources
  - Light blue cells indicate Scope 2 sources
  - Yellow cells are editable input fields

### Data Entry Tips

1. **Navigation**: Use the Tab key to move down columns rather than across rows. This makes it faster to enter all data for one fuel type before moving to the next.

2. **Data Sources**: Gather your data from:
   - Utility bills (electricity, natural gas)
   - Fuel delivery dockets or tank readings (diesel, petrol, LPG)
   - Maintenance records (refrigerant top-ups)
   - Service records (fire system tests, welding gas cylinders)

3. **Units Matter**: Pay careful attention to units:
   - Natural Gas: cubic metres (m³)
   - Liquid fuels: litres (L)
   - Refrigerants and gases: kilograms (kg)
   - Electricity: kilowatt-hours (kWh)
   - Steam/Heat: gigajoules (GJ)

4. **Zero Values**: Leave cells as zero if you don't use that fuel type. The calculator only displays sources with actual consumption in reports.

### Validation Features

The calculator includes built-in validation to help catch potential errors:
- **Yellow highlighting**: Values that seem unusually high
- **Validation messages**: Warnings about missing required data or unusual patterns
- **Range checking**: Alerts for values outside typical ranges

---

## Emission Reduction Initiatives {#emission-reduction-initiatives}

This new section helps you track and quantify the positive impact of your sustainability efforts.

### Solar Generation
Enter the total annual electricity generated by on-site solar panels. This reduces your net Scope 2 emissions by avoiding grid electricity consumption.

### Green Power Purchases
If you purchase accredited GreenPower or similar renewable electricity, enter the percentage of your total electricity consumption. This can significantly reduce your reported Scope 2 emissions.

### Renewable Energy Certificates (RECs)
Large-scale Generation Certificates (LGCs) or similar renewable energy certificates can be used to offset electricity emissions. Enter the quantity in MWh (1 REC = 1 MWh).

### Carbon Offsets
If you've purchased verified carbon offsets (such as Australian Carbon Credit Units), enter the total tonnes of CO₂e. These directly reduce your net emissions.

### Process Improvements

**Re-refined Base Oil**: While this primarily reduces Scope 3 emissions (not calculated here), tracking the percentage demonstrates your commitment to circular economy principles.

**Electric Forklifts**: Replacing diesel or LPG forklifts with electric models shifts emissions from Scope 1 to Scope 2, typically resulting in lower total emissions due to grid efficiency.

**Energy Efficiency Projects**: Enter the total annual energy savings from efficiency improvements like LED lighting, variable speed drives, or improved insulation.

**Waste Heat Recovery**: If you capture and reuse waste heat from processes, enter the annual energy recovered. This reduces primary energy consumption.

### Additional Notes
Use the text area to document other sustainability initiatives, energy management systems, or practices that may not fit the predefined categories but are important for your facility's emissions story.

---

## Understanding Your Results {#understanding-results}

### Annual Emissions Summary

The calculator provides multiple views of your emissions data:

1. **Scope Breakdown**
   - Scope 1 Total: All direct emissions from on-site fuel combustion and fugitive sources
   - Scope 2 Total: Indirect emissions from purchased electricity and steam/heat
   - Total Emissions: Combined Scope 1 + Scope 2

2. **Net Emissions**
   After accounting for renewable energy, efficiency savings, and carbon offsets, the calculator shows your net emissions - the actual climate impact after reduction efforts.

3. **Emissions Intensity**
   If you've entered production data, you'll see kg CO₂e per tonne of product. This metric is valuable for:
   - Benchmarking against industry standards
   - Tracking efficiency improvements over time
   - Setting science-based targets

### Visual Analytics

The calculator generates three types of charts to help visualize your emissions:

1. **Emissions by Source**: A pie chart showing which fuels contribute most to your total emissions. This helps identify priority areas for reduction efforts.

2. **Emissions by Scope**: A doughnut chart illustrating the proportion of direct (Scope 1) versus indirect (Scope 2) emissions.

3. **Monthly Trend**: A line graph tracking emissions throughout the year, useful for identifying seasonal patterns and the impact of reduction initiatives.

### Detailed Breakdown Table

This comprehensive table provides:
- Annual consumption for each energy source
- Energy content in gigajoules (GJ) for standardized comparison
- Emissions in tonnes CO₂e for each source
- Category classification (Stationary, Mobile, Fugitive, Process, Purchased)

---

## Printing and Exporting {#printing-exporting}

### Generating Reports

1. **Calculate Emissions**: Always click this button first to ensure all calculations are current
2. **Generate Executive Summary**: Creates a professional one-page summary ideal for management and stakeholders
3. **Print Report**: Produces a comprehensive report including all data, charts, and emission factors

### Print Layout Features

The print version is optimized for professional presentation:
- Clean, uncluttered layout with no input boxes showing
- Properly scaled charts and tables
- Page breaks in logical locations
- Complete emission factor reference included
- ALA branding and attribution

### Exporting Data

The **Export to CSV** function creates a spreadsheet containing:
- All monthly consumption data
- Annual totals by fuel type
- Emissions calculations
- Reduction initiatives and their impact
- Contact and facility information

This CSV file can be imported into Excel for further analysis or archived for record-keeping.

---

## Troubleshooting {#troubleshooting}

### Common Issues and Solutions

**Charts not displaying**
- Ensure you have data entered for at least one energy source
- Click "Calculate Emissions" to refresh calculations
- Check your browser supports modern JavaScript

**Print layout problems**
- Use Print Preview to check layout before printing
- Ensure your browser is set to print background colors
- Consider using "Save as PDF" for digital distribution

**Validation warnings**
- Review the flagged values against your source documents
- High values might indicate unit conversion errors (e.g., entering kL instead of L)
- Contact ALA if you consistently receive warnings for normal operations

### Data Accuracy Tips

1. **Consistency**: Use the same data sources each month for consistency
2. **Documentation**: Keep records of where each data point comes from
3. **Review**: Have a colleague review entries before finalizing
4. **Updates**: Check annually for updated NGER emission factors

### Getting Help

For technical support or questions about the calculator:
- Email: [ALA contact email]
- Visit: lubeassoc.com.au
- Reference: NGER Measurement Determination 2008 for methodology questions

---

## Appendix: Understanding Emission Factors

All emission factors used in this calculator are sourced from official Australian government publications:
- National Greenhouse Accounts Factors 2024
- NGER (Measurement) Determination 2008 (as amended)

The calculator automatically applies the correct factors based on your state and fuel types. These factors are updated annually, and the calculator should be reviewed each year to ensure compliance with the latest requirements.

### State Electricity Factors
Each state has different emission factors for electricity based on their generation mix. States with more renewable energy (like Tasmania and South Australia) have lower factors, while states dependent on coal generation have higher factors.

### Global Warming Potentials
For non-CO₂ gases like refrigerants, the calculator uses official Global Warming Potentials (GWPs) to convert emissions to CO₂-equivalent. For example, R134a has a GWP of 1,300, meaning 1 kg of R134a equals 1,300 kg of CO₂e.

---

*This calculator is designed to assist with emissions reporting but does not replace professional advice. Always verify calculations against official NGER requirements for compliance reporting.*