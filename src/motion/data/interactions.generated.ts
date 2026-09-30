// Machine-generated data; the generator is not part of this repository, so this file is the source of truth. Edit with care.
// The 34 interaction definitions (triggers, timelines, tweens) and the responsive breakpoints they use.
import type { RunnerData } from '../engine/runner';

// The literal is validated by the generator; the cast only bridges JSON literal widening.
export const runnerData = {
 "breakpoints": {
  "tiny": "(max-width: 479px) and (min-width: 0px)",
  "small": "(max-width: 767px) and (min-width: 480px)",
  "medium": "(max-width: 991px) and (min-width: 768px)",
  "main": "(min-width: 992px)"
 },
 "interactions": [
  {
   "order": 0,
   "id": "i-e637e4c6",
   "name": "Nav menu row hover (meta slides in)",
   "scope": {
    "type": "component",
    "componentId": "cc55c259-77e0-ab04-4080-f01717218e97",
    "component": {
     "name": "Header",
     "root": "header.header"
    }
   },
   "conditionalPlayback": [
    {
     "type": "breakpoint",
     "behavior": "dont-animate",
     "breakpoints": [
      "medium",
      "small",
      "tiny"
     ],
     "queries": [
      "(max-width: 991px) and (min-width: 768px)",
      "(max-width: 767px) and (min-width: 480px)",
      "(max-width: 479px) and (min-width: 0px)"
     ]
    }
   ],
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "class",
      "selector": ".nav_menu-row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".nav_menu-row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-b6c1f2fb",
    "actions": [
     {
      "id": "ta-526d187b",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_menu-meta",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.24,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "x": "1em"
        },
        "to": {
         "opacity": 1,
         "x": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 1,
   "id": "i-e7b8decc",
   "name": "Nav menu button hover (glyph grows)",
   "scope": {
    "type": "component",
    "componentId": "cc55c259-77e0-ab04-4080-f01717218e97",
    "component": {
     "name": "Header",
     "root": "header.header"
    }
   },
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "class",
      "selector": ".nav_menu-glyph",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".nav_menu-glyph",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-0a9e2546",
    "actions": [
     {
      "id": "ta-44801bda",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.24,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "width": "12px",
         "height": "12px"
        },
        "to": {
         "width": "16px",
         "height": "16px"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 2,
   "id": "i-36f4bd74",
   "name": "Nav submenu link hover (label/icon colour, icon nudge)",
   "scope": {
    "type": "component",
    "componentId": "41eee10c-a873-9efe-4fc8-fe1f69a32b62",
    "component": {
     "name": "Nav submenu link",
     "root": "a.nav_submenu-link"
    }
   },
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "class",
      "selector": ".nav_submenu-link",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".nav_submenu-link",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-2e998c2d",
    "actions": [
     {
      "id": "ta-9f860a88",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_submenu-label",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 0,
      "ttName": "to",
      "position": 0,
      "duration": 0.24,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "style",
        "from": {},
        "to": {
         "color": "var(--theme-neutral-colors-shade-05)"
        },
        "resolveVar": [
         "color"
        ]
       }
      ]
     },
     {
      "id": "ta-c495cd28",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_submenu-icon",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.24,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "x": "var(--spaces-space-0)"
        },
        "to": {
         "x": "var(--spaces-space-0-25x)"
        }
       },
       {
        "handler": "style",
        "from": {},
        "to": {
         "color": "var(--theme-neutral-colors-shade-05)"
        },
        "resolveVar": [
         "color"
        ]
       }
      ]
     }
    ]
   }
  },
  {
   "order": 3,
   "id": "i-53067fa5",
   "name": "Nav menu open/close (menu button click)",
   "scope": {
    "type": "component",
    "componentId": "cc55c259-77e0-ab04-4080-f01717218e97",
    "component": {
     "name": "Header",
     "root": "header.header"
    }
   },
   "triggers": [
    {
     "kind": "click",
     "controlType": "standard",
     "control": "togglePlayReverse",
     "pluginConfig": {
      "click": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".nav_menu-button",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-724d4062",
    "actions": [
     {
      "id": "ta-5e5c1807",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_panel",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "height": "0px"
        },
        "to": {
         "height": "auto"
        }
       }
      ]
     },
     {
      "id": "ta-1c81793e",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_menu-loader",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "1em",
         "scale": 0.98
        },
        "to": {
         "opacity": 1,
         "y": "0px",
         "scale": 1
        }
       }
      ],
      "stagger": {
       "each": 0.06
      }
     },
     {
      "id": "ta-55e15016",
      "targets": [
       {
        "kind": "class",
        "selector": ".header-bg",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 3,
      "ttName": "set",
      "position": 0,
      "duration": 0,
      "ease": null,
      "easeIndex": null,
      "tweens": [],
      "classOp": {
       "selectors": [
        "hide"
       ],
       "operation": "toggleClass"
      }
     },
     {
      "id": "ta-e9d75a1d",
      "targets": [
       {
        "kind": "class",
        "selector": ".header-bg",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 4,
   "id": "i-10706f11",
   "name": "Nav menu row click (submenu accordion)",
   "scope": {
    "type": "component",
    "componentId": "cc55c259-77e0-ab04-4080-f01717218e97",
    "component": {
     "name": "Header",
     "root": "header.header"
    }
   },
   "triggers": [
    {
     "kind": "click",
     "controlType": "standard",
     "control": "togglePlayReverse",
     "pluginConfig": {
      "click": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".nav_menu-row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-b66f71fa",
    "actions": [
     {
      "id": "ta-6dc3cc86",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_menu-icon",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "rotation": "0deg"
        },
        "to": {
         "rotation": "135deg"
        }
       }
      ]
     },
     {
      "id": "ta-6b7736f9",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_submenu-wrap",
        "relationship": "next-to",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "height": "0px"
        },
        "to": {
         "height": "auto"
        }
       }
      ]
     },
     {
      "id": "ta-3b48aa0f",
      "targets": [
       {
        "kind": "class",
        "selector": ".nav_submenu-link",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only-parent"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "y": "0.5em",
         "opacity": 0,
         "scale": 0.98
        },
        "to": {
         "y": "0em",
         "opacity": 1,
         "scale": 1
        }
       }
      ],
      "stagger": {
       "each": 0.06,
       "from": "start"
      }
     }
    ]
   }
  },
  {
   "order": 5,
   "id": "i-9a9dc53d",
   "name": "Image scale on hover",
   "scope": {
    "type": "site"
   },
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "attribute",
      "selector": "[data-hover-animation=\"image-scale-trigger\"]",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "attribute",
      "selector": "[data-hover-animation=\"image-scale-trigger\"]",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-01405c4c",
    "actions": [
     {
      "id": "ta-f3fafeca",
      "targets": [
       {
        "kind": "attribute",
        "selector": "[data-hover-animation=\"image-scale-target\"]",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "scale": 1
        },
        "to": {
         "scale": 1.05
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 6,
   "id": "i-b02b1abd",
   "name": "Fade heading reveal (split lines)",
   "scope": {
    "type": "site"
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "top bottom",
      "end": "bottom top",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "attribute",
      "selector": "[data-fade-action=\"heading\"]",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-7166b573",
    "actions": [
     {
      "id": "ta-0cd5dc44",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.25em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.02,
       "grid": "auto"
      },
      "splitText": {
       "type": "lines"
      }
     }
    ]
   }
  },
  {
   "order": 7,
   "id": "i-90ba81a9",
   "name": "Hero status card reveal",
   "scope": {
    "type": "component",
    "componentId": "45e86887-fb63-14fb-0ed4-fc5c7e336b45",
    "component": {
     "name": "Hero status card",
     "root": "a.hero_status-card"
    }
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "top bottom",
      "end": "bottom top",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".hero_status-card",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-2de10ee2",
    "actions": [
     {
      "id": "ta-ed373c95",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.54,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 8,
   "id": "i-17c770ac",
   "name": "Section meta reveal",
   "scope": {
    "type": "site"
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".section_meta",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-1b519a82",
    "actions": [
     {
      "id": "ta-286c2314",
      "targets": [
       {
        "kind": "class",
        "selector": ".section_meta-text",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 9,
   "id": "i-27695b6d",
   "name": "Careers text reveal",
   "scope": {
    "type": "component",
    "componentId": "59f44f87-8c39-0f8e-ac2c-64899395ea93",
    "component": {
     "name": "Careers section",
     "root": "section.section_careers"
    }
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".careers_text",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-6d29ab09",
    "actions": [
     {
      "id": "ta-dc314df9",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.45,
      "duration": 0.45,
      "ease": "power2.out",
      "easeIndex": 5,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 10,
   "id": "i-9beac73f",
   "name": "Careers buttons row reveal",
   "scope": {
    "type": "component",
    "componentId": "59f44f87-8c39-0f8e-ac2c-64899395ea93",
    "component": {
     "name": "Careers section",
     "root": "section.section_careers"
    }
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".buttons_row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-4d22da62",
    "actions": [
     {
      "id": "ta-3db0e47c",
      "targets": [
       {
        "kind": "class",
        "selector": ".button",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.45,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 11,
   "id": "i-d5b75144",
   "name": "Section header text fade",
   "scope": {
    "type": "site"
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".section_header-text",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-a3d7bb0b",
    "actions": [
     {
      "id": "ta-aada74d0",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 12,
   "id": "i-209ac61f",
   "name": "Principle row text fade",
   "scope": {
    "type": "component",
    "componentId": "099d4508-55da-f07c-5bf0-002a9d562953",
    "component": {
     "name": "Principle row",
     "root": "div.principle_row"
    }
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".principle_row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-fe9ba986",
    "actions": [
     {
      "id": "ta-795de0ce",
      "targets": [
       {
        "kind": "class",
        "selector": ".principle_text",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.2,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 13,
   "id": "i-7e1ac2c5",
   "name": "Button/link text-roll hover",
   "scope": {
    "type": "component",
    "componentId": "b7915d62-2465-a758-bc70-1819b15577e2",
    "component": {
     "name": "Button link",
     "root": "a.button"
    }
   },
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "attribute",
      "selector": "[data-link-action=\"link\"]",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "attribute",
      "selector": "[data-link-action=\"link\"]",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-00ab563c",
    "actions": [
     {
      "id": "ta-50e7f86f",
      "targets": [
       {
        "kind": "attribute",
        "selector": "[data-link-action=\"text-row-01\"]",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 0,
      "ttName": "to",
      "position": 0,
      "duration": 0.45,
      "ease": "power4.inOut",
      "easeIndex": 12,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "y": "0%"
        },
        "to": {
         "y": "-100%",
         "opacity": 1
        }
       }
      ]
     },
     {
      "id": "ta-38b3c8fb",
      "targets": [
       {
        "kind": "attribute",
        "selector": "[data-link-action=\"chip-row-01\"]",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power4.inOut",
      "easeIndex": 12,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "y": "0em",
         "opacity": 1,
         "x": "0em"
        },
        "to": {
         "y": "-1.35em",
         "opacity": 0,
         "x": "1.35em"
        }
       }
      ]
     },
     {
      "id": "ta-6656b6a8",
      "targets": [
       {
        "kind": "attribute",
        "selector": "[data-link-action=\"chip-row-02\"]",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power4.inOut",
      "easeIndex": 12,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "y": "0em",
         "opacity": 0,
         "x": "0%"
        },
        "to": {
         "y": "-1.35em",
         "opacity": 1,
         "x": "1.35em"
        }
       }
      ]
     },
     {
      "id": "ta-675f8676",
      "targets": [
       {
        "kind": "attribute",
        "selector": "[data-link-action=\"text-row-02\"]",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power4.inOut",
      "easeIndex": 12,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "y": "0%",
         "opacity": 0
        },
        "to": {
         "y": "-100%",
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 14,
   "id": "i-80e4cb93",
   "name": "Work card hover (panel expand + CTA)",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aaba7222d16b58fef3e036e",
     "6aabace694971d27bf70276a"
    ]
   },
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "class",
      "selector": ".work_card",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".work_card",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-70c40fbf",
    "actions": [
     {
      "id": "ta-8d175435",
      "targets": [
       {
        "kind": "class",
        "selector": ".work_panel",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "width": "50%",
         "height": "4em"
        },
        "to": {
         "width": "94%",
         "height": "8em"
        }
       }
      ]
     },
     {
      "id": "ta-82e76665",
      "targets": [
       {
        "kind": "class",
        "selector": ".work_panel-row",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 0,
      "ttName": "to",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {},
        "to": {
         "opacity": 1
        }
       }
      ]
     },
     {
      "id": "ta-b2dc3725",
      "targets": [
       {
        "kind": "class",
        "selector": ".work_cta-wrap",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.12,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "height": "0em",
         "opacity": 0,
         "x": "-1em"
        },
        "to": {
         "height": "1em",
         "opacity": 1,
         "x": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 15,
   "id": "i-97fb023a",
   "name": "FAQ row accordion (click)",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "click",
     "controlType": "standard",
     "control": "togglePlayReverse",
     "target": {
      "kind": "class",
      "selector": ".faq_row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-8fb56211",
    "actions": [
     {
      "id": "ta-33b2be96",
      "targets": [
       {
        "kind": "class",
        "selector": ".faq_answer",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "height": "0px"
        },
        "to": {
         "height": "auto"
        }
       }
      ]
     },
     {
      "id": "ta-e895bac5",
      "targets": [
       {
        "kind": "class",
        "selector": ".faq_icon",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "rotation": "0deg"
        },
        "to": {
         "rotation": "135deg"
        }
       }
      ]
     },
     {
      "id": "ta-e8eca7f9",
      "targets": [
       {
        "kind": "class",
        "selector": ".faq_answer-text",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 16,
   "id": "i-e86ecf12",
   "name": "Journal index row hover (image fade)",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aabf952e48b01768d7ec54e",
     "6aabf81e5505fae07c57818b",
     "6aabf92b5d1482539fadfef2"
    ]
   },
   "conditionalPlayback": [
    {
     "type": "breakpoint",
     "behavior": "dont-animate",
     "breakpoints": [
      "tiny",
      "small"
     ],
     "queries": [
      "(max-width: 479px) and (min-width: 0px)",
      "(max-width: 767px) and (min-width: 480px)"
     ]
    }
   ],
   "triggers": [
    {
     "kind": "hover",
     "controlType": "standard",
     "target": {
      "kind": "class",
      "selector": ".journal-index_row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    },
    {
     "kind": "hover",
     "controlType": "standard",
     "control": "reverse",
     "pluginConfig": {
      "type": "mouseleave",
      "hover": "each"
     },
     "target": {
      "kind": "class",
      "selector": ".journal-index_row",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-c5f849a9",
    "actions": [
     {
      "id": "ta-0813cb02",
      "targets": [
       {
        "kind": "class",
        "selector": ".journal-index_image",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 0.36,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 17,
   "id": "i-0884f16a",
   "name": "Client logo marquee (load, infinite)",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "load",
     "controlType": "load",
     "control": "play"
    }
   ],
   "timeline": {
    "id": "t-a839c9d3",
    "actions": [
     {
      "id": "ta-24a11a82",
      "targets": [
       {
        "kind": "class",
        "selector": ".statement_track",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 0,
      "ttName": "to",
      "position": 0,
      "duration": 20,
      "ease": "none",
      "easeIndex": 0,
      "tweens": [
       {
        "handler": "transform",
        "from": {},
        "to": {
         "x": "-50%"
        }
       }
      ],
      "repeat": -1,
      "yoyo": false
     }
    ]
   }
  },
  {
   "order": 18,
   "id": "i-a293a3c1",
   "name": "Statement text scrub (chars 15% -> 100%)",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom 30%)",
      "scrub": 0.8,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".statement_text",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-82e18e62",
    "actions": [
     {
      "id": "ta-ebef8429",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0,
      "duration": 1,
      "ease": "none",
      "easeIndex": 0,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0.15
        },
        "to": {
         "opacity": 1
        }
       }
      ],
      "stagger": {
       "each": 0.1
      },
      "splitText": {
       "type": "chars"
      }
     }
    ],
    "canvasDuration": 1
   }
  },
  {
   "order": 19,
   "id": "i-953e8f3c",
   "name": "Work grid card reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aaba7222d16b58fef3e036e",
     "6aaa9f6aae02a14272d1206a",
     "6aabace694971d27bf70276a"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "top bottom",
      "end": "bottom top",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".work_grid",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-34e1f784",
    "actions": [
     {
      "id": "ta-021e2c66",
      "targets": [
       {
        "kind": "class",
        "selector": ".work_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 20,
   "id": "i-bf54f8f7",
   "name": "Live list reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aaba7222d16b58fef3e036e",
     "6aabace694971d27bf70276a"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".live_list",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-42cefe13",
    "actions": [
     {
      "id": "ta-d8880dae",
      "targets": [
       {
        "kind": "class",
        "selector": ".live_row",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     },
     {
      "id": "ta-117bccaa",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 21,
   "id": "i-66076681",
   "name": "Services slider cards reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".services_slider",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-84bc0a2c",
    "actions": [
     {
      "id": "ta-8fb0a793",
      "targets": [
       {
        "kind": "class",
        "selector": ".services_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 22,
   "id": "i-423cbf1d",
   "name": "Culture frame (video) reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".culture_frame",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-146231b5",
    "actions": [
     {
      "id": "ta-ea0a347f",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.6,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "scale": 0.95,
         "y": "2em"
        },
        "to": {
         "opacity": 1,
         "scale": 1,
         "y": "0em"
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 23,
   "id": "i-375b026b",
   "name": "Testimonial slider cards reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".testimonial_slider",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-ca7d59f2",
    "actions": [
     {
      "id": "ta-c8cab03b",
      "targets": [
       {
        "kind": "class",
        "selector": ".testimonial_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": null,
      "easeIndex": null,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0px"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 24,
   "id": "i-db7411ba",
   "name": "FAQ list reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".faq_list",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-c9564d7d",
    "actions": [
     {
      "id": "ta-16badc5a",
      "targets": [
       {
        "kind": "class",
        "selector": ".faq_row",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": null,
      "easeIndex": null,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "amount": 0.15
      }
     },
     {
      "id": "ta-45f79847",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": null,
      "easeIndex": null,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "amount": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 25,
   "id": "i-526d6812",
   "name": "Journal grid card reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aabf952e48b01768d7ec54e",
     "6aabf81e5505fae07c57818b",
     "6aabf92b5d1482539fadfef2"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".journal_grid",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-8500be7d",
    "actions": [
     {
      "id": "ta-79bd7df6",
      "targets": [
       {
        "kind": "class",
        "selector": ".journal_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 26,
   "id": "i-cc06f65c",
   "name": "Journal index list reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6a95fdd95c5b60864b18a35c",
     "6aabf952e48b01768d7ec54e",
     "6aabf92b5d1482539fadfef2"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".journal-index_list",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-0e607c99",
    "actions": [
     {
      "id": "ta-dca4b552",
      "targets": [
       {
        "kind": "class",
        "selector": ".journal-index_row",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 27,
   "id": "i-916aad80",
   "name": "Philosophy strip image reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".philosophy_strip",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-5d4cee27",
    "actions": [
     {
      "id": "ta-a0f8c03f",
      "targets": [
       {
        "kind": "class",
        "selector": ".philosophy_image",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "1em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 28,
   "id": "i-a6830866",
   "name": "Profile panel reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".profile_panel",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-9d880bc0",
    "actions": [
     {
      "id": "ta-9532c6a9",
      "targets": [
       {
        "kind": "class",
        "selector": ".profile_text",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     },
     {
      "id": "ta-3daa3238",
      "targets": [
       {
        "kind": "class",
        "selector": ".profile_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.2,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "2em",
         "scale": 0.95
        },
        "to": {
         "opacity": 1,
         "y": "0em",
         "scale": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 29,
   "id": "i-1ca4631a",
   "name": "Team grid card reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".team_grid",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-4eeca2f1",
    "actions": [
     {
      "id": "ta-660198d2",
      "targets": [
       {
        "kind": "class",
        "selector": ".team_card",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "y": "0.5em"
        },
        "to": {
         "opacity": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 30,
   "id": "i-4bd719cc",
   "name": "Snapshot top fade",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".snapshot_top",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-0dec4669",
    "actions": [
     {
      "id": "ta-9f7710a3",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 31,
   "id": "i-3d63bbbf",
   "name": "Snapshot figure fade",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".snapshot_figure",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-1b6b87ba",
    "actions": [
     {
      "id": "ta-07ba96bc",
      "targets": [
       {
        "kind": "trigger-only",
        "relationship": "none",
        "firstMatchOnly": false
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ]
     }
    ]
   }
  },
  {
   "order": 32,
   "id": "i-85b5abbf",
   "name": "Snapshot stats reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".snapshot_stats",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-991ea0d3",
    "actions": [
     {
      "id": "ta-1db0188b",
      "targets": [
       {
        "kind": "class",
        "selector": ".snapshot_stat",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": "power2.inOut",
      "easeIndex": 6,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0
        },
        "to": {
         "opacity": 1
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  },
  {
   "order": 33,
   "id": "i-dff0fa4b",
   "name": "Awards list reveal",
   "scope": {
    "type": "pages",
    "value": [
     "6aa489cf843fb20435d30490"
    ]
   },
   "triggers": [
    {
     "kind": "scroll",
     "controlType": "scroll",
     "scrollTrigger": {
      "start": "clamp(top bottom)",
      "end": "clamp(bottom top)",
      "scrub": false,
      "toggleActions": "play none none none",
      "horizontal": false,
      "markers": false
     },
     "target": {
      "kind": "class",
      "selector": ".awards_list",
      "relationship": "none",
      "firstMatchOnly": false
     }
    }
   ],
   "timeline": {
    "id": "t-e55732fe",
    "actions": [
     {
      "id": "ta-758fac35",
      "targets": [
       {
        "kind": "class",
        "selector": ".awards_item",
        "relationship": "within",
        "firstMatchOnly": false,
        "filterBy": {
         "kind": "trigger-only"
        }
       }
      ],
      "tt": 2,
      "ttName": "fromTo",
      "position": 0.15,
      "duration": 0.45,
      "ease": null,
      "easeIndex": null,
      "tweens": [
       {
        "handler": "transform",
        "from": {
         "opacity": 0,
         "scale": 0.95,
         "y": "1em"
        },
        "to": {
         "opacity": 1,
         "scale": 1,
         "y": "0em"
        }
       }
      ],
      "stagger": {
       "each": 0.15
      }
     }
    ]
   }
  }
 ]
} as unknown as RunnerData;

/** component id -> css selector of the component root element (scopes component interactions to their instance) */
export const componentRoots: Record<string, string> = {
 "cc55c259-77e0-ab04-4080-f01717218e97": "header.header",
 "41eee10c-a873-9efe-4fc8-fe1f69a32b62": "a.nav_submenu-link",
 "45e86887-fb63-14fb-0ed4-fc5c7e336b45": "a.hero_status-card",
 "59f44f87-8c39-0f8e-ac2c-64899395ea93": "section.section_careers",
 "099d4508-55da-f07c-5bf0-002a9d562953": "div.principle_row",
 "b7915d62-2465-a758-bc70-1819b15577e2": "a.button"
};
