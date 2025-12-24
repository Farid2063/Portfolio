(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/portfolio/portfolio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/portfolio/portfolio/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/portfolio/portfolio/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/portfolio/portfolio/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/portfolio/portfolio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Loader() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "5cdb53c3285944181ea603992fe555b8f1fe1cdc601903579d027766c6ea17c9") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5cdb53c3285944181ea603992fe555b8f1fe1cdc601903579d027766c6ea17c9";
    }
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isEntered, setIsEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] !== isEntered) {
        t0 = ({
            "Loader[useGSAP()]": ()=>{
                if (isEntered) {
                    return;
                }
                const handleMouseMove = _LoaderUseGSAPHandleMouseMove;
                window.addEventListener("mousemove", handleMouseMove);
                return ()=>window.removeEventListener("mousemove", handleMouseMove);
            }
        })["Loader[useGSAP()]"];
        $[1] = isEntered;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== isEntered) {
        t1 = {
            scope: container,
            dependencies: [
                isEntered
            ]
        };
        $[3] = isEntered;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"])(t0, t1);
    let t2;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "Loader[onEnter]": ()=>{
                const tl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                    onComplete: ()=>setIsEntered(true)
                });
                tl.to("#enter-btn", {
                    opacity: 0,
                    duration: 0.5
                }).to(container.current, {
                    yPercent: -100,
                    duration: 1.5,
                    ease: "expo.inOut"
                }).from("h1", {
                    y: 150,
                    skewY: 7,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out"
                }, "-=1.1").from("section:first-of-type span, section:first-of-type p", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8
                }, "-=0.6");
            }
        })["Loader[onEnter]"];
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const onEnter = t2;
    if (isEntered) {
        return null;
    }
    let t3;
    let t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parallax-layer absolute inset-[-10%] bg-[url('/stars.jpg')] opacity-20 bg-cover",
            "data-speed": "20"
        }, void 0, false, {
            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parallax-layer absolute inset-[-10%] bg-[url('/grain.jpg')] opacity-20 bg-cover",
            "data-speed": "40"
        }, void 0, false, {
            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parallax-layer absolute inset-[-10%] bg-[url('/mountains.png')] opacity-20 bg-cover",
            "data-speed": "60"
        }, void 0, false, {
            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
    } else {
        t3 = $[6];
        t4 = $[7];
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: container,
            className: "fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden",
            children: [
                t3,
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 border-2 border-white flex items-center justify-center mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white text-4xl font-black italic",
                                children: "F"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
                                lineNumber: 99,
                                columnNumber: 284
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
                            lineNumber: 99,
                            columnNumber: 197
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[50px] font-black mb-8 tracking-[0.3em] opacity-100 text-white",
                            children: "SYSTEM READY"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
                            lineNumber: 99,
                            columnNumber: 354
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            id: "enter-btn",
                            onClick: onEnter,
                            className: "px-10 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-700 uppercase text-[10px] tracking-[0.4em] cursor-pointer",
                            children: "Enter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
                            lineNumber: 99,
                            columnNumber: 463
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
                    lineNumber: 99,
                    columnNumber: 139
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/portfolio/portfolio/src/components/Loader.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    return t6;
}
_s(Loader, "bIUMx2TnoOCGu38h2G+6d/e+2q4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]
    ];
});
_c = Loader;
function _LoaderUseGSAPHandleMouseMove(e) {
    const xPercent = e.clientX / window.innerWidth - 0.5;
    const yPercent = e.clientY / window.innerHeight - 0.5;
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$portfolio$2f$portfolio$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(".parallax-layer", {
        x: (i, target)=>xPercent * Number(target.dataset.speed) || 0,
        y: (i_0, target_0)=>yPercent * Number(target_0.dataset.speed) || 0,
        duration: 1,
        ease: "power2.out"
    });
}
var _c;
__turbopack_context__.k.register(_c, "Loader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_portfolio_portfolio_src_components_Loader_tsx_3e8a68a7._.js.map