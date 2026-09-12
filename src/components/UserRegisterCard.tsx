import type { Registrant } from "../libs/Registrant";

export default function UserRegisterCard(props: Registrant) {
  const genderDisplay =
    props.gender.toLowerCase() === "male"
      ? "Male 👨"
      : props.gender.toLowerCase() === "female"
      ? "Female 👩"
      : props.gender;

  return (
    <div className="card p-3 my-2 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-bold fs-5">
            {props.firstName} {props.lastName}
          </div>
          <div className="text-secondary small my-1">
            <span>{props.plan}</span> • <span>{genderDisplay}</span>
          </div>
          <div className="d-flex gap-1 flex-wrap mt-2">
            {props.items && props.items.length > 0 ? (
              props.items.map((item, index) => (
                <span
                  key={index}
                  className="badge bg-light text-secondary border fw-normal"
                >
                  {item}
                </span>
              ))
            ) : null}
          </div>
        </div>
        <div className="fs-5 fw-semibold text-muted text-nowrap">
          {props.totalPrice.toLocaleString()} THB
        </div>
      </div>
    </div>
  );
}