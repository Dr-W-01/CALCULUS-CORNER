#!/usr/bin/env python3
"""Generate function detail HTML pages from structured data."""

import os

DOCS = os.path.join(os.path.dirname(__file__), "..", "docs")

SIDEBAR = """    <div class="page-layout flex">
        <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <aside id="sidebar" class="sidebar">
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <nav class="sidebar-nav space-y-1 text-sm">
                <a href="index.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Home</a>
                <a href="courses.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Courses</a>
                <a href="zoo.html" class="nav-item nav-active flex items-center gap-x-3 px-4 py-3 rounded-2xl">Function Zoo</a>
                <a href="visualizers.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Visualizers</a>
                <a href="profile.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">My Profile</a>
            </nav>
        </aside>

        <main class="main-content flex-1 p-8">"""

TOP_BAR = """    <div class="top-bar px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-x-3">
            <div class="w-9 h-9 bg-[#b91c1c] rounded-2xl flex items-center justify-center">
                <span class="font-bold text-white text-2xl tracking-tighter">CC</span>
            </div>
            <span class="font-semibold text-3xl tracking-tighter">Calculus Corner</span>
        </div>
        <div class="flex items-center gap-x-4">
            <input type="text" placeholder="Search..." class="bg-[#111111] border border-zinc-800 rounded-3xl px-5 py-2 text-sm w-80 focus:outline-none focus:border-zinc-600">
            <div class="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-medium">EW</div>
        </div>
    </div>"""


def sign_chart(points_html, signs_html):
    return f"""                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
{signs_html}
{points_html}
                                    </div>
                                </div>"""


def point(left, label, kind="filled"):
    cls = "sign-line-point filled" if kind == "filled" else "sign-line-point open"
    num = f'                                        <span class="sign-line-number" style="left: {left};">{label}</span>\n' if label else ""
    return f'{num}                                        <span class="{cls}" style="left: {left};"></span>'


def sign(pos, val, vert="above"):
    return f'                                        <span class="sign-line-sign {vert}" style="left: {pos};">{val}</span>'


