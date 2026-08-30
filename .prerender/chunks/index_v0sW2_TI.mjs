import { S as unescapeHTML, U as InvalidComponentArgs, _ as addAttribute, d as renderSlot, g as renderHead, h as maybeRenderHead, m as renderTemplate, ot as AstroError, s as renderComponent, w as createAstro } from "./jsx-runtime_C_U6X7Lh.mjs";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
//#endregion
//#region src/components/islands/ThemeToggle.tsx
var ThemeToggle = () => {
	const [theme, setTheme] = useState("dark");
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("theme");
		const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
		setTheme(initialTheme);
		document.documentElement.classList.toggle("dark", initialTheme === "dark");
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);
	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		localStorage.setItem("theme", nextTheme);
		document.documentElement.classList.toggle("dark", nextTheme === "dark");
		document.documentElement.setAttribute("data-theme", nextTheme);
	};
	if (!mounted) return /* @__PURE__ */ jsx("div", { className: "w-8 h-8" });
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: toggleTheme,
		className: "touch-target p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none",
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, {
			className: "w-4 h-4 text-[var(--accent)]",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ jsx(Moon, {
			className: "w-4 h-4 text-[var(--text-primary)]",
			"aria-hidden": "true"
		})
	});
};
//#endregion
//#region src/components/islands/MobileNavDrawer.tsx
var NAV_LINKS = [
	{
		label: "Systems & Case Studies",
		href: "#projects"
	},
	{
		label: "Capabilities",
		href: "#skills"
	},
	{
		label: "Track Record",
		href: "#experience"
	},
	{
		label: "Engineering Philosophy",
		href: "#about"
	},
	{
		label: "Contact",
		href: "#contact"
	}
];
var MobileNavDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
	const handleLinkClick = () => {
		setIsOpen(false);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "lg:hidden",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => setIsOpen(true),
			className: "touch-target p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none",
			"aria-label": "Open Navigation Menu",
			"aria-expanded": isOpen,
			children: /* @__PURE__ */ jsx(Menu, {
				className: "w-5 h-5",
				"aria-hidden": "true"
			})
		}), isOpen && /* @__PURE__ */ jsxs("div", {
			className: "fixed inset-0 z-50 flex justify-end",
			children: [/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity",
				onClick: () => setIsOpen(false),
				"aria-hidden": "true"
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative w-full max-w-xs bg-[var(--bg-app)] border-l border-[var(--border-strong)] h-full p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Mobile Navigation",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Terminal, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", { children: "Navigation Mesh" })]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setIsOpen(false),
						className: "touch-target p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-[var(--radius-sm)]",
						"aria-label": "Close Navigation Menu",
						children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
					})]
				}), /* @__PURE__ */ jsx("nav", {
					className: "mt-6 flex flex-col space-y-2",
					children: NAV_LINKS.map((link, idx) => /* @__PURE__ */ jsxs("a", {
						href: link.href,
						onClick: handleLinkClick,
						className: "touch-target px-3 py-2.5 font-mono text-[var(--text-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] border border-transparent hover:border-[var(--border-subtle)] transition-all flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("span", { children: [
							"0",
							idx + 1,
							". ",
							link.label
						] }), /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 opacity-50" })]
					}, link.href))
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "pt-6 border-t border-[var(--border-subtle)] space-y-3 font-mono text-[var(--text-xs)]",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-[var(--text-tertiary)]",
						children: "Harsh Thanki · Applied AI Systems"
					}), /* @__PURE__ */ jsx("a", {
						href: "#contact",
						onClick: handleLinkClick,
						className: "touch-target w-full py-2.5 px-4 bg-[var(--accent)] text-[var(--accent-text)] text-center font-medium hover:bg-[var(--accent-hover)] transition-colors block",
						children: "Initiate Direct Contact →"
					})]
				})]
			})]
		})]
	});
};
//#endregion
//#region src/components/Navbar.astro
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface-overlay)] backdrop-blur-xl transition-all duration-300"><div class="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)] h-16 flex items-center justify-between gap-4"><!-- Logo / Brand Identifier with Solar Glow Ring --><a href="#hero" class="flex items-center gap-3 font-mono text-[var(--text-sm)] text-[var(--text-primary)] group focus-visible:outline-none" aria-label="Harsh Thanki Portfolio Home"><div class="relative flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] group-hover:border-[var(--accent)] transition-colors shadow-xs"><span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"></span></div><div class="flex flex-col"><span class="font-bold tracking-tight leading-none text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">HARSH THANKI</span><span class="text-[10px] text-[var(--text-tertiary)] tracking-wider mt-0.5">APPLIED AI &middot; MERN</span></div></a><!-- Desktop Navigation Links (Pill Style) --><nav class="hidden lg:flex items-center gap-1 p-1 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-full font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-secondary)] shadow-xs" aria-label="Main Navigation"><a href="#projects" class="px-3.5 py-1.5 rounded-full hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all">01 // Systems</a><a href="#telemetry" class="px-3.5 py-1.5 rounded-full hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all">02 // Telemetry</a><a href="#skills" class="px-3.5 py-1.5 rounded-full hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all">03 // Stack</a><a href="#experience" class="px-3.5 py-1.5 rounded-full hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all">04 // Timeline</a><a href="#about" class="px-3.5 py-1.5 rounded-full hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all">05 // Philosophy</a></nav><!-- Right Controls: Theme Toggle & Direct Contact CTA --><div class="flex items-center gap-3">${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Projects/Portfolio_Website/src/components/islands/ThemeToggle.tsx",
		"client:component-export": "ThemeToggle"
	})}<a href="#contact" class="hidden sm:inline-flex touch-target px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent-gradient)] text-[var(--accent-text)] font-mono text-[var(--text-xs)] font-semibold hover:shadow-[0_0_20px_var(--accent-glow)] transition-all transform hover:-translate-y-0.5 active:translate-y-0">Let's Connect &rarr;</a><!-- Mobile Navigation Drawer -->${renderComponent($$result, "MobileNavDrawer", MobileNavDrawer, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "D:/Projects/Portfolio_Website/src/components/islands/MobileNavDrawer.tsx",
		"client:component-export": "MobileNavDrawer"
	})}</div></div></header>`;
}, "D:/Projects/Portfolio_Website/src/components/Navbar.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8 font-mono text-[var(--text-xs)] text-[var(--text-tertiary)]" role="contentinfo"><div class="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)] flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span><span>© ${currentYear} Harsh Thanki · Engineered for Zero Marginal Latency &amp; Cost</span></div><div class="flex flex-wrap items-center gap-4 text-[11px]"><a href="#hero" class="hover:text-[var(--text-primary)] transition-colors">↑ Top</a><span class="opacity-30">/</span><a href="#projects" class="hover:text-[var(--text-primary)] transition-colors">Case Studies</a><span class="opacity-30">/</span><a href="#telemetry" class="hover:text-[var(--text-primary)] transition-colors">MERN Telemetry</a><span class="opacity-30">/</span><a href="https://github.com/harshthanki-codes" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text-primary)] transition-colors">GitHub</a></div></div></footer>`;
}, "D:/Projects/Portfolio_Website/src/components/Footer.astro", void 0);
//#endregion
//#region src/data/projects.ts
var PROJECTS_DATA = [
	{
		id: "erp-llm-foundation",
		title: "Autonomous ERP Intelligence Engine — Fine-Tuned Open-Weights LLMs",
		tagline: "Locally deployed, fine-tuned open-weights coding intelligence beating commercial API benchmarks at zero marginal token cost.",
		status: "Active",
		statusDetail: "Active — Phase 2 in progress",
		statusWeight: 1,
		categories: [
			"AI/ML",
			"DevTools",
			"ERP"
		],
		tags: [
			"AI/ML",
			"LLM Fine-Tuning",
			"ERP Systems",
			"DevTools"
		],
		stack: [
			"Python",
			"HuggingFace Transformers",
			"PEFT/LoRA",
			"QLoRA",
			"BitsAndBytes",
			"Ollama",
			"Unsloth",
			"PyTorch"
		],
		primaryTech: [
			"PEFT/QLoRA",
			"Ollama",
			"Unsloth",
			"Python"
		],
		problem: "Cloud coding assistants incur recurring per-token expenses and risk leaking proprietary enterprise ERP business logic off-premise.",
		constraint: "Fine-tuning open-source models (DeepSeek Coder 6.7B, Qwen 2.5 Coder 7B, Mistral 7B) on consumer GPU compute to accurately comprehend complex ORM quirks, XML architecture views, and relational constraints.",
		architecture: {
			description: "Ingested raw enterprise codebases across 8 curated sources -> Cleaned and tokenized into structured instruction pairs -> QLoRA 4-bit quantized fine-tuning via Unsloth & PEFT -> Local Ollama air-gapped runtime -> Custom transparent proxy bridge intercepting CLI calls and routing directly to on-premise weights.",
			flowTitle: "On-Premise Fine-Tuning & Local Proxy Bridge Pipeline",
			nodes: [
				{
					id: "1",
					label: "150MB+ ERP Codebase Dataset",
					sub: "8 curated source corpora",
					type: "input"
				},
				{
					id: "2",
					label: "QLoRA 4-bit Quantization",
					sub: "Unsloth + Transformers",
					type: "process"
				},
				{
					id: "3",
					label: "Domain-Tuned Weights",
					sub: "DeepSeek / Qwen 2.5",
					type: "process"
				},
				{
					id: "4",
					label: "Air-Gapped Ollama Runtime",
					sub: "Local Hardware Engine",
					type: "process"
				},
				{
					id: "5",
					label: "Transparent Proxy Bridge",
					sub: "CLI Interception Layer",
					type: "decision"
				},
				{
					id: "6",
					label: "IDE Developer Agent",
					sub: "$0 Marginal Token Cost",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2"
				},
				{
					from: "2",
					to: "3"
				},
				{
					from: "3",
					to: "4"
				},
				{
					from: "4",
					to: "5"
				},
				{
					from: "5",
					to: "6"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "Benchmark Score",
					value: "8.7 / 10"
				},
				{
					label: "Baseline (Claude Sonnet 5)",
					value: "10 / 10"
				},
				{
					label: "Marginal Token Cost",
					value: "$0.00"
				},
				{
					label: "Internal Eval Suite",
					value: "22 Tests / 10 Cats"
				}
			],
			summary: "Domain-tuned DeepSeek Coder scored 8.7/10 against Claude Sonnet 5 on ORM/XML/logic benchmarks at $0 marginal cost. Built a comprehensive 22-test internal evaluation suite and expanded training corpora to 150MB+."
		}
	},
	{
		id: "financial-ledger-multi-currency",
		title: "High-Throughput Financial Ledger & Multi-Currency ERP Engine",
		tagline: "High-throughput financial ledger tracking materials, labour, and live FX rates with zero UI-blocking synchronous operations.",
		status: "Complete",
		statusDetail: "Feature-complete",
		statusWeight: 3,
		categories: ["ERP", "Automation"],
		tags: [
			"ERP Architecture",
			"Financial Ledger",
			"PostgreSQL",
			"Performance Optimization"
		],
		stack: [
			"Python",
			"Odoo ORM",
			"PostgreSQL",
			"XML/QWeb",
			"ECB FX Rate API",
			"In-Memory Cache"
		],
		primaryTech: [
			"ERP ORM",
			"PostgreSQL",
			"Python",
			"Asynchronous Queues"
		],
		problem: "Project-based operations require multi-currency, categorized cost tracking (materials, labour, overhead) tied live to purchase orders, vendor invoices, and timesheets.",
		constraint: "Synchronous external FX rate API lookups were freezing client sessions, and computed fields triggered severe N+1 query cascades across massive timesheet tables.",
		architecture: {
			description: "Refactored backend architecture to introduce an automated FX rate cache layer, compound database indexing, and asynchronous batch rollups eliminating synchronous API locks and query cascades.",
			flowTitle: "Dual-Currency Computed Rollup & Asynchronous FX Engine",
			nodes: [
				{
					id: "1",
					label: "Source Invoices & Orders",
					sub: "Multi-currency ledger",
					type: "input"
				},
				{
					id: "2",
					label: "FX Rate Cache Layer",
					sub: "Automated Rate Sync",
					type: "process"
				},
				{
					id: "3",
					label: "Batch ORM Resolver",
					sub: "Indexed DB Rollup",
					type: "process"
				},
				{
					id: "4",
					label: "Master Financial Sheet",
					sub: "Zero-Latency View",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "3"
				},
				{
					from: "2",
					to: "3"
				},
				{
					from: "3",
					to: "4"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "Security & Perf Audit",
					value: "Passed 100%"
				},
				{
					label: "N+1 Query Resolution",
					value: "0 Cascades"
				},
				{
					label: "UI Blocking Time",
					value: "0ms"
				}
			],
			summary: "Production-grade, standards-compliant, and passed a full security/performance audit resolving critical N+1 database queries, synchronous UI locks, and missing database indexes."
		}
	},
	{
		id: "multimodal-voice-failover-dag",
		title: "Multimodal Voice-to-Order Ingestion & 7-Tier Failover DAG",
		tagline: "End-to-end multimodal audio ingestion converting complex multilingual voice calls into verified ERP sales and purchase orders.",
		status: "Field Testing",
		statusDetail: "Active field testing",
		statusWeight: 2,
		categories: [
			"AI/ML",
			"Mobile",
			"ERP",
			"Automation"
		],
		tags: [
			"AI/ML",
			"Speech-to-Structured-Data",
			"ERP Automation",
			"Flutter",
			"Mobile"
		],
		stack: [
			"Python",
			"Google Gemini (multimodal)",
			"NVIDIA NIM",
			"RapidFuzz",
			"Asynchronous Job Queues",
			"Flutter/Android",
			"HMAC-SHA256"
		],
		primaryTech: [
			"Gemini Multimodal",
			"NVIDIA NIM",
			"Flutter",
			"Async Queues"
		],
		problem: "Manual entry of multilingual (Gujarati/Hindi/English) voice orders caused delivery bottlenecks, transcription errors, and lost inventory data.",
		constraint: "Field audio contains background machinery noise and dialect code-switching. System required strict failover tolerance to guarantee 0% order drop rate during cloud API disruptions.",
		architecture: {
			description: "HMAC-SHA256 authenticated webhook streams raw audio into memory -> Processed through a 7-tier model failover chain (Gemini multimodal -> NVIDIA NIM fallbacks) -> Fuzzy catalogue SKU matching -> Dual-confidence auto-approval gate -> Asynchronous database write -> Companion mobile application for review.",
			flowTitle: "7-Tier Multimodal Voice-to-Order Ingestion & Verification DAG",
			nodes: [
				{
					id: "1",
					label: "Audio Ingestion Stream",
					sub: "HMAC-SHA256 Secure Webhook",
					type: "input"
				},
				{
					id: "2",
					label: "Tier 1: Multimodal LLM",
					sub: "Direct acoustic reasoning",
					type: "process"
				},
				{
					id: "3",
					label: "Tier 2-7: NIM & Fallback Mesh",
					sub: "Zero-drop circuit breaker",
					type: "fallback"
				},
				{
					id: "4",
					label: "Fuzzy SKU Matcher",
					sub: "Catalogue alignment",
					type: "process"
				},
				{
					id: "5",
					label: "Dual Confidence Gate",
					sub: "Auto-Approval Rule",
					type: "decision"
				},
				{
					id: "6",
					label: "Asynchronous Queue Engine",
					sub: "Automated Record Creation",
					type: "output"
				},
				{
					id: "7",
					label: "Companion Mobile App",
					sub: "Review UI",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2"
				},
				{
					from: "2",
					to: "3",
					label: "On Timeout / 429",
					isFallback: true
				},
				{
					from: "2",
					to: "4"
				},
				{
					from: "3",
					to: "4"
				},
				{
					from: "4",
					to: "5"
				},
				{
					from: "5",
					to: "6",
					label: "High Confidence"
				},
				{
					from: "5",
					to: "7",
					label: "Low Confidence / Review"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "Failover Architecture",
					value: "7-Tier Chain"
				},
				{
					label: "Dialect Ingestion",
					value: "Guj / Hin / Eng"
				},
				{
					label: "Order Drop Rate",
					value: "0% in field"
				}
			],
			summary: "Automatic Sales/Purchase Order creation with delivery tracking, live on production servers undergoing real-call field trials with zero dropped orders."
		}
	},
	{
		id: "fails-closed-dns-watchdog",
		title: "Fails-Closed Enterprise DNS Proxy & Anti-Tamper Watchdog",
		tagline: "Zero-license, tamper-proof endpoint DNS filtering and self-healing watchdog architecture across 35+ workstations.",
		status: "Complete",
		statusDetail: "Ready for deployment",
		statusWeight: 3,
		categories: ["Security", "DevOps"],
		tags: [
			"Systems Programming",
			"Security Architecture",
			"Windows Services",
			"DevOps"
		],
		stack: [
			"Windows Services",
			"Custom DNS Proxy",
			"Watchdog Service Architecture",
			"PowerShell",
			"C#"
		],
		primaryTech: [
			"Windows Services",
			"DNS Proxy",
			"Watchdog System",
			"DevOps"
		],
		problem: "Required tamper-proof, zero-license-cost network whitelisting across 35+ workstations to ensure secure enterprise operation without expensive dedicated appliance hardware.",
		constraint: "Users could easily circumvent standard DNS blocks via browser DNS-over-HTTPS (DoH) settings, manual service terminations, or hosts file modifications.",
		architecture: {
			description: "Engineered a low-level local DNS proxy intercepting all port 53 traffic, combined with registry policies stripping browser DoH capabilities. Protected by a bi-directional \"fails closed\" Watchdog service that continuously verifies process integrity and auto-restarts upon termination.",
			flowTitle: "Fails-Closed DNS Proxy & Anti-Tamper Watchdog Architecture",
			nodes: [
				{
					id: "1",
					label: "Outbound Browser Traffic",
					sub: "DoH Bypasses Stripped",
					type: "input"
				},
				{
					id: "2",
					label: "Local DNS Proxy",
					sub: "Strict Whitelist Filter",
					type: "process"
				},
				{
					id: "3",
					label: "Fails-Closed Watchdog",
					sub: "Process Health Monitor",
					type: "decision"
				},
				{
					id: "4",
					label: "Whitelisted Enterprise Gateway",
					sub: "Tamper-Proof Routing",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2"
				},
				{
					from: "2",
					to: "4",
					label: "Matched Whitelist"
				},
				{
					from: "3",
					to: "2",
					label: "Auto-Revive if Killed"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "Workstations Deployed",
					value: "35+ Nodes"
				},
				{
					label: "License Cost",
					value: "$0.00"
				},
				{
					label: "DoH Bypass Vectors",
					value: "100% Sealed"
				},
				{
					label: "Documentation",
					value: "Bilingual (En/Gu)"
				}
			],
			summary: "Closes DNS-over-HTTPS bypass loopholes in browsers; auto-restarting tamper protection; full rollout with comprehensive documentation."
		}
	},
	{
		id: "neural-voice-cloning-studio",
		title: "Neural Speech Synthesis & Zero-Shot Voice Cloning Studio",
		tagline: "Dual-architecture speech synthesis: Studio-grade Hindi narration vs. ultra-fast zero-shot cloning from under 60s of reference audio.",
		status: "Active",
		statusDetail: "Both in active refinement",
		statusWeight: 1,
		categories: ["AI/ML", "Automation"],
		tags: [
			"AI/ML",
			"Speech Synthesis",
			"Cloud Infrastructure",
			"Zero-Cost Engineering"
		],
		stack: [
			"Python",
			"VibeVoice (GPU Cloud)",
			"AI4Bharat IndicF5",
			"Whisper",
			"Resemblyzer",
			"PyTorch"
		],
		primaryTech: [
			"VibeVoice",
			"IndicF5",
			"Resemblyzer",
			"GPU Cloud"
		],
		problem: "Two distinct voice-cloning requirements — one needing commercial-grade narration matching proprietary cloud providers, another needing true zero-cost cloning from under 60 seconds of reference audio.",
		constraint: "Track A required studio-grade multi-speaker Hindi dialogue; Track B hit provider-side GPU training blocks across free cloud tiers, forcing an immediate pivot to zero-shot inference.",
		architecture: {
			description: "Track A deployed self-hosted VibeVoice on GPU cloud instances with custom fine-tuning and multi-speaker dialogue UI. Track B pivoted to zero-shot IndicF5 with zero training time, backed by an automated QC gate scoring Word Error Rate (WER) and speaker similarity via Resemblyzer.",
			flowTitle: "Dual-Track Speech Synthesis & Automated QC Scoring Matrix",
			nodes: [
				{
					id: "1",
					label: "Reference Audio (<60s)",
					sub: "Clean acoustic sample",
					type: "input"
				},
				{
					id: "2",
					label: "Track A: GPU Studio",
					sub: "High-Fidelity Dialogue",
					type: "process"
				},
				{
					id: "3",
					label: "Track B: IndicF5 Zero-Shot",
					sub: "Zero-training inference",
					type: "process"
				},
				{
					id: "4",
					label: "Automated QC Gate",
					sub: "Resemblyzer + Whisper WER",
					type: "decision"
				},
				{
					id: "5",
					label: "Production Speech Output",
					sub: "Natural Turn-Taking",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2",
					label: "Commercial Narration"
				},
				{
					from: "1",
					to: "3",
					label: "Zero-Cost Target"
				},
				{
					from: "2",
					to: "4"
				},
				{
					from: "3",
					to: "4"
				},
				{
					from: "4",
					to: "5"
				}
			]
		},
		subTracks: [{
			name: "Track A: Studio-Grade Narration",
			focus: "Match commercial quality for professional multi-speaker Hindi dialogue.",
			stack: [
				"GPU Compute",
				"VibeVoice",
				"Custom Hindi Fine-Tune",
				"Studio UI"
			],
			approach: "Self-hosted VibeVoice with a dedicated Hindi fine-tune and custom studio interface supporting natural multi-character dialogue turn-taking.",
			benchmark: "Benchmarked directly against commercial cloud reference outputs with near-parity acoustic naturalness."
		}, {
			name: "Track B: Zero-Cost, Zero-Training Instant Cloning",
			focus: "Clone target voices in seconds with zero infrastructure budget.",
			stack: [
				"AI4Bharat IndicF5",
				"Whisper",
				"Resemblyzer",
				"GPU Instances"
			],
			approach: "Pivoted to zero-shot IndicF5 requiring <60s of audio and zero training steps, governed by automated QC checks.",
			benchmark: "Cut voice turnaround time from hours of model training down to 3 seconds of direct inference."
		}],
		result: {
			metrics: [
				{
					label: "Reference Audio Needed",
					value: "< 60 seconds"
				},
				{
					label: "Track B Turnaround",
					value: "Seconds vs Hours"
				},
				{
					label: "Automated QC",
					value: "WER + Similarity"
				}
			],
			summary: "Two working pipelines under two distinct constraint sets — one tuned for maximum fidelity, one tuned for zero cost and speed, cutting turnaround from hours of training to seconds of inference."
		}
	},
	{
		id: "meeting-intelligence-mesh",
		title: "Zero-Click Enterprise Meeting Intelligence & 6-Tier LLM Mesh",
		tagline: "Zero-cost, zero-click meeting intelligence engine with 6-tier LLM failover and automated workspace dispatch.",
		status: "Field Testing",
		statusDetail: "Cross-browser testing phase",
		statusWeight: 2,
		categories: [
			"AI/ML",
			"Automation",
			"DevTools"
		],
		tags: [
			"AI/ML",
			"NLP",
			"Enterprise Automation",
			"Workspace Integration"
		],
		stack: [
			"Google Apps Script",
			"Chrome Extension (Manifest V3)",
			"Gemini 1.5",
			"Groq (LLaMA 3.3)",
			"Mistral Large",
			"NVIDIA NIM",
			"OpenRouter",
			"Drive API"
		],
		primaryTech: [
			"Manifest V3",
			"Apps Script",
			"6-Tier LLM Failover",
			"Drive API"
		],
		problem: "Multilingual technical calls were manually transcribed into SOWs, meeting minutes, and task lists — slow and error-prone.",
		constraint: "Enterprise transcription platforms charge recurring fees, and single-provider LLM API rate limits caused data loss during long technical discussions.",
		architecture: {
			description: "Browser Extension silently captures free live closed captions in real-time -> Buffers and transmits to serverless script -> Processed through a 6-tier fallback matrix (Gemini -> Groq -> Mistral -> NVIDIA NIM -> OpenRouter -> Local heuristics) -> Automatically formats SOWs, MOMs, and Action Items into organized workspace folders.",
			flowTitle: "Zero-Cost Caption Ingestion & 6-Tier LLM Resilience Mesh",
			nodes: [
				{
					id: "1",
					label: "Live Meeting Captions",
					sub: "Zero-Click Browser Extension",
					type: "input"
				},
				{
					id: "2",
					label: "Tier 1: Primary LLM",
					sub: "Primary Extraction Engine",
					type: "process"
				},
				{
					id: "3",
					label: "Tier 2-6: Multi-Model Mesh",
					sub: "Instant failover routing",
					type: "fallback"
				},
				{
					id: "4",
					label: "Document Generator",
					sub: "SOW / MOM / Tasks",
					type: "process"
				},
				{
					id: "5",
					label: "Workspace Hierarchy",
					sub: "Organized Storage",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2"
				},
				{
					from: "2",
					to: "3",
					label: "On 429 / Outage",
					isFallback: true
				},
				{
					from: "2",
					to: "4"
				},
				{
					from: "3",
					to: "4"
				},
				{
					from: "4",
					to: "5"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "LLM Failover Tiers",
					value: "6 Providers"
				},
				{
					label: "Transcription Cost",
					value: "$0.00"
				},
				{
					label: "Manual Clicks Needed",
					value: "0 Clicks"
				}
			],
			summary: "Bypasses enterprise paid transcription tiers using free live captions — a zero-cost, zero-click meeting intelligence pipeline."
		}
	},
	{
		id: "legal-docket-extraction-pipeline",
		title: "Serverless Legal Docket Automation & Multilingual Extraction Pipeline",
		tagline: "Serverless legal docket scraping, OCR CAPTCHA-solving, and multilingual judgment summarization directly inside cloud workspace.",
		status: "Field Testing",
		statusDetail: "End-to-end historical testing in progress",
		statusWeight: 2,
		categories: [
			"Automation",
			"LegalTech",
			"DevTools"
		],
		tags: [
			"Automation",
			"LegalTech",
			"Cloud Workspace",
			"OCR"
		],
		stack: [
			"Google Apps Script",
			"Google Sheets",
			"Google Drive",
			"Gemini Spark",
			"OCR CAPTCHA Solver"
		],
		primaryTech: [
			"Apps Script",
			"Gemini Spark",
			"OCR Engine",
			"Cloud Storage"
		],
		problem: "Manually tracking and summarizing court case documents across languages was labor-intensive and delayed case briefings.",
		constraint: "Court portals actively block automated access with rotating distorted CAPTCHAs, deliver multi-hundred-page vernacular PDF judgments, and the system required zero dedicated cloud server overhead.",
		architecture: {
			description: "Fully serverless workflow built in cloud script engine -> Automated HTTP requests parse case records -> Custom OCR solves visual CAPTCHAs -> Downloads and archives PDFs -> LLM extracts key holdings and generates multilingual summaries in English, Hindi, and Gujarati directly into spreadsheets and slide decks.",
			flowTitle: "Serverless Legal Docket Ingestion & Multilingual Briefing Pipeline",
			nodes: [
				{
					id: "1",
					label: "Court Record Portals",
					sub: "Protected Case Records",
					type: "input"
				},
				{
					id: "2",
					label: "OCR CAPTCHA Solver",
					sub: "Automated Access Gate",
					type: "process"
				},
				{
					id: "3",
					label: "Cloud PDF Archival",
					sub: "High-Volume Storage",
					type: "process"
				},
				{
					id: "4",
					label: "Multilingual LLM",
					sub: "Extraction Engine",
					type: "process"
				},
				{
					id: "5",
					label: "Automated Briefings",
					sub: "Sheets & Slides (En/Hi/Gu)",
					type: "output"
				}
			],
			edges: [
				{
					from: "1",
					to: "2"
				},
				{
					from: "2",
					to: "3"
				},
				{
					from: "3",
					to: "4"
				},
				{
					from: "4",
					to: "5"
				}
			]
		},
		result: {
			metrics: [
				{
					label: "Infrastructure Cost",
					value: "$0.00 Serverless"
				},
				{
					label: "User Setup Friction",
					value: "Zero Setup"
				},
				{
					label: "Languages Supported",
					value: "Eng / Hin / Guj"
				}
			],
			summary: "Zero infrastructure cost, zero technical setup required, automating end-to-end legal document retrieval and multilingual briefing."
		}
	}
];
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://harshthanki-codes.github.io");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Harsh Thanki — Applied AI Systems & Full-Stack Engineer", description = "Applied AI Systems & High-Throughput Backend Engineer. Specializing in on-premise LLM fine-tuning (QLoRA), multi-tier failover architectures, Odoo 19 ERP modules, and MERN microservices." } = Astro.props;
	const canonicalURL = new URL(Astro.url.pathname, Astro.site || "https://harshthanki-codes.github.io");
	const previewImageURL = new URL("/Portfolio_Website/og-image.png", Astro.site || "https://harshthanki-codes.github.io");
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Person",
			"@id": "https://harshthanki-codes.github.io/#person",
			"name": "Harsh Thanki",
			"jobTitle": "Applied AI Systems & Full-Stack Engineer",
			"worksFor": {
				"@type": "Organization",
				"name": "Arihant AI"
			},
			"alumniOf": [{
				"@type": "EducationalOrganization",
				"name": "IIT Mandi",
				"department": "Minor in Data Science & AI/ML"
			}, {
				"@type": "EducationalOrganization",
				"name": "Alliance University",
				"department": "Master of Computer Applications (MCA)"
			}],
			"url": "https://harshthanki-codes.github.io/Portfolio_Website/",
			"sameAs": ["https://github.com/harshthanki-codes", "https://www.linkedin.com/in/harshthanki"],
			"knowsAbout": [
				"LLM Fine-Tuning",
				"QLoRA",
				"Python",
				"FastAPI",
				"Odoo 19 ERP",
				"PostgreSQL",
				"Node.js",
				"Express",
				"MongoDB",
				"Multimodal AI Systems"
			]
		}, {
			"@type": "ItemList",
			"@id": "https://harshthanki-codes.github.io/#projects",
			"name": "Production AI & Full-Stack Engineering Case Studies",
			"itemListElement": PROJECTS_DATA.map((project, idx) => ({
				"@type": "SoftwareSourceCode",
				"position": idx + 1,
				"name": project.title,
				"description": project.tagline,
				"programmingLanguage": project.stack.join(", "),
				"codeRepository": "https://github.com/harshthanki-codes"
			}))
		}]
	};
	return renderTemplate`<html lang="en" class="dark" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="generator"${addAttribute(Astro.generator, "content")}><!-- Canonical & Basic Metadata --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><link rel="icon" type="image/svg+xml" href="/Portfolio_Website/favicon.svg"><!-- Open Graph (Facebook / LinkedIn) --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(previewImageURL, "content")}><!-- Twitter Cards --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(previewImageURL, "content")}><!-- Fonts (Preconnect & Subsets) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet"><!-- Theme Initialization Script (Prevents Flash of Wrong Theme) --><script>
      (function() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', activeTheme === 'dark');
        document.documentElement.setAttribute('data-theme', activeTheme);
      })();
    <\/script><!-- JSON-LD Structured Data --><script type="application/ld+json">${unescapeHTML(JSON.stringify(structuredData))}<\/script>${renderHead($$result)}</head><body class="tech-grid-bg antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-text)]"><!-- A11y Skip Link --><a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--accent-text)] focus:font-mono focus:text-xs">Skip to main content</a>${renderComponent($$result, "Navbar", $$Navbar, {})}<main id="main-content" class="min-h-screen">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "D:/Projects/Portfolio_Website/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="w-screen h-screen overflow-hidden bg-[#08090d]">${renderComponent($$result, "BrunoWorld3D", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "D:/Projects/Portfolio_Website/src/components/islands/BrunoWorld3D.tsx",
		"client:component-export": "BrunoWorld3D"
	})}</main>` })}`;
}, "D:/Projects/Portfolio_Website/src/pages/index.astro", void 0);
var $$file = "D:/Projects/Portfolio_Website/src/pages/index.astro";
var $$url = "/Portfolio_Website";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
