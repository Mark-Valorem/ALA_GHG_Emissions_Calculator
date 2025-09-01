# ALA GHG Emissions Calculator - Project Documentation for Claude

## Project Overview

The Australian Lubricant Association (ALA) GHG Emissions Calculator is a web-based greenhouse gas emissions tracking tool specifically designed for Australian lubricant blending facilities. This tool adapts the successful US ILMA calculator model to meet Australian regulatory requirements under the National Greenhouse and Energy Reporting (NGER) scheme.

## Current Project Status

**Active Version**: v4.2 (`ala-ghg-calculator-v4.2.html`)
**Project State**: Production-ready with emission factors reference display
**Last Updated**: August 2025

## IMPORTANT VERSIONING POLICY

**For all large changes and new features, create a new version of the calculator:**
- Copy the current version to a new file with incremented version number
- Update all version references in the new file (title, header, footer)
- Keep the previous version intact for rollback if needed
- Update this documentation to reflect the new active version
- Examples of changes requiring new versions:
  - Adding new features or functionality
  - Major UI/UX changes
  - Significant calculation methodology updates
  - Adding or removing emission sources
  - Major refactoring or restructuring

## Key Project Files

### Main Calculator Files
- `ala-ghg-calculator-v4.2.html` - Current production version with emission factors reference display
- `ala-ghg-calculator-v4.1.html` - Previous version with advanced UX features and market-based Scope 2 fixes
- `ala-ghg-calculator-v4.0.html` - Version with NGA 2024 emission factors
- `Archive/` - Contains all previous versions (v1.0 through v3.x)

### Documentation Files
- `README.md` - Primary project documentation and usage instructions
- `ala-ghg-calculator-user-guide.md` - Comprehensive user manual
- `ala-ghg-calculator-technical-changes.md` - Technical implementation details
- `code_implementation_guide.md` - Step-by-step implementation guide
- `ala-ghg-calculator-next-steps.md` - Enhancement roadmap
- `ala_action_plan.md` - Board member feedback and implementation plan
- `ala-ghg-project-docs-250714.md` - Detailed project history and architecture
- `nga_factors_2024_edition.md` - Latest emission factors reference

### Reference Files
- `table-width-solution-doc.md` & `table-width-solution-doc-update.md` - UI/UX solutions
- `ALA_GHG_Emissions_Report (2).pdf`, `(4).pdf`, `(5).pdf` - Sample reports
- `ALA_GHG_Emissions_Valorem Chemicals_2025 (1).xlsx` - Excel reports
- `GHG Calculator_Next Steps.docx` - Strategic planning document

### Testing Files
- `tests/test-calculator.js` - Playwright automated test suite for calculator validation
- `test-results/` - Directory containing JSON test reports with timestamps
- `package.json` - Node.js dependencies (includes Playwright testing framework)
- `package-lock.json` - Locked dependency versions for consistent testing

### Assets
- `ala_logo.png` - ALA branding logo
- Various logo conversion files (`logo.b64`, `logo_base64.txt`, etc.)
- `convert_logo.ps1` - PowerShell script for logo conversion

## Core Features

### Emissions Tracking
- **Scope 1 (Direct)**: Natural gas, diesel, petrol, LPG, waste oil, refrigerants, CO₂ fire systems, welding gases
- **Scope 2 (Indirect)**: Electricity (state-specific factors), steam/heat purchases
- **Location-based and Market-based** Scope 2 reporting methods

### Advanced Features
- Production normalization (emissions per tonne of product)
- Emission reduction initiatives tracking (solar, green power, RECs, offsets)
- Flexible reporting periods (calendar, financial year, custom)
- Real-time calculations with data validation
- Professional report generation (PDF, CSV export)
- Executive summaries for stakeholders

### Technical Architecture
- Single HTML file with embedded JavaScript
- Offline-capable (no server required)
- Responsive design (mobile/tablet friendly)
- Browser local storage for data persistence
- Chart.js for data visualization
- Tailwind CSS for styling

## Recent Major Updates

### Version 4.2 (August 2025)
- Added comprehensive emission factors reference display feature
- New "View Emission Factors" button in report section
- Modal dialog showing all emission factors with source information
- Includes NGA 2024 factors with table references and links
- Print functionality for emission factors reference
- Display of both location-based and market-based factors
- Common refrigerant GWP values from IPCC AR5

### Version 4.1 (August 2025)
- Fixed market-based Scope 2 calculations using Australian residual mix factor (0.81 kg CO₂e/kWh)
- Corrected RECs credit scaling by relevant grid factors
- Prevented Green Power double-counting in market-based calculations
- UI improvements with Green Power input disabled for market-based method
- Advanced sources toggle (hides uncommon sources by default)
- Supplier-specific Steam/Heat emissions factor input
- Enhanced Excel-style navigation (Enter key follows Tab order)
- Split table architecture for better screen compatibility

## Development Guidelines

### Code Structure
- All functionality contained in single HTML file
- JavaScript embedded in `<script>` tags at bottom
- CSS embedded in `<style>` tags in header
- Uses vanilla JavaScript (no frameworks beyond Chart.js)
- Tailwind CSS classes for styling

