# 📊 SIP Calculator - Systematic Investment Plan Calculator

<div align="center">

### 🚀 Calculate your Systematic Investment Plan returns with precision

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Priyanshu84iya)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-green.svg)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

[🌐 Live Demo](https://priyanshu84iya.github.io/sip-calculator) | [📖 Documentation](#documentation) | [🚀 Features](#features) | [💻 Installation](#installation)

</div>

---

## 🎯 **Overview**

A modern, feature-rich **Systematic Investment Plan (SIP) Calculator** that helps investors calculate their investment returns with precision. Built with vanilla JavaScript, featuring a beautiful responsive UI with dark/light mode support, interactive charts, and comprehensive investment planning tools.

---

## ✨ **Features**

### 🔧 **Core Functionality**
- 📊 **SIP Calculator** - Calculate systematic investment returns
- 💰 **Lumpsum Calculator** - Calculate one-time investment returns  
- 🔄 **Hybrid Mode** - Combine SIP + Lumpsum investments
- 📈 **Accurate Formula** - Uses correct compound interest calculations
- 🎯 **Goal Planning** - Plan your financial goals effectively

### 🎨 **User Interface**
- 🌙☀️ **Dark/Light Mode Toggle** - Persistent theme switching
- 📱 **Fully Responsive** - Works on all devices
- ✨ **Smooth Animations** - Beautiful transitions and effects
- 🎨 **Modern Design** - Clean and intuitive interface
- 🚀 **Fast Loading** - Optimized performance

### 📊 **Visualization & Analytics**
- 🥧 **Interactive Pie Charts** - Investment breakdown visualization
- 📈 **Growth Line Charts** - Track investment growth over time
- 📋 **Comparison Tables** - Compare multiple investment scenarios
- 📁 **Export Functionality** - Download results as CSV
- 💾 **Calculation History** - Save and review past calculations

### 🔬 **Advanced Features**
- 🧮 **Precise Calculations** - Mathematically accurate formulas
- 📚 **Educational Content** - Learn about SIP formulas and concepts
- 🎯 **Multiple Scenarios** - Compare different investment plans
- 📱 **PWA Ready** - Can be installed as a mobile app
- 🔒 **Privacy First** - All calculations done locally

---

## 🎬 **Key Features Overview**

The SIP Calculator provides comprehensive investment planning tools with an intuitive interface and accurate calculations.

---

## 🧮 **SIP Formula & Calculations**

### Core SIP Formula
```math
M = P × ({[1 + i]^n – 1} / i) × (1 + i)
```

**Where:**
- **M** = Maturity amount you receive
- **P** = Amount you invest at regular intervals  
- **n** = Number of payments you have made
- **i** = Periodic rate of interest

### Monthly Return Calculation
```math
Monthly Return = {(1 + Annual Return)^(1/12)} – 1
```

**Important:** Never simply divide annual return by 12!
- ✅ **Correct:** 12% annual → 0.95% monthly (compounded)
- ❌ **Wrong:** 12% annual → 1% monthly (simple division)

### Example Calculation
```
Investment: ₹1,000/month for 12 months at 12% annual return
Monthly rate (i) = (1 + 0.12)^(1/12) - 1 = 0.0095 (0.95%)
Maturity Amount = ₹12,766 approximately
```

---

## 💻 **Installation**

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Priyanshu84iya/sip-calculator.git

# Navigate to project directory
cd sip-calculator

# Open in browser
open index.html
```

### Or Download
1. [📥 Download ZIP](https://github.com/Priyanshu84iya/sip-calculator/archive/main.zip)
2. Extract the files
3. Open `index.html` in your browser

### Requirements
- 🌐 Modern web browser (Chrome, Firefox, Safari, Edge)
- 📱 No additional dependencies required
- 🔒 Works offline after initial load

---

## 🚀 **Usage**

### Basic Usage
1. **Choose Investment Type:**
   - 📊 SIP Only
   - 💰 Lumpsum Only  
   - 🔄 SIP + Lumpsum Hybrid

2. **Enter Investment Details:**
   - Monthly SIP amount (if applicable)
   - Lumpsum amount (if applicable)
   - Investment period in years
   - Expected annual returns

3. **Calculate & Analyze:**
   - Click "Calculate" button
   - View detailed results
   - Analyze interactive charts
   - Export or compare scenarios

### Advanced Features
```javascript
// Example: Calculate SIP programmatically
const calculator = new SIPCalculator();
const result = calculator.calculateSIP(5000, 12, 10);
console.log(`Maturity Amount: ₹${result.toFixed(2)}`);
```

---

## 🛠️ **Technical Stack**

| Technology | Purpose | Version |
|------------|---------|---------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Structure | HTML5 |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Styling | CSS3 |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Logic | ES6+ |
| ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white) | Charts | 3.9+ |
| ![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white) | Icons | 6.0+ |

### Key Libraries
- **Chart.js** - Interactive charts and graphs
- **Font Awesome** - Beautiful icons
- **CSS Grid & Flexbox** - Modern responsive layout
- **CSS Custom Properties** - Theme system

---

## 📚 **API Reference**

### Core Functions

#### `calculateSIP(monthlyInvestment, annualRate, years)`
Calculates SIP maturity amount using compound interest formula.

```javascript
const maturityAmount = calculator.calculateSIP(5000, 12, 10);
// Returns: 1,162,666 (approximately)
```

#### `getMonthlyRate(annualRate)`
Converts annual interest rate to monthly compound rate.

```javascript
const monthlyRate = calculator.getMonthlyRate(12);
// Returns: 0.0095 (0.95%)
```

#### `calculateMaturityAmount(monthlyInvestment, lumpsumAmount, annualRate, years)`
Handles hybrid calculations (SIP + Lumpsum).

```javascript
const totalMaturity = calculator.calculateMaturityAmount(5000, 100000, 12, 10);
```

### Utility Functions

#### `formatCurrency(amount)`
Formats numbers in Indian currency format.

#### `exportResults()`
Exports calculation results to CSV file.

#### `resetCalculator()`
Resets all inputs and clears results.

---

## 🎨 **Customization**

### Theme Customization
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  /* Customize colors here */
}
```

### Adding New Features
```javascript
class SIPCalculator {
  // Add your custom methods here
  customCalculation() {
    // Your logic here
  }
}
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### How to Contribute
1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/amazing-feature`
3. 💻 Make your changes
4. ✅ Test thoroughly
5. 📝 Commit: `git commit -m 'Add amazing feature'`
6. 🚀 Push: `git push origin feature/amazing-feature`
7. 🔄 Create a Pull Request

### Development Setup
```bash
# Fork and clone
git clone https://github.com/yourusername/sip-calculator.git
cd sip-calculator

# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
# Open index.html in browser to test

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### Guidelines
- ✅ Follow existing code style
- 📝 Add comments for complex logic
- 🧪 Test on multiple browsers
- 📱 Ensure mobile compatibility
- 📚 Update documentation if needed

---

## 🐛 **Known Issues & Roadmap**

### Current Issues
- [ ] Add more chart types (bar, area charts)
- [ ] Implement offline PWA functionality
- [ ] Add more currency support
- [ ] Tax calculation features

### Roadmap
- 🔄 **v2.0**: Progressive Web App (PWA) support
- 📊 **v2.1**: Advanced analytics and reporting
- 🌍 **v2.2**: Multi-currency support
- 🤖 **v2.3**: AI-powered investment suggestions
- 📱 **v2.4**: Mobile app version

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Priyanshu84iya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 **Author**

<div align="center">

### **Priyanshu84iya**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Priyanshu84iya)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/pry_uchiha)

**"Building tools that make financial planning accessible to everyone"**

</div>

---

## 🙏 **Acknowledgments**

- 📊 **Chart.js** team for amazing charting library
- 🎨 **Font Awesome** for beautiful icons
- 💡 **MDN Web Docs** for excellent documentation
- 🌟 **Open Source Community** for inspiration
- 💰 **Financial Planning** experts for formula validation

---

## 📞 **Support**

### Need Help?

- 📧 **Email**: [priyanshukawaii@gmail.com](mailto:priyanshukawaii@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Priyanshu84iya/sip-calculator/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Priyanshu84iya/sip-calculator/discussions)

### Found a Bug?
Please create an issue with:
- 🖥️ Browser and version
- 📱 Device information
- 🔄 Steps to reproduce
- 📸 Screenshots (if applicable)

---

## 📊 **Project Stats**

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Priyanshu84iya/sip-calculator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Priyanshu84iya/sip-calculator?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Priyanshu84iya/sip-calculator?style=social)

![GitHub repo size](https://img.shields.io/github/repo-size/Priyanshu84iya/sip-calculator)
![GitHub language count](https://img.shields.io/github/languages/count/Priyanshu84iya/sip-calculator)
![GitHub top language](https://img.shields.io/github/languages/top/Priyanshu84iya/sip-calculator)

</div>

---

<div align="center">

### 🌟 **Star this repository if you found it helpful!**

**Made with ❤️ in India 🇮🇳**

[⬆️ Back to top](#-sip-calculator---systematic-investment-plan-calculator)

</div>

---

## 🔖 **Tags**

`sip-calculator` `investment` `financial-planning` `javascript` `html5` `css3` `chart-js` `responsive-design` `dark-mode` `pwa` `finance` `compound-interest` `mutual-funds` `wealth-management` `india`