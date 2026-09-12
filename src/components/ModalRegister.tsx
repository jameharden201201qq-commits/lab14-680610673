import { useState } from "react";
import { type Registrant } from "../libs/Registrant";
//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAgree, setIsAgree] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    plan: false,
    gender: false,
  });

  const selectedPlanObj = plans.find((p) => p.id === plan);
  const planPrice = selectedPlanObj ? selectedPlanObj.price : 0;
  const itemsPrice = selectedItems.reduce((acc, curId) => {
    const item = extraItems.find((i) => i.id === curId);
    return acc + (item ? item.price : 0);
  }, 0);

  const rawTotal = planPrice + itemsPrice;
  const hasDiscount = selectedItems.length === extraItems.length;
  const totalPayment = hasDiscount ? rawTotal * 0.8 : rawTotal;

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSubmit = () => {
    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      plan: plan === "",
      gender: gender === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    const newRegistrant: Registrant = {
      id: Date.now(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      gender,
      plan: selectedPlanObj ? selectedPlanObj.label : "",
      total: totalPayment,
    };

    const prevList: Registrant[] = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );
    localStorage.setItem("registrations", JSON.stringify([...prevList, newRegistrant]));

    alert(`Registration complete. Please pay money for ${totalPayment.toLocaleString()} THB.`);

    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setSelectedItems([]);
    setIsAgree(false);
    setErrors({ firstName: false, lastName: false, plan: false, gender: false });
  };
  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div className="w-50">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: false }));
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">Invalid first name</div>
                )}
              </div>

              <div className="w-50">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: false }));
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">Invalid last name</div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${errors.plan ? "is-invalid" : ""}`}
                value={plan}
                onChange={(e) => {
                  setPlan(e.target.value);
                  if (errors.plan) setErrors((prev) => ({ ...prev, plan: false }));
                }}
              >
                <option value="">Please select..</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
              {errors.plan && (
                <div className="invalid-feedback">Please select a Plan</div>
              )}
            </div>
           <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  checked={gender === "Male"}
                  onChange={() => {
                    setGender("Male");
                    if (errors.gender) setErrors((prev) => ({ ...prev, gender: false }));
                  }}
                />
                <label htmlFor="male" className="me-3">Male 👨</label>

                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  checked={gender === "Female"}
                  onChange={() => {
                    setGender("Female");
                    if (errors.gender) setErrors((prev) => ({ ...prev, gender: false }));
                  }}
                />
                <label htmlFor="female">Female 👩</label>
              </div>
              {errors.gender && (
                <div className="text-danger small mt-1">Please select gender</div>
              )}
            </div>
            {/* Extra Items */}
              <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              {extraItems.map((item) => (
                <div key={item.id}>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    id={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                  />
                  <label htmlFor={item.id} className="form-check-label">
                    {item.label} ({item.price.toLocaleString()} THB)
                  </label>
                </div>
              ))}

              {hasDiscount && (
                <span className="text-success d-block small mt-1">(20% Discounted)</span>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div className="fw-bold">
              Total Payment : {totalPayment.toLocaleString()} THB
            </div>
          </div>

          <div className="modal-footer">
            <div className="me-auto">
              <input
                className="me-2 form-check-input"
                type="checkbox"
                id="agree"
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
              />
              <label htmlFor="agree" className="form-check-label">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              className="btn btn-success my-2"
              disabled={!isAgree}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