### Emission Factors
**Current Version**: NGA 2024 Edition (National Greenhouse Accounts Factors)
- Natural Gas: 0.0393 GJ/m³, 51.53 kg CO₂e/GJ
- Diesel: 0.0386 GJ/L, 70.20 kg CO₂e/GJ  
- Electricity: State-specific factors (NSW/ACT: 0.66, VIC: 0.77, QLD: 0.71, SA: 0.23, etc.)
- Market-based residual mix: 0.81 kg CO₂e/kWh

### Browser Compatibility
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Mobile browsers ✓

## Data Privacy & Security
- All calculations performed locally in browser
- No data transmitted to external servers
- No user data collected or stored by ALA
- Data saved only to browser's local storage
- Complete data privacy maintained

## Testing Guidelines

### Automated Testing with Playwright
**Primary Test Suite**: `tests/test-calculator.js`
- **Framework**: Playwright with Chromium browser automation
- **Coverage**: Data entry validation, emission calculations, state-specific factors
- **Execution**: `node tests/test-calculator.js` (requires `npm install` first)
- **Reports**: JSON reports saved to `test-results/` with timestamp and detailed results

### Test Suite Features
- **Automatic Calculator Detection**: Finds and tests latest calculator version automatically
- **Comprehensive Validation**: 
  - Basic data entry and form functionality
  - Natural gas calculation accuracy (validates against NGA 2024 factors)
  - State-specific electricity factors for all Australian states
- **Results Tracking**: 
  - Pass/fail status for each test
  - Calculation accuracy percentages
  - Performance timing data
  - Detailed error reporting

### Running Tests
```bash
# Install dependencies (first time only)
npm install

# Run the complete test suite
node tests/test-calculator.js

# View latest test results
# Results are automatically saved to test-results/ folder
```

### Before Making Changes
1. **Run existing test suite** to establish baseline
2. Backup current working version
3. Test in multiple browsers (Chrome, Firefox, Edge)
4. **Re-run automated tests** after changes to catch regressions
5. Check mobile/tablet responsiveness
6. Test print layouts (A4 portrait and landscape)

### Critical Test Cases (Automated)
- ✅ Basic data entry and field validation
- ✅ Natural gas emission calculations (NGA 2024 factors)
- ✅ State-specific electricity factors (NSW, VIC, QLD, SA, TAS)
- 📋 Market-based vs location-based Scope 2 methods (manual)
- 📋 PDF generation and CSV export functionality (manual)
- 📋 Data persistence (save/reload in browser) (manual)

## Common Development Tasks

### Updating Emission Factors
1. Locate emission factors in JavaScript section (search for "EMISSION_FACTORS")
2. Update values with latest NGA factors
3. Document source and date in comments
4. **Run automated test suite to verify calculations**
5. Update test expected values if factors have legitimately changed

### Adding New Emission Sources
1. Update HTML form with new input fields
2. Modify JavaScript data structures
3. Add emission factors for new sources
4. Update calculation functions
5. Modify report templates to include new sources
6. **Add test cases to automated suite for new sources**

### UI/UX Improvements
1. Use Tailwind CSS classes for consistency
2. Maintain scope color coding (Scope 1: blue, Scope 2: green)
3. Test responsive behavior on all screen sizes
4. Ensure print layouts remain functional

## Deployment Process

### File Naming Convention
- Production releases: `ala-ghg-calculator-v[major].[minor].html`
- Development versions: `ala-ghg-calculator-v[version]-[date].html`
- Archive older versions in `Archive/` folder

### Quality Assurance
1. **Run automated test suite** (`node tests/test-calculator.js`)
2. Code review for accuracy and security
3. User testing with representative facilities
4. Cross-browser compatibility testing
5. Print/export functionality verification
6. Documentation updates
7. **Verify test results show 100% pass rate** before deployment

## Support & Maintenance

### Annual Tasks
- Update emission factors when new NGA edition released
- Review and update state electricity factors
- Test with latest browser versions
- Update documentation as needed

### User Support
- Comprehensive user guide available
- Technical implementation guide for IT teams
- FAQ document for common issues
- ALA contact channels for additional support

## Future Enhancement Roadmap

### Phase 1 (Next 6 months)
- Multi-facility support for organizations
- Year-over-year comparison features
- Enhanced benchmarking capabilities
- Mobile app development consideration

### Phase 2 (6-12 months)
- API development for system integration
- Automated report scheduling
- Advanced analytics and insights
- Integration with common ERP systems

### Phase 3 (12+ months)
- Scope 3 emissions tracking
- Supply chain integration
- AI-powered recommendations
- International standards alignment

## License & Attribution

Based on the ILMA GHG Calculator model, adapted with permission for Australian facilities. All Australian-specific modifications and enhancements are provided for use by ALA members and partners.

---

**For Development Questions**: Refer to technical documentation files in repository
**For User Support**: Contact ALA through official channels
**For Bug Reports**: Document clearly with screenshots and browser details

*Last Updated: September 2025*