FUNCTIONS = [
    {
        "id": "const-1",
        "page_title": "f(x) = 1",
        "heading": "THE CONSTANT FUNCTION",
        "header_katex": "f(x) = 1",
        "graphs": ["y = 1", "y = 0", "y = 0"],
        "bounds": {"left": -5, "right": 5, "bottom": -2, "top": 4},
        "facts": [
            ("Domain", r"(-\infty, \infty)", True),
            ("Range", r"\{1\}", True),
            ("x-intercepts", "None", False),
            ("y-intercepts", r"(0, 1)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", r"y = 1", True),
            ("Continuity", "Continuous for all real numbers", False),
            ("Differentiability", "Differentiable for all real numbers", False),
            ("Symmetry", 'even <span data-katex="f(-x) = f(x)"></span>', False),
        ],
        "intro": "This seemingly very simple function is an important example of a function where every point is a critical point, and every point is the location of an absolute max, absolute min, local max, and local min. Because its slope is zero, it is neither increasing nor decreasing anywhere. Because it is a straight line, it has no concavity.",
        "behavior": [
            ("Discontinuities", "None"),
            ("Non-differentiability", "None"),
            ("Absolute Maximum", r"f(x) = 1 for all x", True),
            ("Absolute Minimum", r"f(x) = 1 for all x", True),
            ("Relative Maximum", r"f(x) = 1 for all x", True),
            ("Relative Minimum", r"f(x) = 1 for all x", True),
            ("Increasing", "None"),
            ("Decreasing", "None"),
            ("Concave Up", "None"),
            ("Concave Down", "None"),
            ("Inflection Points", "None"),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} 1 = 1", r"\lim_{x \to -\infty} 1 = 1"]),
            (r"Limit at a point", [r"\lim_{x \to 0} 1 = 1"]),
            (r"General limit", [r"\lim_{x \to a} 1 = 1 \text{ for all real numbers } a"]),
        ],
        "deriv_titles": [r"f(x) = 1", r"f'(x) = 0", r"f''(x) = 0"],
        "f_sign": (sign("25%", "+") + "\n" + sign("75%", "+"), ""),
        "fp_sign": (sign("50%", "0"), ""),
        "fpp_sign": (sign("50%", "0"), ""),
        "f_analysis": r"The constant function equals 1 everywhere, so <span data-katex=\"f(x) > 0\"></span> on <span data-katex=\"(-\infty, \infty)\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> None</p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical points:</strong> Every real number (since <span data-katex=\"f'(x) = 0\"></span> everywhere).</p>",
        "fpp_analysis": "<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>",
        "integrals": [
            (r"\int 1 \, dx = x + C", None),
            (r"\int_0^1 1 \, dx = 1", None),
        ],
    },
    {
        "id": "linear-x",
        "page_title": "f(x) = x",
        "heading": "THE LINEAR FUNCTION",
        "header_katex": "f(x) = x",
        "graphs": ["y = x", "y = 1", "y = 0"],
        "facts": [
            ("Domain", r"(-\infty, \infty)", True),
            ("Range", r"(-\infty, \infty)", True),
            ("x-intercepts", r"(0, 0)", True),
            ("y-intercepts", r"(0, 0)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", "None", False),
            ("Continuity", "Continuous for all real numbers", False),
            ("Differentiability", "Differentiable for all real numbers", False),
            ("Symmetry", 'odd <span data-katex="f(-x) = -f(x)"></span>', False),
        ],
        "intro": "The oblique line is an important example of a function which has no critical points and also no concavity.",
        "behavior": [
            ("Discontinuities", "None"),
            ("Non-differentiability", "None"),
            ("Absolute Maximum", "None"),
            ("Absolute Minimum", "None"),
            ("Relative Maximum", "None"),
            ("Relative Minimum", "None"),
            ("Increasing", r"(-\infty, \infty)", True),
            ("Decreasing", "None"),
            ("Concave Up", "None"),
            ("Concave Down", "None"),
            ("Inflection Points", "None"),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} x = \infty", r"\lim_{x \to -\infty} x = -\infty"]),
            (r"Limit at a point", [r"\lim_{x \to 0} x = 0"]),
            (r"General limit", [r"\lim_{x \to a} x = a \text{ for all real numbers } a"]),
        ],
        "deriv_titles": [r"f(x) = x", r"f'(x) = 1", r"f''(x) = 0"],
        "f_sign": (sign("25%", "−", "below") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fp_sign": (sign("25%", "+") + "\n" + sign("75%", "+"), ""),
        "fpp_sign": (sign("50%", "0"), ""),
        "f_analysis": r"The identity function passes through the origin. <span data-katex=\"f(x) < 0\"></span> for <span data-katex=\"x < 0\"></span> and <span data-katex=\"f(x) > 0\"></span> for <span data-katex=\"x > 0\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> <span data-katex=\"(-\infty, \infty)\"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical points:</strong> None</p>",
        "fpp_analysis": "<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>",
        "integrals": [
            (r"\int x \, dx = \frac{x^2}{2} + C", None),
            (r"\int_0^1 x \, dx = \frac{1}{2}", None),
        ],
    },
    {
        "id": "quadratic-x2",
        "page_title": "f(x) = x^2",
        "heading": "THE PARABOLA",
        "header_katex": "f(x) = x^2",
        "graphs": ["y = x^2", "y = 2x", "y = 2"],
        "facts": [
            ("Domain", r"(-\infty, \infty)", True),
            ("Range", r"[0, \infty)", True),
            ("x-intercepts", r"(0, 0)", True),
            ("y-intercepts", r"(0, 0)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", "None", False),
            ("Continuity", "Continuous for all real numbers", False),
            ("Differentiability", "Differentiable for all real numbers", False),
            ("Symmetry", 'even <span data-katex="f(-x) = f(x)"></span>', False),
        ],
        "intro": "The parabola is our first example of a function with only one absolute extrema (its absolute minimum of 0) and where the absolute minimum is also a local minimum. This does not always have to coincide, as other examples will show.",
        "behavior": [
            ("Discontinuities", "None"),
            ("Non-differentiability", "None"),
            ("Absolute Maximum", "None"),
            ("Absolute Minimum", r"f(0) = 0 at x = 0", True),
            ("Relative Maximum", "None"),
            ("Relative Minimum", r"f(0) = 0 at x = 0", True),
            ("Increasing", r"(0, \infty)", True),
            ("Decreasing", r"(-\infty, 0)", True),
            ("Concave Up", r"(-\infty, \infty)", True),
            ("Concave Down", "None"),
            ("Inflection Points", "None"),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} x^2 = \infty", r"\lim_{x \to -\infty} x^2 = \infty"]),
            (r"Limit at a point", [r"\lim_{x \to 0} x^2 = 0"]),
            (r"General limit", [r"\lim_{x \to a} x^2 = a^2 \text{ for all real numbers } a"]),
        ],
        "deriv_titles": [r"f(x) = x^2", r"f'(x) = 2x", r"f''(x) = 2"],
        "f_sign": (sign("25%", "+") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fp_sign": (sign("25%", "−", "below") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fpp_sign": (sign("25%", "+") + "\n" + sign("75%", "+"), ""),
        "f_analysis": r"The parabola opens upward with vertex at the origin. <span data-katex=\"f(x) \geq 0\"></span> for all real <span data-katex=\"x\"></span>, with <span data-katex=\"f(0) = 0\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> <span data-katex=\"(0, \infty)\"></span></p><p><strong>Intervals of decrease:</strong> <span data-katex=\"(-\infty, 0)\"></span></p><p><strong>Critical point at</strong> <span data-katex=\"x = 0\"></span>: relative and absolute minimum.</p>",
        "fpp_analysis": "<p><strong>Concave up:</strong> <span data-katex=\"(-\infty, \infty)\"></span></p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>",
        "integrals": [
            (r"\int x^2 \, dx = \frac{x^3}{3} + C", None),
            (r"\int_0^1 x^2 \, dx = \frac{1}{3}", None),
        ],
    },
    {
        "id": "cubic-x3",
        "page_title": "f(x) = x^3",
        "heading": "THE CUBIC FUNCTION",
        "header_katex": "f(x) = x^3",
        "graphs": ["y = x^3", "y = 3x^2", "y = 6x"],
        "facts": [
            ("Domain", r"(-\infty, \infty)", True),
            ("Range", r"(-\infty, \infty)", True),
            ("x-intercepts", r"(0, 0)", True),
            ("y-intercepts", r"(0, 0)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", "None", False),
            ("Continuity", "Continuous for all real numbers", False),
            ("Differentiability", "Differentiable for all real numbers", False),
            ("Symmetry", 'odd <span data-katex="f(-x) = -f(x)"></span>', False),
        ],
        "intro": "The cubic function is our first example of a point of inflection. This point of inflection happens to also be a critical point, though that is not necessarily always the case. A function like <span data-katex=\"f(x) = x(x-1)(x-3)\"></span> has a point of inflection which is not a critical point. This example is important because we have a critical point where the function is increasing at that critical point.",
        "behavior": [
            ("Discontinuities", "None"),
            ("Non-differentiability", "None"),
            ("Absolute Maximum", "None"),
            ("Absolute Minimum", "None"),
            ("Relative Maximum", "None"),
            ("Relative Minimum", "None"),
            ("Increasing", r"(-\infty, \infty)", True),
            ("Decreasing", "None"),
            ("Concave Up", r"(0, \infty)", True),
            ("Concave Down", r"(-\infty, 0)", True),
            ("Inflection Points", r"(0, 0)", True),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} x^3 = \infty", r"\lim_{x \to -\infty} x^3 = -\infty"]),
            (r"Limit at a point", [r"\lim_{x \to 0} x^3 = 0"]),
            (r"General limit", [r"\lim_{x \to a} x^3 = a^3 \text{ for all real numbers } a"]),
        ],
        "deriv_titles": [r"f(x) = x^3", r"f'(x) = 3x^2", r"f''(x) = 6x"],
        "f_sign": (sign("25%", "−", "below") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fp_sign": (sign("25%", "+") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fpp_sign": (sign("25%", "−", "below") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "f_analysis": r"The original cubic passes through the origin. <span data-katex=\"f(x) < 0\"></span> for <span data-katex=\"x < 0\"></span> and <span data-katex=\"f(x) > 0\"></span> for <span data-katex=\"x > 0\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> <span data-katex=\"(-\infty, \infty)\"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical point at</strong> <span data-katex=\"x = 0\"></span>: neither a relative max nor min — the function is increasing through the critical point.</p>",
        "fpp_analysis": "<p><strong>Concave down:</strong> <span data-katex=\"(-\infty, 0)\"></span></p><p><strong>Concave up:</strong> <span data-katex=\"(0, \infty)\"></span></p><p><strong>Inflection point:</strong> <span data-katex=\"(0, 0)\"></span></p>",
        "integrals": [
            (r"\int x^3 \, dx = \frac{x^4}{4} + C", None),
            (r"\int_0^1 x^3 \, dx = \frac{1}{4}", None),
        ],
    },
    {
        "id": "sqrt-x",
        "page_title": r"f(x) = \sqrt{x}",
        "heading": "THE SQUARE ROOT FUNCTION",
        "header_katex": r"f(x) = \sqrt{x}",
        "graphs": [r"y = \sqrt{x}", r"y = \frac{1}{2\sqrt{x}}", r"y = -\frac{1}{4x^{3/2}}"],
        "bounds": {"left": -1, "right": 5, "bottom": -1, "top": 4},
        "facts": [
            ("Domain", r"[0, \infty)", True),
            ("Range", r"[0, \infty)", True),
            ("x-intercepts", r"(0, 0)", True),
            ("y-intercepts", r"(0, 0)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", "None", False),
            ("Continuity", "Continuous on its domain; endpoint discontinuity at x = 0", False),
            ("Differentiability", "Differentiable on (0, ∞); not differentiable at x = 0", False),
            ("Symmetry", "None", False),
        ],
        "intro": "The square root function is an important example of an absolute minimum which is not a local minimum. Since the function has an endpoint at 0 we have a discontinuity and so the derivative does not exist. The function is not defined on the left of zero and so 0 is not a local minimum.",
        "behavior": [
            ("Discontinuities", "Endpoint discontinuity at x = 0 (left-hand limit does not exist)", False),
            ("Non-differentiability", r"x = 0", True),
            ("Absolute Maximum", "None"),
            ("Absolute Minimum", r"f(0) = 0 at x = 0", True),
            ("Relative Maximum", "None"),
            ("Relative Minimum", "None"),
            ("Increasing", r"(0, \infty)", True),
            ("Decreasing", "None"),
            ("Concave Up", "None"),
            ("Concave Down", r"(0, \infty)", True),
            ("Inflection Points", "None"),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} \sqrt{x} = \infty"]),
            (r"Limit at a point", [r"\lim_{x \to 0^+} \sqrt{x} = 0"]),
            (r"General limit", [r"\lim_{x \to a} \sqrt{x} = \sqrt{a} \text{ for } a > 0"]),
        ],
        "deriv_titles": [r"f(x) = \sqrt{x}", r"f'(x) = \frac{1}{2\sqrt{x}}", r"f''(x) = -\frac{1}{4x^{3/2}}"],
        "f_sign": (sign("35%", "0", "below") + "\n" + sign("70%", "+") + "\n" + point("25%", "0", "filled"), ""),
        "fp_sign": (sign("60%", "+") + "\n" + point("25%", "0", "open"), ""),
        "fpp_sign": (sign("60%", "−", "below") + "\n" + point("25%", "0", "open"), ""),
        "f_analysis": r"The square root starts at the origin and is defined only for <span data-katex=\"x \geq 0\"></span>. <span data-katex=\"f(0) = 0\"></span> and <span data-katex=\"f(x) > 0\"></span> for <span data-katex=\"x > 0\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> <span data-katex=\"(0, \infty)\"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>At</strong> <span data-katex=\"x = 0\"></span>: derivative undefined (endpoint of domain).</p>",
        "fpp_analysis": "<p><strong>Concave down:</strong> <span data-katex=\"(0, \infty)\"></span></p><p><strong>Concave up:</strong> None</p><p><strong>Inflection points:</strong> None</p>",
        "integrals": [
            (r"\int \sqrt{x} \, dx = \frac{2}{3} x^{3/2} + C", None),
            (r"\int_0^1 \sqrt{x} \, dx = \frac{2}{3}", None),
        ],
    },
    {
        "id": "cbrt-x",
        "page_title": r"f(x) = \sqrt[3]{x}",
        "heading": "THE CUBE ROOT FUNCTION",
        "header_katex": r"f(x) = \sqrt[3]{x}",
        "graphs": ["y = x^{1/3}", r"y = \frac{1}{3x^{2/3}}", r"y = -\frac{2}{9x^{5/3}}"],
        "facts": [
            ("Domain", r"(-\infty, \infty)", True),
            ("Range", r"(-\infty, \infty)", True),
            ("x-intercepts", r"(0, 0)", True),
            ("y-intercepts", r"(0, 0)", True),
            ("Vertical Asymptotes", "None", False),
            ("Horizontal Asymptotes", "None", False),
            ("Continuity", "Continuous for all real numbers", False),
            ("Differentiability", "Differentiable for x ≠ 0; vertical tangent at x = 0", False),
            ("Symmetry", 'odd <span data-katex="f(-x) = -f(x)"></span>', False),
        ],
        "intro": "This is an important example of a vertical tangent line. This is a critical point where, geometrically, the tangent line is defined but the slope is not defined. This critical point also happens to be a point of inflection, so both kinds of critical points can be inflection points. This function is also the inverse of the cubic function.",
        "behavior": [
            ("Discontinuities", "None"),
            ("Non-differentiability", r"x = 0 \text{ (vertical tangent)}", True),
            ("Absolute Maximum", "None"),
            ("Absolute Minimum", "None"),
            ("Relative Maximum", "None"),
            ("Relative Minimum", "None"),
            ("Increasing", r"(-\infty, \infty)", True),
            ("Decreasing", "None"),
            ("Concave Up", r"(-\infty, 0)", True),
            ("Concave Down", r"(0, \infty)", True),
            ("Inflection Points", r"(0, 0)", True),
        ],
        "limits": [
            (r"Limits as x \to \pm\infty", [r"\lim_{x \to \infty} \sqrt[3]{x} = \infty", r"\lim_{x \to -\infty} \sqrt[3]{x} = -\infty"]),
            (r"Limit at a point", [r"\lim_{x \to 0} \sqrt[3]{x} = 0"]),
            (r"General limit", [r"\lim_{x \to a} \sqrt[3]{x} = \sqrt[3]{a} \text{ for all real numbers } a"]),
        ],
        "deriv_titles": [r"f(x) = \sqrt[3]{x}", r"f'(x) = \frac{1}{3x^{2/3}}", r"f''(x) = -\frac{2}{9x^{5/3}}"],
        "f_sign": (sign("25%", "−", "below") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "filled"), ""),
        "fp_sign": (sign("25%", "+") + "\n" + sign("75%", "+") + "\n" + point("50%", "0", "open"), ""),
        "fpp_sign": (sign("25%", "+") + "\n" + sign("75%", "−", "below") + "\n" + point("50%", "0", "open"), ""),
        "f_analysis": r"The cube root passes through the origin. <span data-katex=\"f(x) < 0\"></span> for <span data-katex=\"x < 0\"></span> and <span data-katex=\"f(x) > 0\"></span> for <span data-katex=\"x > 0\"></span>.",
        "fp_analysis": "<p><strong>Intervals of increase:</strong> <span data-katex=\"(-\infty, \infty)\"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>At</strong> <span data-katex=\"x = 0\"></span>: derivative undefined (vertical tangent).</p>",
        "fpp_analysis": "<p><strong>Concave up:</strong> <span data-katex=\"(-\infty, 0)\"></span></p><p><strong>Concave down:</strong> <span data-katex=\"(0, \infty)\"></span></p><p><strong>Inflection point:</strong> <span data-katex=\"(0, 0)\"></span></p>",
        "integrals": [
            (r"\int \sqrt[3]{x} \, dx = \frac{3}{4} x^{4/3} + C", None),
            (r"\int_0^1 \sqrt[3]{x} \, dx = \frac{3}{4}", None),
        ],
    },
]


