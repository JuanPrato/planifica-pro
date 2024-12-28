import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ionic.planificapro",
  appName: "planificapro",
  webDir: "dist",
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
};

export default config;
