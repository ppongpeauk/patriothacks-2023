import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import CartModal from "@/components/CartModal";
import { auth } from "@/lib/firebase";
import { Listing } from "@/types";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";

const PurchaseContext = createContext(null);

export function usePurchaseContext() {
  return useContext(PurchaseContext) as unknown as any;
}

export default function PurchaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const { currentUser } = useAuthContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [focusedListing, setFocusedListing] = useState<Listing | null>(null);

  const { push } = useRouter();

  const runPurchaseFlow = useCallback((data: Listing) => {
    setPurchaseFlowLoading(true);
    setFocusedListing(data);
    setTimeout(() => {
      setPurchaseFlowLoading(false);
      // onOpen();
      push(`/listing/${data.id}/booking`);
    }, 1000);
  }, []);
  const [purchaseFlowLoading, setPurchaseFlowLoading] = useState(false);

  const values = { runPurchaseFlow, purchaseFlowLoading };

  return (
    <PurchaseContext.Provider value={values as any}>
      <CartModal isOpen={isOpen} onClose={onClose} data={focusedListing} />
      {children}
    </PurchaseContext.Provider>
  );
}

export { PurchaseContext, PurchaseProvider };