def fact_cell(label, value, is_katex):
    if is_katex:
        return f'                                <div><p class="fact-label">{label}</p><div class="fact-value" data-katex="{value}"></div></div>'
    return f'                                <div><p class="fact-label">{label}</p><div class="fact-value">{value}</div></div>'


def behavior_cell(label, value, is_katex, full_width=False):
    span = f'<span data-katex="{value}"></span>' if is_katex else value
    style = ' style="grid-column: 1 / -1;"' if full_width else ""
    return f'                            <div{style}><span class="meta-label">{label}</span><br>{span}</div>'


def render_page(fn):
    bounds = fn.get("bounds", {"left": -5, "right": 5, "bottom": -5, "top": 5})
    facts_html = "\n".join(fact_cell(*f[:2], f[2] if len(f) > 2 else False) for f in fn["facts"])
    symmetry = fn["facts"][-1]
    if symmetry[0] == "Symmetry":
        facts_html = "\n".join(
            fact_cell(*f[:2], f[2] if len(f) > 2 else False)
            for f in fn["facts"][:-1]
        )
        facts_html += f'\n                                <div style="grid-column: 1 / -1;"><p class="fact-label">Symmetry</p><div class="fact-value">{symmetry[1]}</div></div>'

    behavior_html = "\n".join(
        behavior_cell(b[0], b[1], b[2] if len(b) > 2 else False, b[0] == "Inflection Points")
        for b in fn["behavior"]
    )

    limits_html = ""
    for sub, items in fn["limits"]:
        if len(items) > 1:
            inner = "\n".join(f'                                <span data-katex="{it}"></span>' for it in items)
            limits_html += f"""                        <div>
                            <p class="limit-subheading">{sub}</p>
                            <div class="text-center text-lg text-zinc-200 flex flex-wrap justify-center gap-x-4 gap-y-2">
{inner}
                            </div>
                        </div>
"""
        else:
            limits_html += f"""                        <div>
                            <p class="limit-subheading">{sub}</p>
                            <div class="text-center text-lg text-zinc-200" data-katex="{items[0]}"></div>
                        </div>
"""

    f_signs, f_pts = fn["f_sign"]
    fp_signs, fp_pts = fn["fp_sign"]
    fpp_signs, fpp_pts = fn["fpp_sign"]

    f_chart = sign_chart(f_pts, f_signs)
    fp_chart = sign_chart(fp_pts, fp_signs)
    fpp_chart = sign_chart(fpp_pts, fpp_signs)

    integrals_html = ""
    for i, (tex, _) in enumerate(fn["integrals"]):
        label = "Indefinite Integral" if i == 0 else "Definite Integral (example)"
        integrals_html += f"""                        <div>
                            <p class="meta-label mb-1">{label}</p>
                            <div data-katex="{tex}"></div>
                        </div>
"""

    fp_analysis = fn["fp_analysis"]
    if fp_analysis.startswith("<p>"):
        fp_block = f'                                <div class="chart-analysis">\n                                    {fp_analysis}\n                                </div>'
    else:
        fp_block = f'                                <p class="chart-analysis">{fp_analysis}</p>'

    fpp_analysis = fn["fpp_analysis"]
    if fpp_analysis.startswith("<p>"):
        fpp_block = f'                                <div class="chart-analysis">\n                                    {fpp_analysis}\n                                </div>'
    else:
        fpp_block = f'                                <p class="chart-analysis">{fpp_analysis}</p>'

    f_analysis = fn["f_analysis"]
    if f_analysis.startswith("<p>"):
        f_block = f'                                <div class="chart-analysis">\n                                    {f_analysis}\n                                </div>'
    else:
        f_block = f'                                <p class="chart-analysis">{f_analysis}</p>'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{fn['page_title']} • Calculus Corner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
    <link rel="stylesheet" href="css/site.css">
