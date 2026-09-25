import PaymentMethod from "./PaymentMethod";
import PaymentDetails from "./PaymentDetails";
import Address from "./Address";

export default function CheckoutSummary() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Address />
      <PaymentMethod />
      <PaymentDetails />
    </div>
  );
}
