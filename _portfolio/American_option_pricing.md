---
title: "American Option Pricing: Formulation and Numerical Analysis"
excerpt: "A comprehensive research project supervised by Professor Steven Campbell, investigating numerical methods for American option pricing with focus on Least Squares Monte Carlo, Laguerre polynomial basis functions, and optimal early exercise boundary estimation.<br/><img src='/images/thumbnail_american_option.png'>"
collection: portfolio
tags:
  - Quantitative Finance
  - Monte Carlo Methods
  - Option Pricing
  - Numerical Analysis
  - Stochastic Calculus
  - Python
---

## 📘 Overview

This research project provides a **comprehensive investigation of American option pricing**, spanning theoretical foundations, numerical methods, and extensive computational analysis. The work emphasizes the **Least Squares Monte Carlo (LSM)** method with **Laguerre polynomial basis functions** for approximating continuation values and estimating optimal early exercise boundaries.

American options present significant computational challenges due to their **early exercise flexibility** — unlike European options, holders can exercise at any point before expiration, creating a complex optimal stopping problem with no closed-form solution for finite-maturity cases. This project develops a rigorous mathematical framework and systematically compares classical numerical methods with advanced simulation-based approaches.

The research was conducted under the supervision of **Dr. Steven Campbell**, Limited-Term Assistant Professor in the Department of Statistics at Columbia University.

---

## 📄 Report Preview

<embed src="{{ '/files/yusang_he_Report_AmericanOption.pdf' | relative_url }}" type="application/pdf" width="100%" height="800px" />

<p style="text-align: center; margin-top: 10px;">
  <a href="{{ '/files/yusang_he_Report_AmericanOption.pdf' | relative_url }}" class="btn btn--primary" download>Download Full Report (PDF)</a>
</p>

---

## 📑 Report Structure

The complete report spans **85+ pages** organized into nine chapters:

| Chapter | Title | Content |
|---------|-------|---------|
| 1 | Introduction | Motivation and research objectives |
| 2 | Literature Review | Survey of American option pricing methods |
| 3 | Preliminaries | Probability theory, stochastic processes, martingales, optimal stopping, Black-Scholes |
| 4 | American Options Pricing | Binomial trees, Monte Carlo methods, early exercise premium |
| 5 | LSM with Laguerre Polynomials | Algorithm development, sensitivity analysis, convergence properties |
| 6 | Optimal Early Exercise Boundary | Continuation/stopping regions, parameter sensitivity |
| 7 | Monte Carlo Convergence Analysis | Price distributions, convergence rates, stability |
| 8 | Impact of Polynomial Degree | Degree selection, distribution characteristics |
| 9 | Conclusion and Future Work | Summary and extensions |

---

## 🎯 Research Objectives

1. **Develop rigorous mathematical foundations** for American option pricing under risk-neutral dynamics, including optimal stopping theory and free boundary problems

2. **Implement and compare** three valuation approaches:
   - Binomial tree models (Cox-Ross-Rubinstein framework)
   - Standard Monte Carlo simulation
   - Least Squares Monte Carlo (LSM) with basis function regression

3. **Analyze the optimal early exercise boundary** using both binomial and LSM methods, examining continuation vs. stopping region geometry

4. **Investigate basis function design** — how polynomial degree and orthogonality properties affect:
   - Continuation value approximation accuracy
   - Exercise boundary estimation
   - Computational stability and convergence

5. **Conduct comprehensive sensitivity analysis** across:
   - Numerical parameters (paths, time steps, polynomial degree)
   - Market parameters (σ, r, q, T, S₀, K)

---

## 🔬 Methodology

### Theoretical Framework

The report develops a complete mathematical foundation including:

- **Probabilistic concepts**: Filtrations, conditional expectation, martingales
- **Stochastic processes**: Brownian motion, Itô calculus, geometric Brownian motion
- **Derivative pricing theory**: Risk-neutral valuation, equivalent martingale measures
- **Optimal stopping theory**: Snell envelope, value function characterization
- **Black-Scholes framework**: PDE derivation, Greeks, model assumptions

