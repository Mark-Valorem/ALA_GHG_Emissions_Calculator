// test-calculator.js
// Automated testing suite for the ALA GHG Emissions Calculator
// Author: Mark Anderson, Valorem Chemicals
// Purpose: Ensure calculation accuracy and catch regression errors

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;

/**
 * This class encapsulates all testing logic for the ALA Calculator.
 * Each method tests a specific aspect of the calculator's functionality.
 */
class AlaCalculatorTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.testResults = [];
        
        // Store the path to your calculator file
        // __dirname means "the directory this script is in" (tests folder)
        // '..' means "go up one level" (to the main project folder)
        this.calculatorPath = null; // We'll determine this dynamically
    }

    /**
     * Initialize the testing environment
     * This method finds your calculator file and opens it in a browser
     */
    async initialize() {
        console.log('╔════════════════════════════════════════════════╗');
        console.log('║     ALA GHG Calculator Automated Test Suite     ║');
        console.log('║          Valorem Chemicals Pty Ltd              ║');
        console.log('╚════════════════════════════════════════════════╝\n');
        
        // Look for calculator files in the project root
        const projectDir = path.join(__dirname, '..');
        console.log(`Scanning project folder: ${projectDir}\n`);
        
        try {
            const files = await fs.readdir(projectDir);
            const calculatorFiles = files.filter(f => 
                f.startsWith('ala-ghg-calculator') && 
                f.endsWith('.html')
            ).sort(); // Sort to get them in version order
            
            if (calculatorFiles.length === 0) {
                throw new Error('No calculator HTML files found in project folder');
            }
            
            console.log('Found calculator versions:');
            calculatorFiles.forEach(file => {
                console.log(`  • ${file}`);
            });
            
            // Use the latest version (last in sorted array)
            const latestCalculator = calculatorFiles[calculatorFiles.length - 1];
            this.calculatorPath = path.join(projectDir, latestCalculator);
            console.log(`\n→ Testing with: ${latestCalculator}\n`);
            
        } catch (error) {
            console.error('ERROR: Could not find calculator files');
            console.error(`Looked in: ${projectDir}`);
            console.error('Please ensure your calculator HTML files are in the project root');
            process.exit(1);
        }

        // Launch browser with specific settings for testing
        console.log('Launching browser...');
        this.browser = await chromium.launch({ 
            headless: false,  // Set to true if you don't want to see the browser
            slowMo: 50,      // Milliseconds to slow down each action (helps you see what's happening)
            devtools: false  // Set to true if you want developer tools open
        });
        
        // Create a new browser page (like opening a new tab)
        this.page = await this.browser.newPage();
        
        // Set viewport size to ensure consistent testing
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        
        // Navigate to your calculator file
        // We use file:/// protocol for local files
        const fileUrl = `file:///${this.calculatorPath.replace(/\\/g, '/')}`;
        console.log('Loading calculator...');
        await this.page.goto(fileUrl, { waitUntil: 'networkidle' });
        
        // Verify the calculator loaded by checking for a key element
        try {
            await this.page.waitForSelector('#facilityName', { timeout: 5000 });
            console.log('✓ Calculator loaded successfully\n');
        } catch (error) {
            console.error('✗ Calculator failed to load properly');
            console.error('Could not find #facilityName element');
            throw error;
        }
    }

    /**
     * Test 1: Verify Basic Data Entry
     * This ensures form fields accept and retain data correctly
     */
    async testDataEntry() {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Test 1: Basic Data Entry');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const startTime = Date.now();
        
        try {
            // Test facility information fields
            await this.page.fill('#facilityName', 'Valorem Chemicals Test Facility');
            await this.page.fill('#annualProduction', '5000');
            await this.page.selectOption('#state', 'NSW');
            await this.page.selectOption('#reportingPeriod', 'financial');
            await this.page.selectOption('#reportingYear', '2025');
            
            // Verify the values stuck
            const facilityName = await this.page.inputValue('#facilityName');
            const production = await this.page.inputValue('#annualProduction');
            const state = await this.page.inputValue('#state');
            
            const allFieldsCorrect = 
                facilityName === 'Valorem Chemicals Test Facility' &&
                production === '5000' &&
                state === 'NSW';
            
            const testTime = Date.now() - startTime;
            
            this.testResults.push({
                testName: 'Basic Data Entry',
                status: allFieldsCorrect ? 'PASSED' : 'FAILED',
                duration: `${testTime}ms`,
                details: allFieldsCorrect 
                    ? 'All fields accept and retain data correctly'
                    : `Fields not retaining data: Facility="${facilityName}", Production="${production}", State="${state}"`
            });
            
            console.log(allFieldsCorrect ? '✓ Data entry working correctly' : '✗ Data entry has issues');
            console.log(`  Time taken: ${testTime}ms\n`);
            
        } catch (error) {
            this.testResults.push({
                testName: 'Basic Data Entry',
                status: 'ERROR',
                details: error.message
            });
            console.error('✗ Error during data entry test:', error.message, '\n');
        }
    }

    /**
     * Test 2: Natural Gas Emissions Calculation
     * Verifies Scope 1 calculations match NGA 2024 factors
     */
    async testNaturalGasEmissions() {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Test 2: Natural Gas Emissions (Scope 1)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        try {
            // Clear the form first
            await this.page.reload();
            await this.page.waitForSelector('#facilityName');
            
            // Set up state (required for calculations)
            await this.page.selectOption('#state', 'NSW');
            
            // Enter test data: 1000 m³ of natural gas in January
            console.log('Entering: 1000 m³ natural gas for January');
            await this.page.fill('#January-naturalGas', '1000');
            
            // The calculation should be:
            // 1000 m³ × 0.0393 GJ/m³ = 39.3 GJ
            // 39.3 GJ × 0.05153 t CO₂e/GJ = 2.025129 t CO₂e
            const expectedEmissions = 2.025;
            console.log(`Expected result: ${expectedEmissions.toFixed(3)} t CO₂e`);
            console.log('(Based on NGA 2024: 0.0393 GJ/m³ × 0.05153 t CO₂e/GJ)');
            
            // Click calculate button
            await this.page.click('#calculateEmissions');
            
            // Wait for results section to appear
            await this.page.waitForSelector('#results', { state: 'visible', timeout: 5000 });
            
            // Get the calculated Scope 1 total
            const scope1Text = await this.page.textContent('#scope1Total');
            const actualEmissions = parseFloat(scope1Text.replace(/,/g, ''));
            console.log(`Actual result:   ${actualEmissions.toFixed(3)} t CO₂e`);
            
            // Check if within acceptable tolerance (0.5% to account for rounding)
            const percentDifference = Math.abs((actualEmissions - expectedEmissions) / expectedEmissions * 100);
            const acceptable = percentDifference < 0.5;
            
            this.testResults.push({
                testName: 'Natural Gas Calculation',
                status: acceptable ? 'PASSED' : 'FAILED',
                expected: expectedEmissions,
                actual: actualEmissions,
                accuracy: `${(100 - percentDifference).toFixed(2)}%`,
                details: acceptable 
                    ? `Calculation accurate within ${percentDifference.toFixed(3)}%`
                    : `Calculation off by ${percentDifference.toFixed(2)}%`
            });
            
            console.log(acceptable ? '✓ Calculation correct' : '✗ Calculation incorrect');
            console.log(`  Accuracy: ${(100 - percentDifference).toFixed(2)}%\n`);
            
        } catch (error) {
            this.testResults.push({
                testName: 'Natural Gas Calculation',
                status: 'ERROR',
                details: error.message
            });
            console.error('✗ Error during calculation test:', error.message, '\n');
        }
    }

    /**
     * Test 3: State-Specific Electricity Factors
     * Ensures each state uses its correct emission factor
     */
    async testStateElectricityFactors() {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Test 3: State Electricity Factors (Scope 2)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Define test cases for different states
        const stateTests = [
            { state: 'NSW', factor: 0.66, name: 'NSW/ACT' },
            { state: 'VIC', factor: 0.77, name: 'Victoria' },
            { state: 'QLD', factor: 0.71, name: 'Queensland' },
            { state: 'SA',  factor: 0.23, name: 'South Australia' },
            { state: 'TAS', factor: 0.15, name: 'Tasmania' }
        ];
        
        console.log('Testing 10,000 kWh across different states:\n');
        
        for (const testCase of stateTests) {
            try {
                // Start fresh for each state
                await this.page.reload();
                await this.page.waitForSelector('#state');
                
                // Set the state
                await this.page.selectOption('#state', testCase.state);
                
                // Enter 10,000 kWh for January
                await this.page.fill('#January-electricity', '10000');
                
                // Calculate
                await this.page.click('#calculateEmissions');
                await this.page.waitForSelector('#results', { state: 'visible' });
                
                // Get Scope 2 result
                const scope2Text = await this.page.textContent('#scope2TotalLocation');
                const actualEmissions = parseFloat(scope2Text.replace(/,/g, ''));
                
                // Expected: 10,000 kWh × factor / 1000 (to get tonnes)
                const expectedEmissions = (10000 * testCase.factor) / 1000;
                
                // Check accuracy
                const difference = Math.abs(actualEmissions - expectedEmissions);
                const passed = difference < 0.01;
                
                // Store result
                this.testResults.push({
                    testName: `${testCase.name} Electricity`,
                    status: passed ? 'PASSED' : 'FAILED',
                    expected: expectedEmissions,
                    actual: actualEmissions,
                    factor: testCase.factor,
                    details: `Factor: ${testCase.factor} kg CO₂e/kWh`
                });
                
                // Display result
                const icon = passed ? '✓' : '✗';
                console.log(`  ${icon} ${testCase.name.padEnd(15)} Expected: ${expectedEmissions.toFixed(2)}t, Got: ${actualEmissions.toFixed(2)}t`);
                
            } catch (error) {
                this.testResults.push({
                    testName: `${testCase.name} Electricity`,
                    status: 'ERROR',
                    details: error.message
                });
                console.error(`  ✗ ${testCase.name} - Error: ${error.message}`);
            }
        }
        
        console.log('');
    }

    /**
     * Generate comprehensive test report
     */
    async generateReport() {
        console.log('\n╔════════════════════════════════════════════════╗');
        console.log('║              TEST RESULTS SUMMARY               ║');
        console.log('╚════════════════════════════════════════════════╝\n');
        
        const total = this.testResults.length;
        const passed = this.testResults.filter(t => t.status === 'PASSED').length;
        const failed = this.testResults.filter(t => t.status === 'FAILED').length;
        const errors = this.testResults.filter(t => t.status === 'ERROR').length;
        
        // Calculate pass rate
        const passRate = total > 0 ? (passed / total * 100).toFixed(1) : 0;
        
        console.log(`Total Tests:  ${total}`);
        console.log(`Passed:       ${passed} ✓`);
        console.log(`Failed:       ${failed} ✗`);
        console.log(`Errors:       ${errors} ⚠`);
        console.log(`Pass Rate:    ${passRate}%\n`);
        
        // Show individual test results
        console.log('Individual Test Results:');
        console.log('────────────────────────');
        this.testResults.forEach((result, index) => {
            const icon = result.status === 'PASSED' ? '✓' : 
                        result.status === 'FAILED' ? '✗' : '⚠';
            console.log(`${(index + 1).toString().padStart(2)}. ${icon} ${result.testName.padEnd(25)} ${result.status}`);
            if (result.details) {
                console.log(`    └─ ${result.details}`);
            }
        });
        
        // Save detailed report to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const reportFilename = `test-report-${timestamp}.json`;
        const reportPath = path.join(__dirname, '..', 'test-results', reportFilename);
        
        const report = {
            timestamp: new Date().toISOString(),
            calculator: path.basename(this.calculatorPath),
            duration: `${Date.now() - this.testStartTime}ms`,
            summary: {
                total: total,
                passed: passed,
                failed: failed,
                errors: errors,
                passRate: `${passRate}%`
            },
            environment: {
                node: process.version,
                platform: process.platform,
                cwd: process.cwd()
            },
            results: this.testResults
        };
        
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Detailed report saved: test-results\\${reportFilename}`);
    }

    /**
     * Clean up after tests
     */
    async cleanup() {
        if (this.browser) {
            console.log('\nClosing browser...');
            await this.browser.close();
            console.log('✓ Test suite complete\n');
        }
    }

    /**
     * Main test runner
     */
    async runAllTests() {
        this.testStartTime = Date.now();
        
        try {
            await this.initialize();
            await this.testDataEntry();
            await this.testNaturalGasEmissions();
            await this.testStateElectricityFactors();
            await this.generateReport();
        } catch (error) {
            console.error('\n❌ Test suite encountered a fatal error:');
            console.error(error);
            process.exit(1);
        } finally {
            await this.cleanup();
        }
    }
}

// Execute the test suite
if (require.main === module) {
    console.clear(); // Start with a clean console
    const tester = new AlaCalculatorTester();
    
    tester.runAllTests()
        .then(() => {
            console.log('════════════════════════════════════════');
            console.log('        All tests completed!');
            console.log('════════════════════════════════════════');
        })
        .catch(error => {
            console.error('Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = AlaCalculatorTester;