</head>
<body>
{TOP_BAR}

{SIDEBAR}
            <div class="w-full max-w-4xl mx-auto space-y-8">

                <header class="text-center">
                    <a href="zoo.html" class="text-sm text-zinc-500 hover:text-red-400 mb-4 inline-block">&larr; Back to Function Zoo</a>
                    <h1 class="text-2xl font-bold tracking-wide text-[#c45050] mb-4">{fn['heading']}</h1>
                    <div id="header-expr" class="text-3xl text-white"></div>
                </header>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Overview</h2>
                    </div>
                    <div class="section-body graph-facts-row">
                        <div class="w-full md:w-1/2 shrink-0">
                            <div class="graph-wrap-sm max-w-[22rem] mx-auto overflow-hidden rounded-xl border border-[#523030]">
                                <div id="graph-f-main" class="desmos-graph w-full h-full min-h-[12rem]"></div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex-1">
                            <div class="fact-pair">
{facts_html}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Description &amp; Behavior</h2>
                    </div>
                    <div class="section-body">
                        <p class="behavior-intro text-zinc-200 text-lg leading-relaxed mb-6">
                            {fn['intro']}
                        </p>
                        <div class="behavior-grid text-sm text-zinc-300">
{behavior_html}
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Limits</h2>
                    </div>
                    <div class="section-body space-y-4">
{limits_html}                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Derivatives</h2>
                    </div>
                    <div class="section-body">
                        <div class="graph-trio">

                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="{fn['deriv_titles'][0]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-f" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
{f_chart}
{f_block}
                            </div>

                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="{fn['deriv_titles'][1]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-fp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
{fp_chart}
{fp_block}
                            </div>

                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="{fn['deriv_titles'][2]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-fpp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
{fpp_chart}
{fpp_block}
                            </div>

                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Integrals</h2>
                    </div>
                    <div class="section-body space-y-4 text-lg text-zinc-200 text-center">
{integrals_html}                    </div>
                </section>

            </div>
        </main>
    </div>

    <script src="js/site.js"></script>
    <script src="js/function-detail.js"></script>
    <script>
        FunctionDetail.init({{
            headerKatex: {repr(fn['header_katex'])},
            graphs: {repr(fn['graphs'])},
            bounds: {bounds}
        }});
    </script>
</body>
</html>
"""


def main():
    for fn in FUNCTIONS:
        path = os.path.join(DOCS, f"function-{fn['id']}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(render_page(fn))
        print(f"Wrote {path}")


if __name__ == "__main__":
    main()