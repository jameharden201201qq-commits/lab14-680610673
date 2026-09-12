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
          <div className="fw-bold fs-5">{props.fullName}</div>
          <div className="text-secondary small my-1">
            <span>{props.plan}</span> • <span>{genderDisplay}</span>
          </div>
        </div>
        <div className="fs-5 fw-semibold text-muted text-nowrap">
          {props.total.toLocaleString()} THB
        </div>
      </div>
    </div>
  );
}