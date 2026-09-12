import { type FooterProps } from "../libs/Footer";
export default function Footer({ year, fullName, studentId }: FooterProps) {
  year = "2026";
  fullName = "Natthanan Sueamun" ;
  studentId = "680610673"
  return (
    <footer className="align-self-end  text-center w-100">
      <p className="text-white bg-secondary p-4 m-0">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}
