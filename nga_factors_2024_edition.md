### Latest National Greenhouse Accounts (NGA) Factors - 2024 Edition

Based on the current date (July 11, 2025), the most recent available version is the "Australian National Greenhouse Accounts Factors - 2024," published by the Department of Climate Change, Energy, the Environment and Water (DCCEEW). This is typically released in August each year, so the 2024 edition remains the latest as no 2025 update has been published yet.<grok:render card_id="d41b5c" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render> The factors align with those in the NGER (Measurement) Determination 2008 (compiled as of August 31, 2024).<grok:render card_id="e115d7" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">7</argument>
</grok:render>

These factors are used for voluntary reporting and are consistent with the legal requirements under NGER for registered corporations. Below, I've extracted the key data you requested: energy content factors, emission factors for common fuels (with separate gas contributions in kg CO₂-e/GJ and combined Scope 1 CO₂-e), and state/territory-specific electricity emission factors (Scope 2). All data is presented in tables for clarity. Units are as provided in the source documents; note that liquid fuels use GJ/kL (equivalent to multiplying by 0.001 for GJ/L).

#### 1. Energy Content Factors
These are from Table 5 (gaseous fuels), Table 8 (liquid fuels for stationary use), and related sections in the NGA Factors 2024. Factors are relatively stable year-to-year.

| Fuel Type                      | Energy Content Factor | Unit    |
|--------------------------------|-----------------------|---------|
| Natural gas (distributed in pipeline) | 0.0393               | GJ/m³   |
| Diesel oil (stationary)        | 38.6                  | GJ/kL   |
| Automotive gasoline (petrol, stationary) | 34.2               | GJ/kL   |
| Liquefied petroleum gas (LPG, stationary) | 25.7              | GJ/kL   |
| Liquefied natural gas (LNG)    | 25.3                  | GJ/kL   |
| Compressed natural gas (CNG)   | 0.0393                | GJ/m³   |

Notes: Measured as gross calorific value. For your calculator, convert to GJ/L if needed (e.g., diesel: 38.6 GJ/kL = 0.0386 GJ/L).<grok:render card_id="aa1e1d" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render>

#### 2. Emission Factors for Fuels
These are Scope 1 (direct combustion) factors from Tables 5, 6, and 8 in the NGA Factors 2024. I've included separate contributions for CO₂, CH₄, and N₂O (already converted to kg CO₂-e/GJ using applicable GWPs) and the combined CO₂-e factor for simplicity. For LPG, values are cross-referenced from consistent data in the NGER Determination for alignment.<grok:render card_id="b6a0bc" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">7</argument>
</grok:render> Use the combined factor in your calculator unless separate gases are needed.

**Natural Gas (Distributed in Pipeline)**

| Gas Component | Emission Factor (kg CO₂-e/GJ) |
|---------------|-------------------------------|
| CO₂           | 51.4                          |
| CH₄           | 0.1                           |
| N₂O           | 0.03                          |
| Combined CO₂-e | 51.53                        |

Notes: Scope 3 (upstream) factors vary by state (4.0–14.0 kg CO₂-e/GJ; e.g., Victoria: 4.0, NSW/ACT metro: 13.1). Use state-specific if including full cycle.<grok:render card_id="8f44c3" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render>

**Diesel Oil (Stationary)**

| Gas Component | Emission Factor (kg CO₂-e/GJ) |
|---------------|-------------------------------|
| CO₂           | 69.9                          |
| CH₄           | 0.1                           |
| N₂O           | 0.2                           |
| Combined CO₂-e | 70.20                        |

Notes: Scope 3 (upstream): 17.3 kg CO₂-e/GJ.<grok:render card_id="f18ca7" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render>

**Automotive Gasoline (Petrol, Stationary)**

| Gas Component | Emission Factor (kg CO₂-e/GJ) |
|---------------|-------------------------------|
| CO₂           | 67.4                          |
| CH₄           | 0.2                           |
| N₂O           | 0.2                           |
| Combined CO₂-e | 67.80                        |

Notes: Scope 3 (upstream): 17.2 kg CO₂-e/GJ.<grok:render card_id="c8bcc0" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render>

**Liquefied Petroleum Gas (LPG, Stationary)**

| Gas Component | Emission Factor (kg CO₂-e/GJ) |
|---------------|-------------------------------|
| CO₂           | 60.2                          |
| CH₄           | 0.01                          |
| N₂O           | 0.09                          |
| Combined CO₂-e | 60.3                         |

Notes: Scope 3 (upstream): Approximately 5–6 kg CO₂-e/GJ (varies by source). Full fuel cycle ranges 19.6–21.3 kg CO₂-e/GJ in some international references, but use Scope 1 combined for direct emissions.<grok:render card_id="58289f" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render><grok:render card_id="1e65d8" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">7</argument>
</grok:render>

#### 3. Electricity Emission Factors (Scope 2)
These are from Table 1 in the NGA Factors 2024, for indirect emissions from purchased electricity. Factors vary by state due to grid mix (e.g., renewables in SA/TAS lower the factor). Use for kWh consumption; they reflect 2024–25 updates and include methane from hydro dams, with rooftop solar self-consumption deducted.

| State/Territory or Grid                          | Emission Factor (kg CO₂-e/kWh) |
|--------------------------------------------------|--------------------------------|
| New South Wales (NSW) and Australian Capital Territory (ACT) | 0.66                          |
| Victoria (VIC)                                   | 0.77                           |
| Queensland (QLD)                                 | 0.71                           |
| South Australia (SA)                             | 0.23                           |
| Western Australia - South West Interconnected System (SWIS) | 0.51                       |
| Western Australia - North West Interconnected System (NWIS) | 0.61                       |
| Tasmania (TAS)                                   | 0.15                           |
| Northern Territory - Darwin Katherine Interconnected System (DKIS) | 0.56                |
| National average                                 | 0.63                           |

Notes: For financial years ending June. To convert to kg CO₂-e/GJ, multiply by 1000 and divide by 3.6. Historic factors are in prior NGA editions if needed for back-calculation. These align with the 2024 NGER amendments for 2024–25 reporting.<grok:render card_id="4df414" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">0</argument>
</grok:render><grok:render card_id="2c0c52" card_type="citation_card" type="render_inline_citation">
<argument name="citation_id">1</argument>
</grok:render>

If you need data for additional fuels, more detailed Scope 3 factors, or updates post-August 2025, re-check the DCCEEW website or let me know for a fresh extraction.