The American option value is characterized as the solution to an optimal stopping problem:

$$V_t = \sup_{\tau \in \mathcal{T}_{t,T}} \mathbb{E}^{\mathbb{Q}}\left[e^{-r(\tau-t)} \cdot h(S_\tau) \mid \mathcal{F}_t\right]$$

where $$\mathcal{T}_{t,T}$$ denotes the set of stopping times with values in [t, T].

### Perpetual American Options

As a theoretical benchmark, the report derives the **closed-form solution for perpetual American puts**, demonstrating the smooth-pasting condition and providing analytical insight into the free boundary problem.

### Binomial Tree Method

Implementation of the Cox-Ross-Rubinstein binomial model with:
- Recursive backward valuation
- Early exercise decision at each node
- Convergence analysis as step count increases

### Least Squares Monte Carlo (LSM)

The LSM algorithm (Longstaff-Schwartz, 2001) is implemented with:
- Path-wise exercise decisions via backward induction
- Cross-sectional regression of continuation values
- Laguerre polynomial basis functions of degrees 1–6

**Algorithm structure:**
1. Simulate M stock price paths under GBM
2. At maturity, set cash flows equal to exercise value
3. Working backward: regress discounted future cash flows on basis functions
4. Compare immediate exercise vs. estimated continuation value
5. Update exercise decisions and cash flows
6. Average discounted cash flows for final price estimate

### Laguerre Polynomial Basis

Laguerre polynomials $$L_n(x) = \sum_{k=0}^{n} \binom{n}{k} \frac{(-x)^k}{k!}$$ were selected for:
- Orthogonality on $$[0, \infty)$$ with weight $$e^{-x}$$
- Natural domain alignment with asset prices
- Numerical stability in least squares regression

---

## 🔍 Key Findings

### Optimal Early Exercise Boundary Analysis

The report provides detailed analysis of the **continuation and stopping regions**:

- **Binomial method**: Visualized region delineation across the price-time lattice
- **LSM method**: Estimated boundaries using both empirical exercise decisions and regression-based approaches
- **Comparative analysis**: Consistency between binomial and LSM boundary estimates

### Parameter Sensitivity — Numerical Parameters

**Time Steps:**
- Stable estimates achieved with ≥200 time steps
- Diminishing returns beyond 500 steps

**Path Count:**
- Convergence stabilizes around 50,000 paths
- Standard error decreases proportional to $$1/\sqrt{M}$$

**Polynomial Degree:**
- **Degree 4 Laguerre polynomials** provide optimal accuracy-efficiency tradeoff
- Lower degrees (1-2): Insufficient flexibility, systematic bias
- Higher degrees (5-6): Increased variance, overfitting risk, minimal accuracy gains

### Parameter Sensitivity — Market Parameters

| Parameter | Effect on Early Exercise Boundary | Effect on Option Value |
|-----------|-----------------------------------|------------------------|
| **Volatility (σ) ↑** | Boundary shifts lower | American premium increases |
| **Interest Rate (r) ↑** | Boundary shifts higher (puts) | Earlier exercise incentive |
| **Dividend Yield (q) ↑** | Strongest effect; shifts boundary | Critical for calls on dividend stocks |
| **Time to Maturity (T) ↑** | Boundary approaches perpetual limit | Time value increases |
| **Strike Price (K) ↑** | Boundary scales proportionally | Direct payoff impact |

### Monte Carlo Convergence Analysis

- **Distribution evolution**: Price estimate distributions narrow and become more symmetric with increasing path counts
- **Convergence rate**: Empirically verified $$O(1/\sqrt{M})$$ standard error reduction
- **Stability across degrees**: Higher polynomial degrees show slightly higher variance but similar convergence rates

