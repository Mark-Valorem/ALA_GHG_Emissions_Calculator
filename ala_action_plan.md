# ALA GHG Emissions Calculator v3 - Board Member Response & Action Plan

## I. Proposed Email Response to Board Member

---

Subject: Re: ALA GHG Emissions Calculator - Thank you for your valuable feedback

G'day [Board Member Name],

Thank you so much for taking the time to thoroughly review the GHG calculator and provide such detailed feedback. Your insights are invaluable, particularly your director's perspective on liability and the practical suggestions for improving usability.

To address your questions:

**Committee Approval**: You're right to ask - this initiative grew from discussions at our last Marketing Committee meeting where members identified the need for practical sustainability tools. We've been developing it as a pilot, and your feedback confirms we're on the right track.

**Broader Member Coverage**: Excellent point about our non-blender members. Our strategy is exactly as you suggested - release this blender-focused tool first (since it's well-advanced), then develop complementary modules for logistics, services, and distribution members. This phased approach lets us learn from the blender implementation.

**Your Three Key Concerns**:
1. **Disclaimer**: Absolutely agree. We'll add comprehensive disclaimer language immediately.
2. **IP/ILMA**: Good catch. I'll reach out to ILMA this week to formalise permission and ensure proper attribution.
3. **Data Security**: The calculator runs entirely in users' browsers with no server connection. All data stays on their computer - we can't see it, nor can anyone else. I'll make this crystal clear in the tool.

**Technical Improvements**: Your UI suggestions are spot-on - those Excel-like behaviours will make data entry much smoother. Regarding Scope 2 reporting, you're absolutely right about market-based vs location-based methods. We'll add both options, especially given the new mandatory climate reporting requirements.

**Re-refined Base Oil**: Agreed - removing this to maintain our clear Scope 1&2 focus.

I'll implement these changes over the next fortnight and send you a preview before our next board meeting. Would you be open to a quick chat next week to ensure I've captured everything correctly?

Thanks again for your thorough review - this is exactly the rigorous feedback we need.

Cheers,
Mark

---

## II. Required Updates for `ala-ghg-calculator-v3.html` (Additions/Modifications)

### 1. **Add Comprehensive Disclaimer** (High Priority)
- **Location**: Add prominent disclaimer at the top of the calculator and in the footer
- **Content**: Legal disclaimer stating ALA provides tool "as-is" without warranty, users responsible for accuracy
- **Implementation**: Add disclaimer div after the main title and before facility information section

### 2. **Add Market-Based Scope 2 Calculation Option** (High Priority)
- **Location**: In the "Emission Reduction Initiatives" section
- **Features to add**:
  - Toggle between "Location-based" and "Market-based" Scope 2 methods
  - New field for "Carbon Neutral Energy Purchase (%)"
  - Separate calculations showing both methods side-by-side
  - Update summary reports to show both values
- **Implementation**: Modify electricity emissions calculations to support dual methodologies

### 3. **Improve Data Entry UX** (Medium Priority)
- **Zero Placeholder Enhancement**:
  - Change all input fields to show greyed placeholder text instead of actual zeros
  - Use `placeholder="0"` attribute and remove `value="0"`
- **Excel-like Navigation**:
  - Add keyboard event listeners to move to next cell on Enter key
  - Implement Tab navigation between cells in logical order

### 4. **Add ILMA Attribution** (High Priority)
- **Location**: In the "About This Tool" section and footer
- **Content**: "Based on the ILMA GHG Calculator model, adapted with permission for Australian facilities"
- **Implementation**: Add attribution text with link to ILMA if approved

### 5. **Enhance Data Security Messaging** (High Priority)
- **Location**: Add new "Data Privacy & Security" info box
- **Content**: Clear statement that all calculations happen locally, no data transmitted or stored externally
- **Implementation**: Add prominent notice near data entry section

### 6. **Add Export Options for Both Reporting Methods** (Medium Priority)
- **Enhancement**: Modify PDF and CSV exports to include both location-based and market-based results
- **Add comparison table showing the difference between methods

### 7. **Add Member Type Selection** (Future Enhancement - Low Priority)
- **Location**: After facility information
- **Options**: Blender, Logistics Provider, Raw Material Supplier, Distributor, Service Provider
- **Note**: This sets foundation for future modules but doesn't change current calculations

---

## III. Required Removals from `ala-ghg-calculator-v3.html`

### 1. **Remove Re-refined Base Oil Question** (High Priority)
- **Current Location**: Need to search for any references to re-refined base oil
- **Action**: Remove entirely as it relates to Scope 3 emissions
- **Clean up**: Remove any associated calculations or report mentions

### 2. **Remove Hard-coded Zero Values** (Medium Priority)
- **Current State**: Input fields have `value="0"`
- **Action**: Remove value attribute, replace with `placeholder="0"`
- **Affected elements**: All numeric input fields in monthly data tables

---

## IV. Implementation Plan

### Phase 1: Critical Legal & Compliance Updates (Week 1)
**Priority**: Highest - Address liability concerns immediately

1. **Add Disclaimer**
   - Draft comprehensive legal disclaimer
   - Add to calculator header and footer
   - Include in all exported reports

2. **ILMA Permission**
   - Contact ILMA for formal permission
   - Prepare attribution text pending approval
   - Document permission for records

3. **Data Security Notice**
   - Create clear privacy/security statement
   - Add prominent notice box
   - Update "About" section

### Phase 2: Technical Enhancements (Week 1-2)
**Priority**: High - Address functional gaps

1. **Market-Based Scope 2**
   - Design UI for method selection
   - Implement dual calculation logic
   - Update results display for both methods
   - Modify export functions

2. **Remove Scope 3 Elements**
   - Search and remove re-refined oil references
   - Clean up any associated calculations
   - Update documentation

### Phase 3: Usability Improvements (Week 2)
**Priority**: Medium - Enhance user experience

1. **Input Field Improvements**
   - Replace zero values with placeholders
   - Implement Enter key navigation
   - Add visual focus indicators

2. **Export Enhancements**
   - Update PDF template for dual methods
   - Enhance CSV export structure
   - Add method comparison table

### Phase 4: Testing & Documentation (Week 2-3)
**Priority**: Essential before release

1. **Comprehensive Testing**
   - Test all calculation scenarios
   - Verify market-based calculations
   - Test on multiple browsers/devices

2. **Update Documentation**
   - Revise user guide
   - Create FAQ section
   - Document calculation methodologies

### Key Considerations:

- **ILMA Permission**: Don't publish updates until ILMA permission confirmed
- **Legal Review**: Have disclaimer reviewed by legal counsel
- **User Testing**: Get 2-3 facilities to test market-based calculations
- **Communication**: Prepare bulletin for members explaining new features
- **Training**: Consider webinar for market-based vs location-based reporting

### Success Metrics:

- Zero liability exposure through comprehensive disclaimers
- Full compliance with both NGER and mandatory climate reporting
- Improved user satisfaction through better UX
- Clear differentiation from Scope 3 emissions