# ALA GHG Emissions Calculator

A comprehensive web-based calculator for tracking and reporting greenhouse gas emissions for Australian lubricant blending facilities.

## Overview

The Australian Lubricant Association (ALA) GHG Emissions Calculator is specifically designed for lubricant blending facilities to track their carbon footprint using Australian NGER (National Greenhouse and Energy Reporting) methodologies and emission factors. This tool adapts the successful US ILMA calculator model to meet Australian regulatory requirements.

## Features

- Calculate Scope 1 (direct) and Scope 2 (indirect) emissions
- Track monthly energy consumption across multiple sources:
  - **Scope 1**: Natural gas, diesel generators, waste oil burning, vehicle fleets, forklifts, refrigerants, welding gases
  - **Scope 2**: Purchased electricity (state-specific factors), purchased steam/heat
- Support both location-based and market-based Scope 2 reporting methods
- Monitor emission reduction initiatives and their impact
- Generate professional reports with executive summaries
- Calculate emissions intensity (kg CO₂e per tonne of lubricant produced)
- Export data to CSV format
- Compliant with Australian NGER methodology

## Installation

### Option 1: Direct Browser Access (Recommended)

No installation required! Simply:

1. Download the latest calculator file (`ala-ghg-calculator-v4.1.html`)
2. Double-click the file to open it in your web browser
3. The calculator runs entirely in your browser - no server or internet connection needed

### Option 2: Web Server Deployment

For organizational deployment:

1. Clone or download this repository:
   ```bash
   git clone [repository-url]
   cd ala_carbon_calculator
   ```

2. Deploy the HTML file to your web server:
   - Copy `ala-ghg-calculator-v4.1.html` to your web server directory
   - Ensure the `ala_logo.png` file is in the same directory (if using external logo)

3. Access through your web browser:
   ```
   https://your-server.com/ala-ghg-calculator-v4.1.html
   ```

### Option 3: Local Development Server

For development or testing:

1. Using Python (if installed):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. Using Node.js (if installed):
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run server
   http-server -p 8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000/ala-ghg-calculator-v4.1.html
   ```

## System Requirements

### Browser Compatibility
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### Technical Requirements
- JavaScript must be enabled
- Minimum screen resolution: 1024x768
- PDF generation requires modern browser with print capabilities

## Usage

1. **Open the Calculator**: Launch the HTML file in your browser
2. **Enter Facility Information**: Input facility name, location, and reporting period
3. **Add Monthly Energy Data**: Enter consumption for electricity, natural gas, diesel, etc.
4. **Track Reduction Initiatives**: Record solar generation, RECs, carbon offsets
5. **Review Results**: See real-time emission calculations and charts
6. **Generate Reports**: Print professional reports or export to CSV

## Data Privacy

All calculations are performed locally in your browser. No data is sent to external servers, ensuring complete privacy of your operational information.

## Support Documentation

- [User Guide](ala-ghg-calculator-user-guide.md)
- [Technical Documentation](ala-ghg-calculator-technical-changes.md)
- [Next Steps & Roadmap](ala-ghg-calculator-next-steps.md)
- [Implementation Guide](code_implementation_guide.md)

## Version History

- **v4.1** (Current) - Critical fixes for market-based Scope 2 calculations and Green Power double-counting prevention
- **v4.0** - Updated with official NGA 2024 emission factors, added market-based reporting
- **v3.3** - Enhanced PDF export functionality and UI improvements
- **v3.2** - Previous stable version with table width optimizations
- **v3.1** - Added split table architecture for better usability
- **v3.0** - Resolved table width issues, added view toggles and print optimization
- **v2.1** - Expanded emission sources and reduction tracking
- **v2.0** - Enhanced features including production metrics
- **v1.0** - Initial release with core calculation engine

## License

This calculator is provided for use by Australian Lubricant Association (ALA) members and partners. Based on the ILMA calculator model with permission.

## Support

For technical support or questions, please contact the ALA technical team.

## Contributing

To report issues or suggest improvements:
1. Document the issue or enhancement clearly
2. Include screenshots if relevant
3. Contact the development team through official ALA channels

## Important Notes

### Emission Factors
The calculator uses the latest emission factors from:
- National Greenhouse and Energy Reporting (NGER) scheme
- National Greenhouse Accounts Factors (NGA 2024 edition)
- Clean Energy Regulator guidelines

**Version 4.1 Updates (Technical Corrections)**:
- Fixed market-based Scope 2 calculations to use Australian residual mix factor (0.81 kg CO₂e/kWh)
- RECs credit now properly scales by the relevant grid factor (state factor for location-based, residual mix for market-based)
- Green Power percentage is now correctly excluded from market-based calculations to prevent double counting
- UI improvements: Green Power input disabled when market-based method is selected

**Version 4.0 Updates (NGA 2024)**:
- Energy content factors updated for natural gas, waste oil, and LPG
- Fuel emission factors aligned with NGA 2024 combined scope 1 values
- Refrigerant GWP updated to AR5 values (R410A: 1924)
- State electricity factors updated to latest NGA 2024 values
- Added residual mix factor (0.81) for market-based reporting

**Note**: Emission factors are current as of NGA 2024 and should be verified annually to maintain compliance.

### Data Security
- All data is processed locally in your browser
- No data is transmitted to external servers
- Data is saved to browser local storage for convenience
- Clear your browser data to remove saved information

---

*Developed for the Australian Lubricant Association (ALA)*