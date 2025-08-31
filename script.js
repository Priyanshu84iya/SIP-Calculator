class SIPCalculator {
    constructor() {
        this.currentInvestmentType = 'sip';
        this.comparisonData = [];
        this.charts = {
            pie: null,
            line: null
        };
        this.initializeEventListeners();
        this.initializeTheme();
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Investment type toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeInvestmentType(e.target.dataset.type));
        });

        // Form submission
        document.getElementById('calculatorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAndShowResults();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCalculator());

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => this.exportResults());

        // Add to comparison button
        document.getElementById('addComparisonBtn').addEventListener('click', () => this.addToComparison());
    }

    // Initialize theme
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    // Toggle theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Refresh charts to apply new theme
        if (this.charts.pie || this.charts.line) {
            setTimeout(() => {
                this.renderPieChart();
                this.renderLineChart();
            }, 100);
        }
    }

    // Update theme icon
    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Change investment type
    changeInvestmentType(type) {
        this.currentInvestmentType = type;
        
        // Update active button
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');

        // Show/hide relevant inputs
        const sipInputs = document.querySelector('.sip-inputs');
        const lumpsumInputs = document.querySelector('.lumpsum-inputs');

        switch(type) {
            case 'sip':
                sipInputs.style.display = 'flex';
                lumpsumInputs.style.display = 'none';
                break;
            case 'lumpsum':
                sipInputs.style.display = 'none';
                lumpsumInputs.style.display = 'flex';
                break;
            case 'hybrid':
                sipInputs.style.display = 'flex';
                lumpsumInputs.style.display = 'flex';
                break;
        }
    }

    // Get monthly rate from annual rate
    getMonthlyRate(annualRate) {
        return Math.pow(1 + annualRate / 100, 1/12) - 1;
    }

    // Get total months from years
    getTotalMonths(years) {
        return years * 12;
    }

    // Calculate SIP maturity amount
    calculateSIP(monthlyInvestment, annualRate, years) {
        const monthlyRate = this.getMonthlyRate(annualRate);
        const totalMonths = this.getTotalMonths(years);
        
        if (monthlyRate === 0) {
            return monthlyInvestment * totalMonths;
        }
        
        const maturityAmount = monthlyInvestment * 
            (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
            (1 + monthlyRate));
        
        return maturityAmount;
    }

    // Calculate lumpsum maturity amount
    calculateLumpsum(lumpsumAmount, annualRate, years) {
        const annualRateDecimal = annualRate / 100;
        return lumpsumAmount * Math.pow(1 + annualRateDecimal, years);
    }

    // Calculate maturity amount based on investment type
    calculateMaturityAmount(monthlyInvestment = 0, lumpsumAmount = 0, annualRate, years) {
        let totalMaturity = 0;
        
        if (this.currentInvestmentType === 'sip' || this.currentInvestmentType === 'hybrid') {
            if (monthlyInvestment > 0) {
                totalMaturity += this.calculateSIP(monthlyInvestment, annualRate, years);
            }
        }
        
        if (this.currentInvestmentType === 'lumpsum' || this.currentInvestmentType === 'hybrid') {
            if (lumpsumAmount > 0) {
                totalMaturity += this.calculateLumpsum(lumpsumAmount, annualRate, years);
            }
        }
        
        return totalMaturity;
    }

    // Calculate total invested amount
    calculateInvestedAmount(monthlyInvestment = 0, lumpsumAmount = 0, years) {
        let totalInvested = 0;
        
        if (this.currentInvestmentType === 'sip' || this.currentInvestmentType === 'hybrid') {
            if (monthlyInvestment > 0) {
                totalInvested += monthlyInvestment * this.getTotalMonths(years);
            }
        }
        
        if (this.currentInvestmentType === 'lumpsum' || this.currentInvestmentType === 'hybrid') {
            if (lumpsumAmount > 0) {
                totalInvested += lumpsumAmount;
            }
        }
        
        return totalInvested;
    }

    // Calculate estimated returns
    calculateEstimatedReturns(maturityAmount, investedAmount) {
        return maturityAmount - investedAmount;
    }

    // Main calculation and display function
    calculateAndShowResults() {
        const monthlyInvestment = this.currentInvestmentType !== 'lumpsum' ? 
            parseFloat(document.getElementById('monthlyInvestment').value) || 0 : 0;
        const lumpsumAmount = this.currentInvestmentType !== 'sip' ? 
            parseFloat(document.getElementById('lumpsumAmount').value) || 0 : 0;
        const years = parseFloat(document.getElementById('investmentPeriod').value);
        const annualRate = parseFloat(document.getElementById('expectedReturns').value);

        // Validate inputs
        if (years <= 0 || annualRate <= 0) {
            alert('Please enter valid values for all fields');
            return;
        }

        if (this.currentInvestmentType === 'sip' && monthlyInvestment <= 0) {
            alert('Please enter a valid monthly SIP amount');
            return;
        }

        if (this.currentInvestmentType === 'lumpsum' && lumpsumAmount <= 0) {
            alert('Please enter a valid lumpsum amount');
            return;
        }

        if (this.currentInvestmentType === 'hybrid' && monthlyInvestment <= 0 && lumpsumAmount <= 0) {
            alert('Please enter valid amounts for both SIP and lumpsum');
            return;
        }

        // Calculate results
        const maturityAmount = this.calculateMaturityAmount(monthlyInvestment, lumpsumAmount, annualRate, years);
        const investedAmount = this.calculateInvestedAmount(monthlyInvestment, lumpsumAmount, years);
        const estimatedReturns = this.calculateEstimatedReturns(maturityAmount, investedAmount);

        // Store current calculation
        this.currentCalculation = {
            monthlyInvestment,
            lumpsumAmount,
            years,
            annualRate,
            maturityAmount,
            investedAmount,
            estimatedReturns,
            type: this.currentInvestmentType
        };

        // Show results
        this.showResults(maturityAmount, investedAmount, estimatedReturns);
        
        // Render charts
        this.renderPieChart();
        this.renderLineChart();
    }

    // Show results in UI
    showResults(maturityAmount, investedAmount, estimatedReturns) {
        document.getElementById('totalInvestment').textContent = this.formatCurrency(investedAmount);
        document.getElementById('estimatedReturns').textContent = this.formatCurrency(estimatedReturns);
        document.getElementById('maturityAmount').textContent = this.formatCurrency(maturityAmount);

        // Show results card and charts
        const resultsCard = document.getElementById('resultsCard');
        const chartsSection = document.getElementById('chartsSection');
        const comparisonSection = document.getElementById('comparisonSection');

        resultsCard.style.display = 'block';
        chartsSection.style.display = 'block';
        comparisonSection.style.display = 'block';

        // Add animation
        resultsCard.classList.add('fade-in');
        chartsSection.classList.add('fade-in');
    }

    // Render pie chart
    renderPieChart() {
        const ctx = document.getElementById('pieChart').getContext('2d');
        
        // Destroy existing chart
        if (this.charts.pie) {
            this.charts.pie.destroy();
        }

        const data = this.currentCalculation;
        const chartData = {
            labels: ['Total Investment', 'Estimated Returns'],
            datasets: [{
                data: [data.investedAmount, data.estimatedReturns],
                backgroundColor: [
                    getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                    getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')
                ],
                borderWidth: 2,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-card')
            }]
        };

        this.charts.pie = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = this.formatCurrency(context.parsed);
                                const percentage = ((context.parsed / data.maturityAmount) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Render line chart
    renderLineChart() {
        const ctx = document.getElementById('lineChart').getContext('2d');
        
        // Destroy existing chart
        if (this.charts.line) {
            this.charts.line.destroy();
        }

        const data = this.currentCalculation;
        const chartData = this.generateGrowthData(data);

        this.charts.line = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Total Investment',
                        data: chartData.invested,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') + '20',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Total Value',
                        data: chartData.maturity,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') + '20',
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                        }
                    },
                    y: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
                            callback: (value) => this.formatCurrency(value, false)
                        }
                    }
                }
            }
        });
    }

    // Generate growth data for line chart
    generateGrowthData(data) {
        const labels = [];
        const invested = [];
        const maturity = [];
        
        for (let year = 0; year <= data.years; year++) {
            labels.push(`Year ${year}`);
            
            let totalInvested = 0;
            let totalMaturity = 0;
            
            if (data.type === 'sip' || data.type === 'hybrid') {
                const monthsCompleted = year * 12;
                totalInvested += data.monthlyInvestment * monthsCompleted;
                
                if (year > 0) {
                    totalMaturity += this.calculateSIP(data.monthlyInvestment, data.annualRate, year);
                }
            }
            
            if (data.type === 'lumpsum' || data.type === 'hybrid') {
                if (year === 0) {
                    totalInvested += data.lumpsumAmount;
                    totalMaturity += data.lumpsumAmount;
                } else {
                    totalInvested += data.lumpsumAmount;
                    totalMaturity += this.calculateLumpsum(data.lumpsumAmount, data.annualRate, year);
                }
            }
            
            invested.push(totalInvested);
            maturity.push(totalMaturity);
        }
        
        return { labels, invested, maturity };
    }

    // Add current calculation to comparison
    addToComparison() {
        if (!this.currentCalculation) {
            alert('Please calculate first before adding to comparison');
            return;
        }

        const comparison = {
            ...this.currentCalculation,
            id: Date.now()
        };

        this.comparisonData.push(comparison);
        this.updateComparisonTable();
    }

    // Update comparison table
    updateComparisonTable() {
        const tbody = document.querySelector('#comparisonTable tbody');
        tbody.innerHTML = '';

        this.comparisonData.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Scenario ${index + 1}</td>
                <td>${data.type !== 'lumpsum' ? this.formatCurrency(data.monthlyInvestment, false) : '-'}</td>
                <td>${data.type !== 'sip' ? this.formatCurrency(data.lumpsumAmount, false) : '-'}</td>
                <td>${data.years} years</td>
                <td>${data.annualRate}%</td>
                <td>${this.formatCurrency(data.investedAmount, false)}</td>
                <td>${this.formatCurrency(data.maturityAmount, false)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Compare different plans
    comparePlans() {
        // This function is called when comparison data is updated
        this.updateComparisonTable();
    }

    // Export results to CSV
    exportResults() {
        if (!this.currentCalculation) {
            alert('No calculation data to export');
            return;
        }

        const data = this.currentCalculation;
        const csvContent = [
            ['Parameter', 'Value'],
            ['Investment Type', data.type.toUpperCase()],
            ['Monthly SIP Amount', data.type !== 'lumpsum' ? this.formatCurrency(data.monthlyInvestment, false) : 'N/A'],
            ['Lumpsum Amount', data.type !== 'sip' ? this.formatCurrency(data.lumpsumAmount, false) : 'N/A'],
            ['Investment Period', `${data.years} years`],
            ['Expected Annual Returns', `${data.annualRate}%`],
            ['Total Investment', this.formatCurrency(data.investedAmount, false)],
            ['Estimated Returns', this.formatCurrency(data.estimatedReturns, false)],
            ['Maturity Amount', this.formatCurrency(data.maturityAmount, false)]
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SIP_Calculation_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    // Reset calculator
    resetCalculator() {
        // Reset form
        document.getElementById('calculatorForm').reset();
        
        // Reset to default values
        document.getElementById('monthlyInvestment').value = 5000;
        document.getElementById('lumpsumAmount').value = 100000;
        document.getElementById('investmentPeriod').value = 10;
        document.getElementById('expectedReturns').value = 12;
        
        // Reset investment type to SIP
        this.changeInvestmentType('sip');
        
        // Hide results and charts
        document.getElementById('resultsCard').style.display = 'none';
        document.getElementById('chartsSection').style.display = 'none';
        
        // Clear current calculation
        this.currentCalculation = null;
        
        // Destroy charts
        if (this.charts.pie) {
            this.charts.pie.destroy();
            this.charts.pie = null;
        }
        if (this.charts.line) {
            this.charts.line.destroy();
            this.charts.line = null;
        }
    }

    // Format currency
    formatCurrency(amount, includeSymbol = true) {
        const formatted = new Intl.NumberFormat('en-IN', {
            style: includeSymbol ? 'currency' : 'decimal',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
        
        return includeSymbol ? formatted : formatted.replace(/,/g, ',');
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SIPCalculator();
});

// Additional utility functions

// Format number with Indian numbering system
function formatIndianNumber(num) {
    const x = num.toString();
    const lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '') {
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    } else {
        return lastThree;
    }
}

// Calculate CAGR (Compound Annual Growth Rate)
function calculateCAGR(initialValue, finalValue, years) {
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
}

// Calculate absolute return
function calculateAbsoluteReturn(initialValue, finalValue) {
    return ((finalValue - initialValue) / initialValue) * 100;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generate PDF report (requires jsPDF library)
function generatePDFReport(calculationData) {
    // This function would require jsPDF library to be included
    // Implementation would create a detailed PDF report of the calculation
    console.log('PDF generation would require jsPDF library');
}

// Save calculation to localStorage
function saveCalculation(calculationData) {
    const savedCalculations = JSON.parse(localStorage.getItem('sipCalculations') || '[]');
    savedCalculations.push({
        ...calculationData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('sipCalculations', JSON.stringify(savedCalculations));
}

// Load saved calculations from localStorage
function loadSavedCalculations() {
    return JSON.parse(localStorage.getItem('sipCalculations') || '[]');
}

// Clear all saved calculations
function clearSavedCalculations() {
    localStorage.removeItem('sipCalculations');
}

// Calculate inflation adjusted returns
function calculateInflationAdjustedReturns(nominalReturn, inflationRate, years) {
    const realReturn = ((1 + nominalReturn / 100) / (1 + inflationRate / 100) - 1) * 100;
    return realReturn;
}

// Calculate required SIP for target amount
function calculateRequiredSIP(targetAmount, annualRate, years) {
    const monthlyRate = Math.pow(1 + annualRate / 100, 1/12) - 1;
    const totalMonths = years * 12;
    
    if (monthlyRate === 0) {
        return targetAmount / totalMonths;
    }
    
    const requiredSIP = targetAmount / 
        (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
        (1 + monthlyRate));
    
    return requiredSIP;
}

// Calculate tax on LTCG (Long Term Capital Gains)
function calculateLTCG(investedAmount, maturityAmount, exemptionLimit = 100000) {
    const capitalGains = maturityAmount - investedAmount;
    const taxableGains = Math.max(0, capitalGains - exemptionLimit);
    const tax = taxableGains * 0.10; // 10% LTCG tax
    return {
        capitalGains,
        taxableGains,
        tax,
        postTaxAmount: maturityAmount - tax
    };
}

// Goal planning calculator
function calculateGoalPlanning(goalAmount, currentAge, goalAge, expectedReturn, inflationRate = 6) {
    const yearsToGoal = goalAge - currentAge;
    const inflationAdjustedGoal = goalAmount * Math.pow(1 + inflationRate / 100, yearsToGoal);
    const requiredSIP = calculateRequiredSIP(inflationAdjustedGoal, expectedReturn, yearsToGoal);
    
    return {
        yearsToGoal,
        inflationAdjustedGoal,
        requiredSIP,
        totalInvestment: requiredSIP * yearsToGoal * 12
    };
}