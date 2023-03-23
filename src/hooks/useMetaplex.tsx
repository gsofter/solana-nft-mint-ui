import { Metaplex } from "@metaplex-foundation/js";
import { createContext, useContext } from "react";

const DEFAULT_CONTEXT = {
  metaplex: null,
};

interface IMetaplexContext {
  metaplex: Metaplex | null;
}

export const MetaplexContext = createContext<IMetaplexContext>(DEFAULT_CONTEXT);

export function useMetaplex() {
  return useContext(MetaplexContext);
}
