# ALA GHG Emissions Calculator v2.1
## Technical Changes and Implementation Guide

### Version History
- **Version 2.0**: Initial release with core Scope 1 & 2 emissions tracking
- **Version 2.1**: Enhanced with additional emission sources and sustainability tracking

---

## Summary of Major Changes

### New Emission Sources Added

#### Scope 1 Enhancements
1. **Petrol** - Added as a mobile combustion source for light vehicles
   - Energy content factor: 0.0343 GJ/L
   - Emission factor: 67.40 kg CO₂e/GJ

2. **Waste Oil** - For facilities burning waste oil for heat recovery
   - Energy content factor: 0.0420 GJ/L
   - Emission factor: 74.00 kg CO₂e/GJ

3. **Refrigerant Leakage** - Tracking fugitive emissions from HVAC systems
   - Direct emission factor: 1300 kg CO₂e/kg (for R134a)
   - No energy content calculation required

4. **CO₂ Fire Suppression** - Direct CO₂ releases from fire systems
   - Direct emission factor: 1 kg CO₂e/kg CO₂
   - No energy content calculation required

5. **Welding Gas** - CO₂ used as shielding gas in welding operations
   - Direct emission factor: 1 kg CO₂e/kg CO₂
   - No energy content calculation required

#### Scope 2 Enhancements
1. **Steam/Heat** - For purchased thermal energy from external sources
   - Input unit: GJ (already in energy units)
   - Emission factor: 60.00 kg CO₂e/GJ

### New Emission Reduction Tracking Section

A comprehensive new section was added to track and quantify emission reduction initiatives:

#### Renewable Energy & Offsets
- Solar generation (kWh/year)
- Green power purchases (% of total electricity)
- Renewable Energy Certificates - RECs (MWh)
- Carbon offsets (t CO₂e)

#### Material & Process Efficiency
- Re-refined base oil usage (% of total)
- Electric forklift count (units)
- Energy efficiency project savings (GJ/year)
- Waste heat recovery (GJ/year)

#### Calculations
The system now calculates:
- Renewable energy reductions based on avoided grid electricity
- Efficiency savings using an average emission factor of 60 kg CO₂e/GJ
- Net emissions after all reductions and offsets

---

## Code Implementation Details

### Data Structure Updates

The monthly data object was expanded to include new fields:

```javascript
const monthData = {
    month: month,
    naturalGas: 0,
    dieselGenerators: 0,
    wasteOil: 0,           // NEW
    dieselVehicles: 0,
    petrol: 0,             // NEW
    lpg: 0,
    refrigerant: 0,        // NEW
    co2Fire: 0,            // NEW
    weldingGas: 0,         // NEW
    electricity: 0,
    steamHeat: 0           // NEW
};
```

### Emission Factor Updates

```javascript
const EMISSION_FACTORS = {
    energyContent: {
        naturalGas: 0.0393,
        diesel: 0.0386,
        petrol: 0.0343,      // NEW
        lpg: 0.0257,
        wasteOil: 0.0420,    // NEW
        electricity: 0.0036
    },
    fuelEmissions: {
        naturalGas: 51.53,
        diesel: 70.20,
        petrol: 67.40,       // NEW
        lpg: 60.60,
        wasteOil: 74.00,     // NEW
        steamHeat: 60.00     // NEW
    },
    directEmissions: {       // NEW CATEGORY
        refrigerantR134a: 1300,
        co2Direct: 1,
        weldingCO2: 1
    },
    electricityByState: {
        // Unchanged
    }
};
```

### Calculation Logic Updates

The emissions calculation now handles three types of sources:

1. **Fuel combustion** (existing logic):
   ```javascript
   const energy = consumption * EMISSION_FACTORS.energyContent[fuel];
   const emissions = (energy * EMISSION_FACTORS.fuelEmissions[fuel]) / 1000;
   ```

2. **Direct emissions** (new logic):
   ```javascript
   const emissions = (consumption * EMISSION_FACTORS.directEmissions[source]) / 1000;
   ```

3. **Steam/Heat** (new logic):
   ```javascript
   const emissions = (consumption * EMISSION_FACTORS.fuelEmissions.steamHeat) / 1000;
   ```

### New Functions Added

#### updateReductions()
Calculates emission reductions from sustainability initiatives:
```javascript
function updateReductions() {
    // Solar reduction = generation × state electricity factor
    // Green power reduction = (total electricity × percentage) × state factor
    // REC reduction = quantity (1 MWh = 1 t CO₂e)
    // Efficiency reduction = savings × 60 kg CO₂e/GJ (average factor)
    // Net emissions = gross emissions - total reductions - offsets
}
```

