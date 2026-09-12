import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<Registrant[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("registrations");
    if (data) {
      try {
        setRegistrations(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p className="text-secondary">ผู้ลงทะเบียนแล้ว ({registrations.length} คน)</p>

      {registrations.length === 0 ? (
        <div className="text-center py-5 text-secondary">
          ยังไม่มีผู้ลงทะเบียน
        </div>
      ) : (
        registrations.map((user) => (
          <UserRegisterCard
            key={user.id}
            id={user.id}
            fullName={user.fullName}
            gender={user.gender}
            plan={user.plan}
            total={user.total}
          />
        ))
      )}
    </div>
  );
}
