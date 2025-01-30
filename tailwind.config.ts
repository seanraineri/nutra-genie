import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0891B2",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#164E63",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#94A3B8",
          foreground: "#334155",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#334155",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "text-shimmer": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "glow-pulse": {
          "0%, 100%": {
            "text-shadow": "0 0 15px rgba(8, 145, 178, 0.4), 0 0 30px rgba(8, 145, 178, 0.2)"
          },
          "50%": {
            "text-shadow": "0 0 25px rgba(8, 145, 178, 0.6), 0 0 50px rgba(8, 145, 178, 0.3)"
          }
        },
        "float-in-place": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)"
          },
          "50%": {
            transform: "translate(0, 0) scale(1.05)"
          }
        },
        "float-circular": {
          "0%": {
            transform: "translate(-2px, -2px)"
          },
          "25%": {
            transform: "translate(2px, -2px)"
          },
          "50%": {
            transform: "translate(2px, 2px)"
          },
          "75%": {
            transform: "translate(-2px, 2px)"
          },
          "100%": {
            transform: "translate(-2px, -2px)"
          }
        },
        "button-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 15px rgba(8, 145, 178, 0.5)",
            transform: "scale(1)"
          },
          "50%": {
            "box-shadow": "0 0 30px rgba(8, 145, 178, 0.8)",
            transform: "scale(1.02)"
          }
        },
        "gradient-flow": {
          "0%": {
            "background-position": "0% 50%"
          },
          "50%": {
            "background-position": "100% 50%"
          },
          "100%": {
            "background-position": "0% 50%"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float-in-place": "float-in-place 3s ease-in-out infinite",
        "float-circular": "float-circular 4s ease-in-out infinite",
        "button-glow": "button-glow 3s ease-in-out infinite",
        "gradient-flow": "gradient-flow 3s ease infinite"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
} satisfies Config;
