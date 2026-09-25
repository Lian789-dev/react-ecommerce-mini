import { useState } from "react";
import { useCheckoutStore } from "../store/useCheckoutStore";
import { useModalStore } from "@/store/useModalStore";

export default function AddressFormModal() {
  const onAddAddress = useCheckoutStore((state) => state.onAddAddress);
  const activeModal = useModalStore((state) => state.activeModal);
  const onCloseModal = useModalStore((state) => state.onCloseModal);

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
    city: "",
    street: "",
    otherDetails: "",
  });

  const [errors, setErrors] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    const phoneRegex = /^(08|\+628)[0-9]{8,11}$/;
    if (!formData.telp.trim()) {
      newErrors.telp = "Phone number is required..";
    } else if (!phoneRegex.test(formData.telp.trim())) {
      newErrors.telp =
        "Invalid mobile number format (e.g., 0857xxx or +628xxx, 10–14 digits).";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City must be filled in..";
    }
    if (!formData.street.trim()) {
      newErrors.street = "The street must be filled in..";
    } else if (formData.street.trim().length < 10) {
      newErrors.street = "Address is too short (minimum 10 characters).";
    }
    if (!formData.otherDetails.trim()) {
      newErrors.otherDetails = "The other details must be filled in..";
    } else if (formData.otherDetails.trim().length < 5) {
      newErrors.otherDetails =
        "other details is too short (minimum 5 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddAddress(formData);
      onCloseModal();
    }
  };
  if (activeModal !== "add-address") return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-800">
          Add New Shipping Address
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {/* Input Name */}
          <div>
            <label
              htmlFor="name"
              className="text-xs font-semibold text-slate-600"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2.5 text-sm outline-green-700 ${
                errors.name ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Input No Telepon */}
          <div>
            <label
              htmlFor="telp"
              className="text-xs font-semibold text-slate-600"
            >
              No Telepon
            </label>
            <input
              type="tel"
              id="telp"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2.5 text-sm outline-green-700 ${
                errors.telp ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
            />
            {errors.telp && (
              <p className="mt-1 text-xs text-red-500">{errors.telp}</p>
            )}
          </div>

          {/* Input Full Address */}
          <div>
            <label className="text-xs font-semibold text-slate-600">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2.5 text-sm outline-green-700 ${
                errors.city ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Street Name, Building, No. Home
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2.5 text-sm outline-green-700 ${
                errors.street ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
            />
            {errors.street && (
              <p className="mt-1 text-xs text-red-500">{errors.street}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Other Details{"(example: benchmark)"}
            </label>
            <input
              type="text"
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border p-2.5 text-sm outline-green-700 ${
                errors.otherDetails
                  ? "border-red-500 bg-red-50"
                  : "border-slate-300"
              }`}
            />
            {errors.otherDetails && (
              <p className="mt-1 text-xs text-red-500">{errors.otherDetails}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCloseModal}
            aria-label="onClose"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}