### Polynomial Degree Impact

Detailed analysis across degrees 1-6 reveals:

- **Low path counts**: Higher degrees exhibit greater variability
- **High path counts**: All degrees converge to similar estimates
- **Optimal choice**: Degree 4 balances bias reduction against variance inflation

---

## 📊 Numerical Experiments

The report includes extensive computational experiments:

- **Early exercise pattern analysis**: Distribution of exercise times and stock prices at exercise
- **Convergence studies**: Price estimates vs. path count (1,000 to 500,000 paths)
- **Boundary visualization**: Continuation/stopping regions across parameter ranges
- **Confidence interval analysis**: 95% CI widths across configurations

---

## 🧮 Implementation

**Language:** Python

| Library | Purpose |
|---------|---------|
| **NumPy** | Vectorized path simulation, linear algebra |
| **SciPy** | Orthogonal polynomial computation, statistical functions |
| **Matplotlib** | Visualization of boundaries, distributions, convergence |
| **Pandas** | Data organization, sensitivity analysis tables |

**Key implementation features:**
- Fully vectorized path generation for computational efficiency
- Modular architecture separating simulation, regression, and pricing
- Reproducible experiments via seeded random number generation
- Configurable parameters for systematic sensitivity studies

---

## 📚 Selected References

The complete report draws on 30+ academic sources spanning optimal stopping theory, stochastic calculus, and computational finance. Key references include:

**Foundational Theory:**
- Black, F., & Scholes, M. (1973). The pricing of options and corporate liabilities. *Journal of Political Economy*, 81(3), 637–654.
- Merton, R. C. (1973). Theory of rational option pricing. *Bell Journal of Economics and Management Science*, 4(1), 141–183.
- Cox, J. C., Ross, S. A., & Rubinstein, M. (1979). Option pricing: A simplified approach. *Journal of Financial Economics*, 7(3), 229–263.

**Optimal Stopping & Free Boundary Problems:**
- Peskir, G., & Shiryaev, A. N. (2006). *Optimal Stopping and Free-Boundary Problems*. Birkhäuser.
- Karatzas, I. (1988). On the pricing of American options. *Applied Mathematics and Optimization*, 17, 37–60.
- Bensoussan, A. (1984). On the theory of option pricing. *Acta Applicandae Mathematicae*, 2, 139–158.

**Monte Carlo Methods:**
- Longstaff, F. A., & Schwartz, E. S. (2001). Valuing American options by simulation: A simple least-squares approach. *Review of Financial Studies*, 14(1), 113–147.
- Broadie, M., & Glasserman, P. (1997). Pricing American-style securities using simulation. *Journal of Economic Dynamics and Control*, 21(8–9), 1323–1352.
- Rogers, L. C. G. (2002). Monte Carlo valuation of American options. *Mathematical Finance*, 12(3), 271–286.

**Textbooks:**
- Shreve, S. E. (2004). *Stochastic Calculus for Finance I & II*. Springer.
- Karatzas, I., & Shreve, S. E. (1998). *Methods of Mathematical Finance*. Springer.
- Privault, N. (2022). *Introduction to Stochastic Finance with Market Examples* (2nd ed.). Chapman & Hall/CRC.

---

## 🙏 Acknowledgments

I would like to express my sincere gratitude to **Dr. Steven Campbell** (Department of Statistics, Columbia University) for his guidance and mentorship throughout this project. His lecture notes for *STAT GU-4265/GR-5265: Stochastic Methods in Finance* provided the foundational framework for this research, and his expertise in stochastic calculus and computational finance was invaluable in developing both the theoretical analysis and numerical implementations. I also thank him for his patience in reviewing drafts and providing constructive feedback that significantly improved the quality of this work.

---

<p style="text-align: center; color: #666; font-size: 0.9em;">
  <em>Research Project | Columbia University | Department of Statistics</em>
</p>