### UI/UX Improvements

#### Table Optimization
To address congestion issues, the following CSS changes were implemented:

1. **Removed input spinners**:
   ```css
   input[type="number"]::-webkit-outer-spin-button,
   input[type="number"]::-webkit-inner-spin-button {
       -webkit-appearance: none;
       margin: 0;
   }
   ```

2. **Reduced padding**:
   - Changed table cells from `px-4 py-2` to `px-2 py-1`
   - Input cells reduced to `p-1`

3. **Optimized input styling**:
   ```css
   .input-cell { 
       background-color: #fef3c7; 
       border: none;
       padding: 2px;
       font-size: 14px;
   }
   ```

#### Print Layout Improvements

1. **Enhanced table printing**:
   ```css
   @media print {
       #monthlyDataBody {
           font-size: 7pt !important;
       }
       #monthlyDataBody input {
           font-size: 7pt !important;
           padding: 0 !important;
       }
   }
   ```

2. **Added print-only footer**:
   ```html
   <div class="print-footer" style="display: none;">
       <!-- ALA attribution and methodology notes -->
   </div>
   ```

3. **Column width optimization** for better fit on A4 paper

---

## Database/Storage Considerations

While the current calculator operates entirely client-side, facilities implementing this tool in a production environment should consider:

1. **Data Persistence**: Store monthly consumption data in a database to enable:
   - Year-over-year comparisons
   - Trend analysis
   - Data backup and recovery

2. **Emission Factor Management**: Create a versioned emission factors table to:
   - Track historical calculations
   - Enable recalculation when factors update
   - Maintain audit trails

3. **Multi-facility Support**: Structure data to support:
   - Multiple facilities under one organization
   - Consolidated reporting
   - Benchmarking between facilities

---

## API Integration Opportunities

The calculator could be enhanced with external data sources:

1. **Automatic Factor Updates**: Connect to Clean Energy Regulator API for latest emission factors
2. **Weather Data**: Correlate energy consumption with heating/cooling degree days
3. **Production Systems**: Import production volumes automatically
4. **Utility Data**: Direct integration with energy retailer APIs

---

## Validation Rules

New validation thresholds were added for the additional sources:

```javascript
const validationThresholds = {
    naturalGas: { min: 0, max: 100000, unit: 'm³' },
    diesel: { min: 0, max: 50000, unit: 'L' },
    petrol: { min: 0, max: 30000, unit: 'L' },      // NEW
    lpg: { min: 0, max: 20000, unit: 'L' },
    wasteOil: { min: 0, max: 10000, unit: 'L' },    // NEW
    electricity: { min: 100, max: 1000000, unit: 'kWh' },
    refrigerant: { min: 0, max: 100, unit: 'kg' },   // NEW
    co2Fire: { min: 0, max: 500, unit: 'kg' },       // NEW
    weldingGas: { min: 0, max: 1000, unit: 'kg' },   // NEW
    steamHeat: { min: 0, max: 10000, unit: 'GJ' }    // NEW
};
```

---

## Testing Recommendations

When implementing these changes, test the following scenarios:

1. **Calculation Accuracy**:
   - Verify each new emission source calculates correctly
   - Test reduction calculations with various combinations
   - Ensure net emissions never go below zero

2. **Edge Cases**:
   - All zeros for new fields
   - Maximum values for validation
   - Mixed reporting periods (calendar vs financial year)

3. **Print Output**:
   - All data visible on A4 paper
   - Charts render correctly
   - Footer appears on all pages

4. **Data Export**:
   - CSV includes all new fields
   - Formulas can be verified in Excel
   - Special characters handled correctly

---

## Future Enhancement Opportunities

1. **Scope 3 Emissions**: Add upstream/downstream emissions tracking
2. **Target Setting**: Include science-based target tracking
3. **Benchmarking**: Industry comparison features
4. **Mobile App**: Responsive design for tablet data entry
5. **Automated Reporting**: Scheduled report generation
6. **Multi-language Support**: Translations for international facilities

---

## Migration Notes

For facilities upgrading from v2.0 to v2.1:

1. **No data loss**: All existing fields remain unchanged
2. **New fields default to zero**: No impact on existing calculations
3. **Backward compatible**: Can still be used without entering new fields
4. **Print layouts**: May need to adjust printer settings for optimal output

---

*Technical documentation prepared for the Australian Lubricant Association GHG Emissions Calculator v2.1*